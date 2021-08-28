const mysql = require('mysql2');
require("dotenv").config();
const inquirer=require('inquirer');
const table = require('console.table');
const Font = require('ascii-art-font');

const db = mysql.createConnection(
    {
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE
     
   },
   console.log(`Connected to  employee_manager_db .`)
);



function  Menu(){

  inquirer.prompt({
  
      type: "list",
      message: "Choose what you would like to do",
      choices: [
          "View Employees",
          "View Departments",
          "View Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Update Manager",
          "Display employees by manager",
          "Delete an employee",
          "Delete a role",
          "Delete a department",
          "View utilized budget for a department",
          "Exit"
      ],
  
         name:"choice"
  
  }).then(function({choice}){
   
        switch(choice)
         {
    
           case  'View Employees':
             
                 viewEmployees()
                 .then(function(){
                  console.log("\n");
                  Menu();
                });
                 break;
               
            case 'View Departments':
            
                  viewDepartment()
                 .then(function(){
                  console.log("\n");
                  Menu();
                });
                 break;


           case 'View Roles':
            
                  viewRoles()
                 .then(function(){
                  console.log("\n");
                  Menu();
                });
                 break;
            
               
           case 'Add Employee':
            
            AddEmployee();
            console.log("\n");   
           break;   

           case 'Add Department':
            
            addDepartment();    
            console.log("\n");
             break;   

      
             case 'Add Role':
            
              addRole();    
              console.log("\n");
               break;      
         
               case 'Update Employee Role':
            
                updaterole();    
                console.log("\n");
                 break;      

                 case 'Update Manager':
            
                updateManager();    
                console.log("\n");
                 break;
                  
                 
                 case 'Delete an employee':
            
                  deleteEmployee();    
                  console.log("\n");
                   break;




                 case 'Exit':
                
                  console.log("Closing the app.....");
                  process.exit();      
  

         
            }
  
  
  });

}

  


function viewEmployees(){
  
 return new Promise(function(resolve,reject){
  const sql='SELECT employee.id, first_name, last_name, title, salary, name_department, manager_id  FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id'
  db.query(sql,function(err,result){
    if (err) {
      return reject(err);
  }else{
      console.log("Employees Table");
    console.table(result);
    return resolve();
    

  }
});
 });
}

function viewDepartment(){

  return new Promise(function(resolve,reject){
    const sql='SELECT * FROM department'
    db.query(sql,function(err,result){
      if (err) {
        return reject(err);
    }else{
        console.log("Department  Table");
      console.table(result);
      return resolve();
      
  
    }
  });
   });



}

function viewRoles(){

  return new Promise(function(resolve,reject){
    const sql='SELECT roles.id, title, salary, name_department FROM roles LEFT JOIN department ON roles.department_id = department.id'
    db.query(sql,function(err,result){
      if (err) {
        return reject(err);
    }else{
        console.log("Roles Table");
      console.table(result);
      return resolve();
      
  
    }
  });
   });

  };

 async function AddEmployee(){
    

    let roleTitleArray= await getRoles();
    roleTitleArray= roleTitleArray.map(x=>x.title)
    //console.log(roleTitleArray);
    let managerArray= await getManagers();
    managerArray= managerArray.map(y=>y.manager)
    managerArray.push("none");
    //console.log(roleTitleArray)

    inquirer.prompt([
      {
      type: "input",
      message: "Enter employee's first name",
      name: "first_Name"
  },
  {
      type: "input",
      message: "Enter employee's last name",
      name: "last_Name"
  },
  {
      type: "list",
      message: "Select employee's role",
      choices: roleTitleArray,
      name: "role"
  },
  {
      type: "list",
      message: "Select employee's manager",
      choices: managerArray,
      name: "manager"

  }])
      .then( async function(data) {
        let role_Id =await roleTitleArray.indexOf(data.role);
        role_Id=role_Id+1;
        console.log("data role"+role_Id);


    if (data.manager === "none") {
        
      addEmployesql(data.first_Name,data.last_Name,role_Id)
       .then(function() {
           console.log("\n");
            Menu();
      })
    }
     else  {
        let manager_Id =await managerArray.indexOf(data.manager);
        manager_Id=manager_Id+1;
        console.log("data manager"+manager_Id);
         addEmployesql(data.first_Name,data.last_Name,role_Id,manager_Id)
        .then(function() {
            console.log("\n");
            Menu();
            

      })
    }

  }).catch((err) => console.log(err))
    
      }

  

   function getRoles(){

    return new Promise(function(resolve,reject){
      const sql='SELECT title FROM roles'
      db.query(sql,function(err,result){
        if (err) {
          return reject(err);
      }else{
      // console.log(result);
      return resolve(result);
    
      }
    });
     });
  
    }


    function getManagers(){

      return new Promise(function(resolve,reject){
        const sql='SELECT CONCAT_WS(" ", `first_name`, `last_name`) AS `manager` FROM employee'
        db.query(sql,function(err,result){
          if (err) {
            return reject(err);
        }else{
             
          return resolve(result);
          
      
        }
      });
       });
    
      }
     
      function getDepartment(){
      
        return new Promise(function(resolve,reject){
          const sql='SELECT id,name_department FROM department'
          db.query(sql,function(err,result){
          
            if (err) {
              return reject(err);
          }else{
               
            return resolve(result);
            
        
          }
        });
         });
      
        }
         




      



     
     function addEmployesql(first_name,last_name,role_id,manager_id){
       //console.log(role_id);
      return new Promise(function(resolve,reject){
        const sql='INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
        db.query(sql,[first_name,last_name,role_id,manager_id],function(err,result){
          if (err) {
            return reject(err);
        }else{
            console.log("Employee successfully added!");
          //console.table(result);// tca borrarlo solo para probar
          return resolve();
          
      
        }
      });
       });
      }

   function addDepartmentsql(name_department){
    return new Promise(function(resolve,reject){
     const sql='INSERT INTO department (name_department) VALUES (?)'
     db.query(sql,[name_department],function(err,result){
      if(err)
      {
        return reject(err)
      }
        else {
        console.log("Department Succesfully added")
        return resolve();
        }
     })

    })
  }

 async function addDepartment(){
       
    inquirer.prompt([
      {
      type: "input",
      message: "Enter Department's name",
      name: "name_department"
      },
    ])
    .then( async function(data) {
         //console.log(data.name_department);
        addDepartmentsql(data.name_department)
     .then(function() {
         console.log("\n");
          Menu();
    })

     }).catch((err) => console.log(err));
    }

    


  async function addRole(){

    
    let departmentArray= await getDepartment();
    departmentArray= departmentArray.map(x=>x.name_department)
    inquirer.prompt([
      {
      type: "input",
      message: "Enter Title's name",
      name: "title"
      },
      {
        type: "input",
        message: "Enter Salary",
        name: "salary"
        },
        {
          type: "list",
          message: "Enter Department's name",
          choices: departmentArray,
          name: "name_department"
          }
    ])
    .then( async function(data) {
      //console.log(data.name_department);
      let department_id=departmentArray.indexOf(data.name_department); 
      department_id=department_id+1;
     addRolesql(data.title,data.salary,department_id);
    })
  .then(function() {
      console.log("\n");
       Menu();
 }).catch((err) => console.log(err));


  }


function addRolesql(title,salary,department_id){
  //console.log("departamanto id en el sql "+department_id);
  return new Promise(function(resolve,reject){
    const sql='INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)'
    db.query(sql,[title,salary,department_id],function(err,result){
     if(err)
     {
       return reject(err)
     }
       else {
       console.log("Role  Succesfully added")
       return resolve();
       }
    })

   })
  }



async function updaterole(){
  let roleTitleArray= await getRoles();
  roleTitleArray= roleTitleArray.map(x=>x.title)
  
  inquirer.prompt([
    {
    type: "input",
    message: "Employee's id",
    name: "employee_id"
    },

      {
        type: "list",
        message: "Enter New Role",
        choices: roleTitleArray,
        name: "role_update"
        }
  ])
  .then( async function(data) {
    //console.log(data.name_department);
    let role_id=roleTitleArray.indexOf(data.role_update); 
    role_id=role_id+1;
    updaterolesql(data.employee_id,role_id);
  })
.then(function() {
    console.log("\n");
     Menu();
}).catch((err) => console.log(err));
  






}


function updaterolesql(employee_id,new_role){

  return new Promise(function(resolve,reject){
    const sql='UPDATE employee SET ? WHERE ?'
    db.query(sql,[{role_id:new_role},{id:employee_id}],function(err,result){
     if(err)
     {
       return reject(err)
     } else {
      console.log("Role Updated!");
      return resolve(result);
       
       
           } 
      
      })
    })




}


async function updateManager(){

 
  let managerArray= await getManagers();
    managerArray= managerArray.map(y=>y.manager)

  
  inquirer.prompt([
    {
    type: "input",
    message: "Employee's id",
    name: "employee_id"
    },

      {
        type: "list",
        message: "Enter New Role",
        choices: managerArray,
        name: "manager_update"
        }
  ])
  .then( async function(data) {
    let manager_id=managerArray.indexOf(data.manager_update); 
    manager_id=manager_id+1;
    updateManagersql(data.employee_id,manager_id);
  })
.then(function() {
    console.log("\n");
     Menu();
}).catch((err) => console.log(err));
  
}



function updateManagersql(employee_id,newmanager_id){

  return new Promise(function(resolve,reject){
    const sql='UPDATE employee SET ? WHERE ?'
    db.query(sql,[{manager_id:newmanager_id},{id:employee_id}],function(err,result){
     if(err)
     {
       return reject(err)
     } else {
      console.log("Manager Updated!");
      return resolve(result);
       
       
           } 
      
      })
    })




}



  
  
function deleteEmployee(){

 
inquirer.prompt([

    {
      type: "input",
      message: "Employee id  to Delete",
      name: "employee_id"
      }
])
.then( async function(data) {
  deleteEmployeesql(data.employee_id);
})
.then(function() {
  console.log("\n");
   Menu();
}).catch((err) => console.log(err));

}
  
  function deleteEmployeesql(employee_id){
     console.log(employee_id);
    return new Promise(function(resolve,reject){
      const sql='DELETE FROM employee  WHERE id =?'
      db.query(sql,[employee_id],function(err,result){
       if(err)
       {
         return reject(err)
       } else {
        console.log("Employee Deleted!");
        return resolve(result);
         
         
             } 
        
        })
      })






  }



   




 init();     

   




   
  
  
  function init(){
    console.clear();
    Font.create('Employee  Manager', 'Doom', (err, result) => {
      if (err) throw err;
      console.log(result);
     
  })
  
    Menu();
    console.clear();

}