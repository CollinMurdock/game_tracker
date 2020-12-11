
const express = require('express')
const GameTrackerDB = require('./GameTrackerDB')

const app = express()
const port = 80
const db = new GameTrackerDB()

app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: '.'})
})

app.get('/api/v1/getTeamPlayers/:teamID', async (req, res) => {

    // extract and validate param
    teamID = parseInt(req.params.teamID)

    // get data
    res.json(await db.getTeamPlayers(teamID))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

