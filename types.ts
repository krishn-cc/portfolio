
export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Language';
  icon?: string;
}

export type NavItem = 'Home' | 'Skills' | 'Projects' | 'Contact';
