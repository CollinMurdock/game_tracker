
const mysql = require('mysql')

class GameTrackerDB {

    conn;

    constructor() {
        // create connection
        this.conn = mysql.createConnection({
            host: 'game-tracker.c9xtyyhdg4du.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'sS0wnenRupcpi8tyM0D7',
            database: 'gametracker'
        })
    }

    async getTeamPlayers(teamID, callback) {
        let query = 'CALL sp_getTeamPlayers("?")'
        this.conn.query(query, [teamID], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].status == 1) return callback(new Error("Team not found."))
            if (result[0].length == 0) return callback(new Error("No players found."))
            return callback(null, result[0])
        })
    }

    async addTeam(data, callback) {
        // create the team
        let q = "CALL sp_addTeam(?, ?, ?, ?)"
        this.conn.query(q, [data.name, data.state, data.city, data.mascot], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].status == 1) return callback(new Error('Team name already taken.'))
            return callback(null, result[0][0].out_teamID)
        })
    }

    async getPlayer(playerID, callback) {
        let q = 'SELECT * FROM player WHERE playerID = ? AND isDeleted < 1'
        this.conn.query(q, [playerID], (err, result) => {
            if (err) return callback(err)
            if (result.length == 0) {
                return callback(new Error("Player not found."))
            }
            return callback(null, result[0])
        })
    }

    async getTeam(teamID, callback) {
        let q = 'SELECT * FROM team WHERE teamID = ? AND isDeleted < 1'
        this.conn.query(q, [teamID], (err, result) => {
            if (err) return callback(err)
            if (result.length == 0) {
                return callback(new Error("Team not found."))
            }
            return callback(null, result[0])
        })
    }

    async deleteTeam(teamID, callback) {
        let q = 'call sp_deleteTeam(?)'
        this.conn.query(q, [teamID], (err, result) => {
            if (err) return callback(err)
            if (result.length == 0) {
                return callback(new Error("Team not found."))
            } else if (result[0][0].status == 1) {
                return callback(new Error("Team not found."))
            }
            return callback(null, null)
        })
    }

    async editTeam(teamID, data, callback) {
        // create the team
        // if the field doesn't exist, give it a null
        if (!data.name) data.name = null
        if (!data.state) data.state = null
        if (!data.city) data.city = null
        if (!data.mascot) data.mascot = null

        let q = "CALL sp_editTeam(?, ?, ?, ?, ?)"
        this.conn.query(q, [teamID, data.name, data.state, data.city, data.mascot], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].status == 1) return callback(new Error('Team not found.'))
            if (result[0][0].status == 2) return callback(new Error('Team name already exists.'))
            return callback(null, null)
        })
    }

    async addPlayer(data, callback) {
        // fill missing data with nulls
        if (!data.position) data.position = null
        if (!data.batHandedness) data.batHandedness = null
        if (!data.throwHandedness) data.throwHandedness = null

        let q = "CALL sp_addPlayer(?, ?, ?, ?, ?, ?, ?, ?)"
        this.conn.query(q, [data.firstName, data.lastName, data.number, data.teamID, data.position,
                        data.batHandedness, data.throwHandedness, data.gradYear], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].status == 1) return callback(new Error('Team not found.'))
            if (result[0][0].status == 2) return callback(new Error('Player number already taken on that team.'))
            return callback(null, result[0][0].out_playerID)
        })
    }

    async deletePlayer(playerID, callback) {
        let q = 'call sp_deletePlayer(?)'
        this.conn.query(q, [playerID], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].status == 1) return callback(new Error("Player not found."))
            return callback(null, null)
        })
    }

    async editPlayer(playerID, data, callback) {
        // fill missing data with nulls
        if (!data.firstName) data.firstName = null
        if (!data.lastName) data.lastName = null
        if (!data.number) data.number = null
        if (!data.position) data.position = null
        if (!data.batHandedness) data.batHandedness = null
        if (!data.throwHandedness) data.throwHandedness = null
        if (!data.gradYear) data.gradYear = null

        let q = "CALL sp_editPlayer(?, ?, ?, ?, ?, ?, ?, ?)"
        this.conn.query(q, [playerID, data.firstName, data.lastName, data.number, data.position,
                        data.batHandedness, data.throwHandedness, data.gradYear], (err, result) => {
            if (err) return callback(err)
            if (result[0][0].out_error) { // validation error occured on mysql server
                return callback(new Error(result[0][0].out_error))
            }
            return callback(null, result[0][0].out_playerID)
        })
    }
}

module.exports = GameTrackerDB