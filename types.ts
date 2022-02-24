export interface Person {
	name: string;
	skills: any;
}

export interface Role {
	name: string;
	level: number;
}

export interface Project {
	name: string;
	duration: number;
	bestDate: number;
	score: number;
	roles: Role[];
}

export interface Assignment {
	project: Project;
	people: Person[];
}
