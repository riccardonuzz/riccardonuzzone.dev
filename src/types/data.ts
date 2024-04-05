export interface Technology {
    name: string;
    icon: string;
}

export interface Project {
    name: string;
    description: string;
}

export interface Experience {
    company: string;
    projects: Project[];
    role: string;
    location: string;
    from: string;
    to: string;
    technologies: Technology[]
}

export interface PersonalProject {
    name: string;
    description: string;
    image: string;
    link: string;
    technologies: Technology[]
}