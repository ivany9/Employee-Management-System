class Department{
 constructor(id,name_department ){
  
    this.id=id;
    this.name_department=name_department;
    }
    get_id(){
   
      return this.id;

    }

    get_name_department(){

     return this.name_department;
    }

    get_Departement(){

        return 'Department';
    }



 }


module.exports=Department;

