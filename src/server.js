
const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 80

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })

    let con = mysql.createConnection({
        host: 'game-tracker.c9xtyyhdg4du.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: ''
    })

    con.connect(function (err) {
        if (err) throw err;
        console.log('connected to db')
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

