class Employee{
  constructor(first_name,last_name,role_id,manager_id){
   this.first_name=first_name;
   this.last_name=last_name;
   this.role_id=role_id;
   this.manager_id=manager_id;

  }


  getfirs_tname(){

    return this.first_name;
  }
  
  getlast_name(){

    return this.last_name;
  } 

  getrole_id(){

   return this.role_id; 
  }

  getmanager_id(){

    this.manager_id;
  }
   getemployee(){
      
      return 'Employee';

   }

}

module.exports=Employee;