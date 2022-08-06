const express = require('express');

const router = express.Router();

const db = require('../db');

// http://localhost:4000/users/allusers
router.get('/allusers', async(req, res)=>{
    try{
        const response = await db.promise().query("SELECT * FROM users" );
        console.log(response[0]);
        res.send(response[0]);

    }
      catch(err){
        res.status(400).json(err);
        
      }
})
// http://localhost:4000/users/searchuser
router.get("/searchuser/:userId", async (req, res) => {
  try {
      const userId = req.params.userId;
      const response = await db
          .promise()
          .query(`SELECT name, email, username FROM users WHERE userid = '${userId}'`);
      res.status(200).json(response[0]);
  } catch (err) {
      res.status(400).json(err);
  }
});
// / http://localhost:4000/users/finduser?id=id025
router.get("/finduser/", async (req, res) => {
  try {
      const userId = req.query.id;
      const response = await db
          .promise()
          .query(`SELECT * FROM users WHERE userid = '${userId}'`);
      res.status(200).json(response[0]);
  } catch (err) {
      res.status(400).json(err);
  }
});



//    http://localhost:4000/users/removeuser/:id
router.delete("/removeuser/:userId", async (req, res) => {
  try {
      const userId = req.params.userId;
      const response = await db
          .promise()
          .query(`DELETE FROM users WHERE userid = '${userId}'`);
      res.status(200).json(response[0]);
  } catch (err) {
      res.status(400).json(err);
  }
});
module.exports = router;