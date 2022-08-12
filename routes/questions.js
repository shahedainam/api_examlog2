const express = require('express');

const router = express.Router();

const db = require('../db');

//http://localhost:4000/questions/getquestions
router.get('/getquestions', async(req, res) => {
    try{
        const response = await db.promise().query('SELECT * FROM questions');
        //console.log(response[0]);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//http://localhost:4000/questions/getquestionbysubject/subject_id
router.get("/getquestionbysubject/:subject_id", async (req, res) => {
    try {
        const subject_id = req.params.subject_id;
        // if caching exits - fetch from caching - memcache/redis
        // else make a db call
        const response = await db
            .promise()
            .query(`SELECT * FROM questions WHERE subject_id = '${subject_id}'`);
        res.status(200).json(response[0]);
        // caching. save - response[0]
    } catch (err) {
        res.status(400).json(err);
    }
});

// http://localhost:4000/questions/searchquestion/qs_id
router.get("/searchquestion/:qs_id", async (req, res) => {
    try {
        const qs_id = req.params.qs_id;
        const response = await db.promise().query(`SELECT * FROM questions WHERE qs_id = '${qs_id}'`);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});

// http://localhost:4000/questions/getquestionbysubject/?subject=1&count=2
router.get("/getquestionbysubject/", async (req, res) => {
    try {
        const subject_id = req.query.subject;
        const count = req.query.count;
        const response = await db.promise().query(`SELECT * FROM questions WHERE subject_id = '${subject_id}' ORDER BY RAND() LIMIT ${count} `);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});

// http://localhost:4000/questions/editquestion
router.get("/editquestion/", async (req, res) => {
    try {
        console.log(req.body);
        const response = await db.promise().query(`SELECT * FROM users WHERE userid = '${userId}'`);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});

// http://localhost:4000/questions/removequestion/qs_id
router.delete("/removequestion/:qs_id", async (req, res) => {
    try {
        const qs_id = req.params.qs_id;
        const response = await db
            .promise()
            .query(`DELETE FROM questions WHERE qs_id = '${qs_id}'`);
        res.status(200).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
});



// http://localhost:4000/questions/addquestion
router.post('/addquestion', async(req, res) => {
    try {
        // console.log(req.body);
        const response = await db.promise().query(`SELECT * FROM questions WHERE subject_id, question, answer1, answer2, answer3, answer4, answer5, correctanswer)
          VALUES ('${req.body.subject_id}','${req.body.question}',' ${req.body.answer1}','${req.body.answer2}',
          '${req.body.answer3}', '${req.body.answer4}' , '${req.body.answer5}' , '${req.body.correctanswer}')`);
        
        res.status(201).json({ massage: 'success' });
    } catch(err) {
        res.status(400).json(err);
    }
})
  




// http://localhost:4000/questions/editquestion
router.put('/editquestion', async(req, res) => {
    try {
        console.log(req.body);
        const response = await db.promise().query(`UPDATE questions SET question = '${req.body.question}', 
        answer1 = '${req.body.answer1}', answer2 = '${req.body.answer2}', 
        answer3 = '${req.body.answer3}', answer4 = '${req.body.answer4}', 
        answer5 = '${req.body.answer5}', correctanswer = '${req.body.correctanswer}' 
        WHERE qs_id = '${req.body.qs_id}'`);
        console.log(response);
        res.status(200).json(response[0]);
    } catch(err) {
        // console.log(err);
        res.status(400).json({ massage: err.massage });
    }
})

module.exports = router;