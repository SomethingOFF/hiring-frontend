export interface Job {
    _id: string;
    name: string;
    description: string;
    hr: string;
    company: string;
    users: Seeker[];
    createdAt: string;
}

export interface Seeker {
    user: string;
    name: string;
    resume: string;
    createdAt: string;
}