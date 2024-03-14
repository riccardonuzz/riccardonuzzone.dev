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
    location: string;
    from: string;
    to: string;
    technologies: Technology[]
}

