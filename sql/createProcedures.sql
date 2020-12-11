
-- create stored procedures

use gametracker;

drop procedure if exists sp_getTeamPlayers;

DELIMITER $$ 

CREATE PROCEDURE sp_getTeamPlayers(teamName varchar(50))
BEGIN
    select  firstName, 
            lastName, 
            number, 
            position, 
            batHandedness, 
            throwHandedness, 
            gradYear
    from player p join team t on p.team = t.teamID
    where t.name = teamName;
END $$

DELIMITER ;

