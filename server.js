const express = require('express');
const mysql = require('mysql2');
const { start }  = require('./prompts');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.userID,
        password: process.env.password,
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/api/department', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});



start(db).then((answers) => {
    console.log(answers);
});