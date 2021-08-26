const inquirer=require("inquirer");
const consult=require("./server");

//const Department=require("./lib/Department");
//const Employee=require("./lib/Employee");
//const Roles=require("./lib/Roles");



    Menu();




function  Menu(){

inquirer.prompt({

    type: "list",
    message: "Choose what you would like to do",
    choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role",
        "Update manager",
        "Display employees by manager",
        "Delete an employee",
        "Delete a role",
        "Delete a department",
        "View utilized budget for a department",
        "Quit"
    ],

       name:"choice"

}).then(function({choice}){
 
      switch(choice)
       {
  
         case  'View employees':
             console.log("hola");
              
                 




       }


})





}