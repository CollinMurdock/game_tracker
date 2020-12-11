
const express = require('express')
const GameTrackerDB = require('./GameTrackerDB')

const app = express()
const port = 80
const db = new GameTrackerDB()

app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: '.'})
})

app.get('/api/v1/getTeamPlayers/:teamName', async (req, res) => {

    // extract and validate param
    name = req.params.teamName.replace('+',' ')
    console.log(name) 

    // get data
    res.json(await db.getTeamPlayers(name))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

