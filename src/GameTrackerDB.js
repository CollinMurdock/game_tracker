
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
        // see if the team exists
        let query = 'SELECT teamID FROM team WHERE teamID=? AND isDeleted < 1'
        this.conn.query(query, [teamID], (err, result) => {
            if (err) return callback(err)
            if(result.length == 0) return callback(new Error("Team does not exist."))
            else getPlayers(this.conn, teamID)
        })

        // get players
        function getPlayers (conn, teamID) {
            let query = 'CALL sp_getTeamPlayers("?")'
            conn.query(query, [teamID], (err, result) => {
                if (err) return callback(err)
                if (result[0].length == 0) return callback(new Error("No players found."))
                return callback(null, result[0])
            })
        }
    }

    async addTeam(data, callback) {
        // team cannot have the same name as another
        let query = 'SELECT teamID FROM team WHERE name = ?'
        this.conn.query(query, [data.name], (err, result) => {
            if (err) return callback(err)
            if (result.length > 0) return callback(new Error("Team name already exists."))
            else createTeam(this.conn, data)
        })
        
        // create the team
        function createTeam (conn, data) {
            let q = 'CALL sp_addTeam("?", "?", "?", "?")'
            conn.query(q, [data.name, data.state, data.city, data.mascot], (err, result) => {
                if (err) return callback(err)
            })
        }
    }
}

module.exports = GameTrackerDB