// Semua isi portofolio ada di sini — ubah teks/link di file ini saja,
// komponen di app/components akan menyesuaikan otomatis.

export const profile = {
  firstName: "Muhammad Hardian",
  lastName: "Esa",
  fullName: "Muhammad Hardian Esa",
  role: "IT ENTHUSIAST & SYSTEM OPERATIONS",
  location: "Indonesia",
  timeZone: "Asia/Jakarta",
  intro:
    "Debugging networks, shipping clean code, and automating workflows so nothing breaks twice.",
  github: "https://github.com/esakkk",
  // Isi kalau mau muncul di bagian kontak (kosongkan = disembunyikan)
  email: "m.hardianesa17@gmail.com",
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
    tools: ["Next.js", "React", "Laravel", "Tailwind CSS"],
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
  { year: "2022", title: "Started in Networking", place: "SMKN 01 Kedungwuni", note: "3 Years Computer and Network Engineering" },
  { year: "2025", title: "Internship / Job", place: "PT Qalby Cahaya Network", note: "Helpdesk & Junior Network Operations" },
  { year: "2025", title: "First Certification", place: "IDN.ID", note: "MTCNA Certified" },
  { year: "2025", title: "Joined Full-Time", place: "PT Qalby Cahaya Network", note: "Helpdesk & Network Operations" },
  { year: "2026", title: "Advanced Routing Certification", place: "IDN.ID", note: "MTCRE Certified" },
  { year: "2027", title: "Next Milestone", place: "Future", note: "Full-Stack / DevOps Engineer" },
];
