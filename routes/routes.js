//const express = require('express');
const db=require("./server");
const app = express();


//const PORT = process.env.PORT || 3001;
//Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());




db.query('SELECT * FROM employee', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});





// app.get('/api', (req, res) => {
//   const sql = `SELECT * FROM roles`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });




// app.use((req, res) => {
//   res.status(404).end();
// });
// // app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
