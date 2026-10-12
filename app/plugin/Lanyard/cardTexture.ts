"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { profile } from "../../data/portfolio";

/**
 * Tekstur kartu ID digambar di <canvas> dari foto + data profil,
 * jadi ganti foto cukup timpa file PHOTO di bawah ini.
 *
 * Tata letak UV dari card.glb: sisi depan = setengah kiri, sisi belakang =
 * setengah kanan, keduanya 0–75.7% tinggi tekstur (dari atas).
 */
const PHOTO = "/assets/idphoto.jpg";
// area foto yang dipakai (piksel di file asli): kepala sampai dada
const CROP = { x: 150, y: 470, w: 620, h: 560 };

const W = 2048;
const H = 1994;
const FACE_H = H * 0.757;
// unit gambar mengikuti proporsi kartu asli (0.716 : 1)
const UNIT_W = 716;
const UNIT_H = 1000;

const NIGHT = "#1e2125";
const PAPER = "#f3f1ec";
const CREAM = "#e8dfcf";
const MUTE = "#8d8a84";

function cssFont(variable: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return v || fallback;
}

function eyebrow(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, sans: string, align: CanvasTextAlign) {
  ctx.font = `600 19px ${sans}`;
  ctx.textAlign = align;
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "3.5px";
  ctx.fillText(text.toUpperCase(), x, y);
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
}

/** Foto dibuat dua warna (gelap → krem) supaya menyatu dengan tema dan latarnya tidak ramai */
function duotone(img: HTMLImageElement, w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  // pertahankan rasio: potong CROP agar pas dengan w:h
  const target = w / h;
  let { x, y, w: cw, h: ch } = CROP;
  if (cw / ch > target) {
    const nw = ch * target;
    x += (cw - nw) / 2;
    cw = nw;
  } else {
    const nh = cw / target;
    y += (ch - nh) / 2;
    ch = nh;
  }
  g.drawImage(img, x, y, cw, ch, 0, 0, w, h);
  const data = g.getImageData(0, 0, w, h);
  const d = data.data;
  const dark = [0x1e, 0x21, 0x25];
  const light = [0xe8, 0xdf, 0xcf];
  for (let i = 0; i < d.length; i += 4) {
    let l = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
    l = Math.min(1, Math.max(0, (l - 0.08) * 1.35)); // sedikit tambah kontras
    for (let k = 0; k < 3; k++) d[i + k] = dark[k] + (light[k] - dark[k]) * l;
  }
  g.putImageData(data, 0, 0);
  return c;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawFront(ctx: CanvasRenderingContext2D, photo: HTMLImageElement | null, serif: string, sans: string) {
  ctx.save();
  ctx.scale(W / 2 / UNIT_W, FACE_H / UNIT_H);

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, UNIT_W, UNIT_H);

  const m = 52;
  ctx.fillStyle = NIGHT;
  ctx.textBaseline = "alphabetic";
  eyebrow(ctx, "Portfolio — ID", m, 120, sans, "left");
  eyebrow(ctx, `№ ${new Date().getFullYear()}`, UNIT_W - m, 120, sans, "right");

  // foto
  const px = m;
  const py = 150;
  const pw = UNIT_W - m * 2;
  const ph = 520;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 22);
  ctx.clip();
  ctx.fillStyle = NIGHT;
  ctx.fillRect(px, py, pw, ph);
  if (photo) ctx.drawImage(duotone(photo, Math.round(pw * 2), Math.round(ph * 2)), px, py, pw, ph);
  ctx.restore();

  // nama
  const [first, ...rest] = profile.fullName.split(" ");
  ctx.fillStyle = NIGHT;
  ctx.textAlign = "left";
  ctx.font = `500 76px ${serif}`;
  ctx.fillText(first, m - 3, 760);
  ctx.font = `italic 400 76px ${serif}`;
  ctx.fillText(rest.join(" "), m - 3, 830);

  ctx.fillStyle = MUTE;
  eyebrow(ctx, profile.role, m, 880, sans, "left");

  ctx.strokeStyle = "rgba(30,33,37,0.18)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(m, 915);
  ctx.lineTo(UNIT_W - m, 915);
  ctx.stroke();

  ctx.fillStyle = NIGHT;
  eyebrow(ctx, profile.location, m, 955, sans, "left");
  eyebrow(ctx, "✦", UNIT_W - m, 955, sans, "right");

  ctx.restore();
}

function drawBack(ctx: CanvasRenderingContext2D, serif: string, sans: string) {
  ctx.save();
  ctx.translate(W / 2, 0);
  ctx.scale(W / 2 / UNIT_W, FACE_H / UNIT_H);

  ctx.fillStyle = NIGHT;
  ctx.fillRect(0, 0, UNIT_W, UNIT_H);

  // grid halus seperti cover proyek
  ctx.strokeStyle = "rgba(232,223,207,0.06)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= UNIT_W; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, UNIT_H);
    ctx.stroke();
  }
  for (let y = 0; y <= UNIT_H; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(UNIT_W, y);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(UNIT_W / 2, UNIT_H * 0.45, 0, UNIT_W / 2, UNIT_H * 0.45, UNIT_W * 0.7);
  glow.addColorStop(0, "rgba(232,223,207,0.14)");
  glow.addColorStop(1, "rgba(232,223,207,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, UNIT_W, UNIT_H);

  ctx.fillStyle = MUTE;
  eyebrow(ctx, "( Have an idea? )", UNIT_W / 2, 140, sans, "center");

  ctx.fillStyle = CREAM;
  ctx.textAlign = "center";
  ctx.font = `500 150px ${serif}`;
  ctx.fillText("LET'S", UNIT_W / 2, 470);
  ctx.font = `italic 400 150px ${serif}`;
  ctx.fillText("talk", UNIT_W / 2, 590);

  ctx.fillStyle = MUTE;
  eyebrow(ctx, profile.github.replace(/^https?:\/\//, ""), UNIT_W / 2, 900, sans, "center");

  ctx.restore();
}

export function useCardTexture() {
  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false; // sama seperti tekstur dari GLTF
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    return tex;
  });

  useEffect(() => {
    let cancelled = false;
    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const serif = cssFont("--font-serif-display", "Georgia, serif");
    const sans = cssFont("--font-sans-body", "system-ui, sans-serif");

    const draw = (photo: HTMLImageElement | null) => {
      if (cancelled) return;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W / 2, H);
      ctx.fillStyle = NIGHT;
      ctx.fillRect(W / 2, 0, W / 2, H);
      drawFront(ctx, photo, serif, sans);
      drawBack(ctx, serif, sans);
      texture.needsUpdate = true;
    };

    draw(null);

    const photo = new Image();
    const photoReady = new Promise<HTMLImageElement | null>((resolve) => {
      photo.onload = () => resolve(photo);
      photo.onerror = () => resolve(null);
    });
    photo.src = PHOTO;
    const fontsReady = Promise.all([
      document.fonts.load(`500 76px ${serif}`),
      document.fonts.load(`italic 400 76px ${serif}`),
      document.fonts.load(`600 19px ${sans}`),
    ]).catch(() => undefined);

    Promise.all([photoReady, fontsReady]).then(([img]) => draw(img));
    return () => {
      cancelled = true;
    };
  }, [texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}
