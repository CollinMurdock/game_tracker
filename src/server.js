
const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 80

app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: '.'})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

