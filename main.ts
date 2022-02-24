import Output from './output';
import { readInput } from './read';
import ScheduleProjects from './scheduling';

const {people, projects} = readInput('./samples/a.txt');

const assignments = ScheduleProjects(projects, people);
// console.log(assignments);
Output(assignments);
