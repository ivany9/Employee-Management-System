const express =require('express');
const mysql= require('mysql2');
const sequelize = require('./config/connection');
//const routes = require('./routes');

const PORT=process.env.PORT || 3001;
const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
