
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

    async getTeamPlayers(teamName) {
        return new Promise((resolve, reject) => {
            let query = 'CALL sp_getTeamPlayers("'+teamName+'")'
            this.conn.query(query, (err, result) => {
                return err ? reject(err) : resolve(result[0])
            })
        }) 
    }
}

module.exports = GameTrackerDB