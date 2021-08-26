INSERT INTO department (name_department)
VALUES ("Produccion"),
       ("Development"),
       ("purchasing"),
       ("accounting");

INSERT INTO roles (title,salary,department_id)
VALUES ("Manager", 50.000, 1),
       ("Junior developer", 90.000, 2),
       ("Buyer", 70.000, 3),
       ("Acounter", 90.000, 4);
       
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John","Denver",1,NULL),
       ("Fran","wilson",2,NULL),
       ("Mark","Chen",3,4),
       ("Peter","Parker",4,4),
       ("Ivan","Rodriguez",1,NULL);
