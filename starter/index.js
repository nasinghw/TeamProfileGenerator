// Packages required 
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
// Inquirer.js provides the user interface and the inquiry session flow.
const inquirer = require("inquirer");
const path = require("path");
// Read files
const fs = require("fs");

//Generate HTML
const generateHTML = require('./src/page-template.js');

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./src/page-template.js");

// Code to gather information about the development team members, and render the HTML file.

// Class containing all questions
class Prompt{
    constructor() {
        this.teamArray = [];
    }

    getTeamArray() {
        return this.teamArray;
    }

    //User Questions
    questions() {
        inquirer.prompt(
        {
        type: 'list',
        name: 'employeeTitle',
        message: "Choose team employee you would like to add ?",
        choices: ['Manager', 'Engineer', 'Intern', 'I finished adding my team']
        })
        
    .then(({employeeTitle}) => {
        if(employeeTitle === 'Manager'){
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
        type: 'number',
        name: 'officeNumber',
        message: "Please provide manager's office number",
        
    },
    ])

    // Pushes Manager data into teamArray
    .then( (templateData) => {
        const newManager = new Manager(templateData.name, templateData.id, templateData.email, templateData.officeNumber)
        this.teamArray.push(newManager);
        // Sends user back to menu
        this.questions();
    });

    } else if (employeeTitle === 'Engineer') {
            inquirer.prompt([
                    {
                     type: 'input',
                     name: 'name',
                     message: "Please provide engineer's name",
                     
                    },
                    {
                     type: 'number',
                     name: 'id',
                     message: "Please provide engineer's employee id",
                     
                    },
                    {
                     type: 'input',
                     name: 'email',
                     message: "Please provide engineer's email",
                     
                    },
                    {
                     type: 'input',
                     name: 'github',
                     message: "Please provide engineer's github username",
                     
                    }

                // Pushes Engineer data into teamArray
                ]).then( templateData => {
                    const newEngineer = new Engineer(templateData.name, templateData.id, templateData.email, templateData.github);
                    this.teamArray.push(newEngineer);
                    // Sends user back to menu
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
                 message: "Please provide intern's school name",
                
                }

            // Pushes Intern data into teamArray
            ]).then( templateData => {
                const newIntern = new Intern(templateData.name, templateData.id, templateData.email, templateData.school);
                this.teamArray.push(newIntern);
                // Sends user back to menu
                this.questions();
            });

        } else if (employeeTitle === 'I finished adding my team') {
            //Write the html file in the dist folder
            const pagehtml = generateHTML(this.getTeamArray());
            fs.writeFile('./output/team.html', pagehtml, err => {
                if (err) throw new Error(err);

                console.log('HTML created! Check out team.html in the output/ folder');
            });
        }
    });

    }
 };

// Activates prompts in CLI
const prompt = new Prompt();
console.log(prompt.getTeamArray());
prompt.questions();



module.exports = Prompt;