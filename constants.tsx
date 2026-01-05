
import { Project, Skill } from './types';

export interface ProjectExtended extends Project {
  color: string;
  glowColor: string;
  tagline: string;
}

export const DWARKESH_STATUS = {
    role: "B.Tech CSE Student & Aspiring AI Generalist",
    currentlyWorking: "Full-Stack Web Applications & ML Projects",
    learning: ["DSA", "Machine Learning", "AI Concepts"],
    collaboration: ["Web Development", "AI/ML Innovations", "Open Source"],
    expertise: ["JavaScript", "React", "Node.js", "Full-Stack Development"]
};

export const PROJECTS: ProjectExtended[] = [
  {
    title: "Arcade Learn",
    tagline: "Your Journey to Tech Mastery",
    description: "Follow curated learning roadmaps from foundational to mastery levels. Track your progress and unlock career opportunities as you grow with gamified learning components.",
    tech: ["JavaScript", "Firebase", "GSAP", "Gamification"],
    link: "https://github.com/VickyKumarOfficial/Arcade-Learn",
    image: "/image.png",
    color: "#2dd4bf",
    glowColor: "rgba(45, 212, 191, 0.4)",
    featured: true
  },
  {
    title: "MentiSphere",
    tagline: "Strengthen Your Mental Armor",
    description: "Helps students build resilience, find balance, and thrive mentally with AI-powered support and professional guidance. A dedicated ecosystem for mental wellness.",
    tech: ["React", "Node.js", "MongoDB", "AI-Support"],
    link: "https://github.com/krishn-cc/RedHat-MentiSphere",
    image: "/image2.png",
    color: "#0d9488",
    glowColor: "rgba(13, 148, 136, 0.4)"
  },
  {
    title: "Heart Predict",
    tagline: "Heart Failure Prediction",
    description: "Advanced AI-powered cardiovascular risk assessment. Features a multi-level risk guide (Low to Very High) based on clinical data parameters and ML ensemble modeling.",
    tech: ["Python", "ML", "Flask", "Healthcare"],
    link: "https://github.com/krishn-cc/Heart-Faliure-prediction",
    image: "/image1.png",
    color: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.4)",
    featured: true
  }
];

export const SKILLS: Skill[] = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "C", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "MySQL", category: "Backend" },
];
