// Semua isi portofolio ada di sini — ubah teks/link di file ini saja,
// komponen di app/components akan menyesuaikan otomatis.

export const profile = {
  firstName: "Muhammad",
  lastName: "Esa",
  fullName: "Muhammad Hardian Esa",
  role: "Network Engineer & Web Developer",
  location: "Indonesia",
  timeZone: "Asia/Jakarta",
  intro:
    "Network engineer & web developer from Indonesia. I keep networks fast and stable behind the scenes — then build clean, thoughtful websites on top of them.",
  github: "https://github.com/esakkk",
  // Isi kalau mau muncul di bagian kontak (kosongkan = disembunyikan)
  email: "",
  linkedin: "",
  instagram: "",
};

export type Project = {
  title: string;
  tags: string[];
  year: string;
  link?: string;
  /** Path gambar di /public, misal "/assets/projects/porto.jpg". Kosongkan = pakai cover abstrak. */
  image?: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    tags: ["Web Design", "Development", "3D"],
    year: "2025",
    link: "https://github.com/esakkk",
    image: "/assets/projects/portfolio-card.jpg",
  },
  {
    title: "Coming Soon",
    tags: ["Network", "Infrastructure"],
    year: "—",
    comingSoon: true,
  },
  {
    title: "Coming Soon",
    tags: ["Web App"],
    year: "—",
    comingSoon: true,
  },
];

export const doing = ["Routing", "Coding", "Debugging", "Designing", "Configuring", "Ngopi"];

export type Service = {
  title: string;
  description: string;
  tools: string[];
};

export const services: Service[] = [
  {
    title: "Network Engineering",
    description:
      "Designing, configuring and maintaining networks that stay up — from small offices to bigger infrastructure.",
    tools: ["Routing & Switching", "MikroTik", "Cisco", "Linux Server"],
  },
  {
    title: "Web Development",
    description:
      "Fast, responsive websites with a little extra motion and personality — built with modern tooling.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Creative Coding",
    description: "Interactive details that make a site memorable: 3D, physics and smooth animation.",
    tools: ["Three.js / R3F", "Framer Motion", "GSAP"],
  },
];

// TODO: ganti dengan perjalanan/pencapaianmu sendiri (sekolah, sertifikasi, magang, kerja, lomba, dll.)
export type Milestone = { year: string; title: string; place: string; note: string };

export const journey: Milestone[] = [
  { year: "20XX", title: "Started in Networking", place: "Sekolah / Kampus", note: "Isi sendiri" },
  { year: "20XX", title: "First Certification", place: "Lembaga", note: "Isi sendiri" },
  { year: "20XX", title: "First Website Shipped", place: "Proyek pribadi", note: "Isi sendiri" },
  { year: "20XX", title: "Internship / Job", place: "Perusahaan", note: "Isi sendiri" },
];
