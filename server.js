const express =require('express');
const mysql= require('mysql2');


const PORT=process.env.PORT || 3001;
const app=express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db=mysql.createConnection(
{
  host:'localhost',
  user:'root',
  password:'0468757314Ivan$',
  database:'employee_manager_db'
},

console.log('connected to the employee_manager_db database')
);

app.use((req, res) => {
    res.status(404).end();
  });
  


app.listen(PORT,()=>{

    console.log(`server running on port ${PORT}`);
});