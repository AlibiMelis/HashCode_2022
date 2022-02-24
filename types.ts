interface Person {
	name: string;
	skills: any;
}

interface Role {
	name: string;
	level: number;
}

interface Project {
	name: string;
	duration: number;
	bestDate: number;
	score: number;
	roles: Role[];
}

interface Assignment {
	project: Project;
	people: Person[];
}
