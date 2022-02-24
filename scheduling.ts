import { resolve } from 'path/posix';
import PriorityQueue from 'ts-priority-queue';
import { Assignment, Person, Project } from './types';

const getProjectScore = (project: Project) => {
	let score = 0;

	for (let role of project.roles) {
		score += role.level;
	}

	return score;
};

const ScheduleProjects = (projects: Project[], people: Person[]): Assignment[] => {
	let assignments: Assignment[] = [];
	const projectSelectionScores: any = {};

	// sort projects by score in ascending order
	projects.map((project) => {
		projectSelectionScores[project.name] = getProjectScore(project);
	});

	const unfinishedProjects = new PriorityQueue({
		comparator: (a: Project, b: Project) =>
			projectSelectionScores[a.name] - projectSelectionScores[b.name],
	});

	let time = 0;
	let unassignedPeople = people.slice();
	const assignedPeople = new PriorityQueue({
		comparator: (a: Person, b: Person) => a.nextAvailableTime! - b.nextAvailableTime!,
	});

	while (true) {
		let project = unfinishedProjects.peek();
		if (!project) break;

		for (let role of project.roles) {
			let bestPerson: Person | undefined;

			for (let person of unassignedPeople) {
				if (person.skills[role.name] >= role.level) {
					bestPerson = person;
					break;
				}
			}
		}
	}

	return assignments;
};

export default ScheduleProjects;
