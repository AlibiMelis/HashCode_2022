import PriorityQueue from 'ts-priority-queue';
import { Assignment, Person, Project } from './types';

const getProjectScore = (project: Project) => {
	let score = 0;

	for (let role of project.roles) {
		score += role.level;
	}

	return score;
};

const checkConflict = (queues: PriorityQueue<Person>[]): boolean => {
	for (const queue of queues) {
		if (!queue.length) return false;
	}

	let map: any = {};
	let conflict = false;
	for (let i = 0; i < queues.length; i++) {
		let queue = queues[i];

		if (!map[queue.peek().name]) {
			map[queue.peek().name] = i;
		} else {
			conflict = true;
			let a = map[queue.peek().name];
			if (queue.length >= queues[a].length) {
				queue.dequeue();
			} else {
				queues[a].dequeue();
			}
			break;
		}
	}
	if (conflict) {
		return checkConflict(queues);
	}
	return true;
}

const levelUp = (person: Person, skill: string) => {
	person.skills[skill]++;
}

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
	projects.forEach(p => unfinishedProjects.queue(p));

	let time = -1;
	let unassignedPeople = people.slice();
	const assignedPeople = new PriorityQueue({
		comparator: (a: Person, b: Person) => a.nextAvailableTime! - b.nextAvailableTime!,
	});

	let aside: Project[] = [];
	let beforeLength: number = assignments.length;
	let nextTime = 0;

	while (true) {
		// console.log(unfinishedProjects.length);
		if (time <= nextTime) {
			aside.forEach(p => unfinishedProjects.queue(p));
			aside = [];
			// beforeLength = assignments.length;
		}
		time++;
		let project = unfinishedProjects.length ? unfinishedProjects.peek() : null;
		if (!project) continue;

		let roleQueues: PriorityQueue<Person>[] = [];

		for (let role of project.roles) {
			let roleQueue = new PriorityQueue({
				comparator: (a: Person, b: Person) => a.skills[role.name] - b.skills[role.name],
			});

			for (let person of people) {
				if (person.skills[role.name] >= role.level && time >= person.nextAvailableTime) {
					roleQueue.queue(person);
				}
			}
			roleQueues.push(roleQueue);
		}

		let canAssign = checkConflict(roleQueues);

		if (!canAssign) {
			aside.push(unfinishedProjects.dequeue());
		} else {
			let people: Person[] = roleQueues.map(queue => queue.peek());
			for (let i = 0; i < project.roles.length; i++) {
				let role = project.roles[i].name;
				levelUp(people[i], role);
				people[i].nextAvailableTime = time + project.duration;
				nextTime = time + project.duration;
			}
			const assignment: Assignment = {
				project: project,
				people: people,
			}
			assignments.push(assignment);
			unfinishedProjects.dequeue();
			if (assignments.length === projects.length) break;
		}
		console.log(time);
	}

	return assignments;
};

export default ScheduleProjects;
