export interface Person {
	name: string;
	skills: any;
	nextAvailableTime?: number;
}

export interface Role {
	name: string;
	level: number;
	assigned?: Person;
	conditionMet?: boolean;
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
