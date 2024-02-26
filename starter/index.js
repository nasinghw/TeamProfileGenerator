//Team profile Generator

//Local JS files 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//requre function to load inquirer data 
const inquirer = require("inquirer");

//require function to load path data 
const path = require("path");

// Read a file in Node.js
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Code to gather information about the development team members, and render the HTML file.

//USer questions

class Prompt {
    constructor(){
        this.teamArray = [];
    }

    getTeamArray(){
        return this.teamArray
    }

questions() {
    inquirer.prompt({
        type: 'list',
        name: 'employeeTitle',
        message: "Select employee title from list to add",
        selection: ['Manager',  'Engineer', 'Intern', 'I have selected my team'] 

    }).then(({employeeTitle}) => {
        if (employeeTitle === 'Manager') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Please provide manager's name",
                    
                },
                {
                    type: 'number',
                    name: 'id',
                    message: "Please provide manager's employee id",
                   
                },

                {
                    type: 'input',
                    name: 'email',
                    message: "Please provide manager's email",
                    
                },
                {
                    type: 'input',
                    name: 'github',
                    message: "Please provide engineer's github username",
                    
                },
                // Store Engineer data into teamArray
            ]).then( templateData => {
                const newEngineer = new Engineer(templateData.name, templateData.id, templateData.email, templateData.github);
                this.teamArray.push(newEngineer);
                // Return user back to menu
                this.questions();
            });

        } else if (employeeTitle === 'Intern') {
            inquirer.prompt([
                {
                 type: 'input',
                 name: 'name',
                 message: "Please provide intern's name",
                
                },
                {
                    type: 'number',
                    name: 'id',
                    message: "Please provide intern's employee id",
                   
                },
                {
                    type: 'input',
                    name: 'email',
                    message: "Please provide intern's email",
                    
                },
                {
                    type: 'input',
                    name: 'school',
                    message: "Please enter the intern's school name",
                    
                }
                // Pushes Intern data into teamArray
            ]).then( templateData => {
                const newIntern = new Intern(templateData.name, templateData.id, templateData.email, templateData.school);
                this.teamArray.push(newIntern);
                // Sends user back to menu
                this.questions();
            });

            } else if (employeeType === 'I finished entering my team info') {
            //function that writes the html file in the dist folder
                const pagehtml = generateHTML(this.getTeamArray());
                fs.writeFile('./dist/index.html', pagehtml, err => {
                if (err) throw new Error(err);

                console.log('Page created! Check out index.html in the dist/ folder to see it!');
            });
            }
        });
    }
};

// Prompts in CLI
const prompt = new Prompt();
prompt.questions();

module.exports = Prompt;