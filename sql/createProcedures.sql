
-- create stored procedures

use gametracker;

DELIMITER $$ 

drop procedure if exists sp_getTeamPlayers;


CREATE PROCEDURE sp_getTeamPlayers(teamID int)
BEGIN
    select  firstName, 
            lastName, 
            number, 
            position, 
            batHandedness, 
            throwHandedness, 
            gradYear
    from player 
    where team = teamID;
END $$

DELIMITER ;

