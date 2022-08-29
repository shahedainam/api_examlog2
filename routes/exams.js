const express = require('express');

const router = express.Router();

const db = require('../db');


//http://localhost:4000/exams/fetchallexams
router.get('/fetchallexams', async(req, res) => {
    try{
        // res.send('shaheda')
        const response = await db.promise().query('SELECT * FROM exams');
        console.log(response[0]);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json(err);
    }
})


//http://localhost:4000/questions/getquestionbysubject/subject_id
// router.get("/getquestionbysubject/:subject_id", async (req, res) => {
//     try {
//         const subject_id = req.params.subject_id;
//         // if caching exits - fetch from caching - memcache/redis
//         // else make a db call
//         const response = await db
//             .promise()
//             .query(`SELECT * FROM questions WHERE subject_id = '${subject_id}'`);
//         res.status(200).json(response[0]);
//         // caching. save - response[0]
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


// http://localhost:4000/exams/createexam
router.post('/createexam', async(req, res) => {
    try {
        // console.log(req.body);
        const response = await db.promise().query(`INSERT INTO exams (exam_name, subject_id, duration, total_questions)
          VALUES ('${req.body.exam_name}','${req.body.subject_id}',' ${req.body.duration}','${req.body.total_questions}')`);
        
        res.status(201).json({ message: 'success' });
    } catch(err) {
        res.status(400).json(err);
    }
})


// http://localhost:4000/exams/updateexam
router.put('/updateexam', async(req, res) => {
    try {
        console.log(req.body);
        const response = await db.promise().query(`UPDATE exams SET exam_name = '${req.body.exam_name}', 
        subject_id = '${req.body.subject_id}', duration = '${req.body.duration}', 
        total_questions = '${req.body.total_questions}', negativemarking = '${req.body.negativemarking}' 
        WHERE exam_id = '${req.body.exam_id}'`);
        console.log(response);
        res.status(200).json(response[0]);
    } catch(err) {
        // console.log(err);
        res.status(400).json({ massage: err.massage });
    }
})

module.exports = router