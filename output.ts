import { Assignment } from './types';

const Output = (assignments: Assignment[])=>{

    let out:string = '';
    const fs = require('fs');

    out+=''+assignments.length + '\n';

    fs.writeFile('submission.txt', '' + assignments.length, function(err: any){
        if (err){
            return console.log(err);
        }
        console.log('file created!');
    });

    for (var i = 0; i < assignments.length; i++){
        out += '' + assignments[i].project.name + '\n';

        for (var j = 0; j < assignments[i].people.length; j++){
            out += '' + assignments[i].people[j].name + ' ';
        }
        out += '\n';
    }

    fs.writeFile('submission.txt', out, function(err: any){
        if (err){
            return console.log(err);
        }
        console.log('added!');
    });

}


export default Output;