class Roles{
 constructor(id,title,salary,department_id){
    
     this.id=id;
     this.title=title;
     this.salary=salary;
     this.department_id=department_id;
 }

 get_id(){
    return this.id=id;

 }

 get_title(){
   
    return this.title;
 }

 get_salary(){

   return this.salary;
    }

   get_department_id(){

    return this.department_id;

   } 


get_Roles(){

    return 'Roles';
}




}

module.exports=Roles;