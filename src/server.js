
const express = require('express')
const GameTrackerDB = require('./GameTrackerDB')

const app = express()
app.use(express.json())

const port = 80
const db = new GameTrackerDB()

app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: '.'})
})

// GET team players
app.get('/api/v1/getTeamPlayers/:teamID', async (req, res) => {
    // extract and validate param
    teamID = parseInt(req.params.teamID)

    // get data
    db.getTeamPlayers(teamID, (err, result) => {
        if (err) {
            if (err.message == 'Team not found.') res.status(404)
            else if (err.message == 'No players found.') res.status(404)
            else res.status(500)
            res.json({"error": err.message, "teamID": teamID})
        } else {
            res.json({"teamID": teamID, "players": result})
        }
    })
})

// ADD team 
app.post('/api/v1/addTeam', async (req, res) => {

    // TODO validate data
    data = req.body

    db.addTeam(data, (err, result) => {
        if (err) {
            res.status(400).json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status':'success', 'teamID': result})
        }
    })
})

// GET player
app.get('/api/v1/getPlayer/:playerID', async (req, res) => {

    // TODO validate param
    playerID = parseInt(req.params.playerID)

    db.getPlayer(playerID, (err, result) => {
        if (err){
            if (err.message == 'Player not found.') res.status(404)
            else  res.status(500)
            res.json({"error": err.message, "playerID": playerID})
        } else {
            res.json({'playerID': playerID, 'player': result})
        }
    })
})

// GET team
app.get('/api/v1/getTeam/:teamID', async (req, res) => {

    // TODO validate param
    teamID = parseInt(req.params.teamID)

    db.getTeam(teamID, (err, result) => {
        if (err){
            if (err.message == 'Team not found.') res.status(404)
            else  res.status(500)
            res.json({"error": err.message, "teamID": teamID})
        } else {
            res.json({'teamID': teamID, 'team': result})
        }
    })
})

// DELETE team
app.post('/api/v1/deleteTeam/:teamID', async (req, res) => {

    // TODO validate param
    teamID = parseInt(req.params.teamID)

    db.deleteTeam(teamID, (err) => {
        if (err){
            if (err.message == 'Team not found.') res.status(404)
            else  res.status(500)
            res.json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status': 'success'})
        }
    })
})

// EDIT team
app.post('/api/v1/editTeam/:teamID', async (req, res) => {

    // TODO validate param
    teamID = parseInt(req.params.teamID)
    // TODO validate data
    data = req.body

    db.editTeam(teamID, data, (err, result) => {
        if (err){
            if (err.message == 'Team name already exists.') res.status(400)
            else  res.status(500)
            res.json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status': 'success'})
        }
    })
})

// ADD player
app.post('/api/v1/addPlayer', async (req, res) => {

    // TODO validate data
    data = req.body

    db.addPlayer(data, (err, result) => {
        if (err) {
            res.status(400).json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status':'success', 'playerID': result})
        }
    })
})

// DELETE player 
app.post('/api/v1/deletePlayer/:playerID', async (req, res) => {

    // TODO validate param
    playerID = parseInt(req.params.playerID)

    db.deletePlayer(playerID, (err) => {
        if (err){
            if (err.message == 'Player not found.') res.status(404)
            else  res.status(500)
            res.json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status': 'success'}) 
        }
    })
})

// EDIT player 
app.post('/api/v1/editPlayer/:playerID', async (req, res) => {

    // TODO validate param
    playerID = parseInt(req.params.playerID)
    // TODO validate data
    data = req.body

    db.editPlayer(playerID, data, (err, result) => {
        if (err){
            if (err.message == 'Player not found.') res.status(404)
            else if (err.message == 'Team not found.') res.status(400)
            else if (err.message == 'Player number already taken on that team.') res.status(400)
            else  res.status(500)
            res.json({"error": err.message, 'status': 'fail'})
        } else {
            res.json({'status': 'success'})
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

