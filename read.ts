import { readInputFile } from './utils';
import { Person, Project, Role } from './types';

export const readInput = (filename: string) => {
  const rows = readInputFile(filename).split('\n');
  let [personCount, projectCount] = rows[0].split(' ').map(n => +n);

  let people: Person[] = [];
  let projects: Project[] = [];
  
  let i = 1;
  while (personCount) {
    const [name, skillCount] = rows[i++].split(' ');
    let person: Person = {
      name: name,
      skills: {},
      nextAvailableTime: 0
    };
    for (let s = i; s < i + +skillCount; s++) {
      const [skillName, skillLevel] = rows[s].split(' ');
      person.skills[skillName] = +skillLevel;
    }
    i += +skillCount;
    personCount--;
    people.push(person);
  }

  while (projectCount) {
    const [name, duration, score, bestDate, roleCount] = rows[i++].split(' ');
    let project: Project = {
      name: name,
      duration: +duration,
      bestDate: +bestDate,
      score: +score,
      roles: []
    }
    for (let r = i; r < i + +roleCount; r++) {
      const [roleName, roleLevel] = rows[r].split(' ');
      let role: Role = {
        name: roleName,
        level: +roleLevel,
      }
      project.roles.push(role);
    }
    i+= +roleCount;
    projectCount--;
    projects.push(project);
  }

  return {people, projects};
}
