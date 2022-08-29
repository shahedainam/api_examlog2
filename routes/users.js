const express = require('express');

const router = express.Router();

const db = require('../db');

// // http://localhost:4000/users/allusers
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

// // http://localhost:4000/users/searchuser
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



// //    http://localhost:4000/users/removeuser/:id
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

// http://localhost:4000/users/adduser
router.post('/adduser', async(req, res) => {
    try {
        console.log(req.body);
        const tempUserid = 'id'+ parseInt(Math.random()*10000000);

        const response = await db.promise().query(`INSERT INTO users (userid,username,name,email,mobile,password )
          VALUES ('${tempUserid}','${req.body.username}',' ${req.body.name}','${req.body.email}',
          '${req.body.mobile}', '${req.body.password}')`);
        
        const response2 = await db.promise().query(`SELECT * FROM users WHERE username = '${req.body.username}' `);
        console.log(response, response2[0]);

        res.status(201).json(response2[0]);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
})

// http://localhost:4000/users/login
router.post('/login', async(req, res) => {
    try {
        const response = await db.promise().query(`SELECT * FROM users WHERE username = '${req.body.username}' `);
        // user found in db
        if(response[0].length > 0) {
            //password matched
            // console.log(response[0][0].password, req.body.password);
            if(response[0][0].password == req.body.password) {
                // res.status(202).json(response[0]);
                res.status(202).json({message: 'Successfully logged in'});
            }
            //password not matched
            else {
                res.status(401).json({message: 'Incorrect Password'});
            }
        }
        // user not found
        else {
            res.status(422).json({message: 'User Not Found'});
        }        
    } catch(err) {
        // console.log(err);
        res.status(400).json(err);

    }
})
// http://localhost:4000/users/updateuserpassword
router.put('/updateuserpassword', async(req, res) => {
    try {
        console.log(req.body);
        const response = await db.promise().query(`UPDATE users SET password = '${req.body.password}' WHERE username = '${req.body.username}'`);
        console.log(response);
        res.status(200).json(response[0]);
    } catch(err) {
        // console.log(err);
        res.status(400).json(err);
    }
})

    




module.exports = router;