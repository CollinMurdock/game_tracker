
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
            if (err.message == 'Team does not exist.') res.status(404)
            else if (err.message == 'No players found.') res.status(404)
            else res.status(500)
            res.json({"error": err.message, "teamID": teamID})
        }
        res.json(result)
    })
})

// ADD team 
app.post('/api/v1/addTeam', async (req, res) => {

    // TODO validate data
    data = req.body

    console.log('server')
    console.log(data)
    
    db.addTeam(data, (err, result) => {
        if (err) {
            res.status(500).json({"error": err.message})
        }

        res.json({'status':'success'})
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

