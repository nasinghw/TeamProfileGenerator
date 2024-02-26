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
        question: "Select employee title from list to add",
        selection: ['Manager',  'Engineer', 'Intern', 'I have selected my team'] 

    }).then(({employeeTitle}) => {
        if (employeeType === 'Manager') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Please provide manager's name",
                    validate: function (nameInput) {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log("Please provide manager's name!");
                            return false;
                        }
                    }
                },
                
    })
}}

