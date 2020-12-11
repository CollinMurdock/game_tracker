
const mysql = require('mysql')

export class GameTrackerDB {

    conn;

    constructor() {
        // create connection
        this.conn = mysql.createConnection({
            host: 'game-tracker.c9xtyyhdg4du.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'sS0wnenRupcpi8tyM0D7'
        })

        
    }

    
}