
-- create stored procedures

use gametracker;

DELIMITER $$ 

-- sp_getTeamPlayers

drop procedure if exists sp_getTeamPlayers $$

CREATE PROCEDURE sp_getTeamPlayers(arg_teamID int)
BEGIN
	if exists (
		select teamID from team where teamID = arg_teamID
    )
    then
		select  
			playerID,
			team,
			firstName, 
			lastName, 
			number, 
			position, 
			batHandedness, 
			throwHandedness, 
			gradYear
		from player 
		where team = arg_teamID AND isDeleted < 1;
    else
		select 0 as result;
    end if;
END $$

-- sp_addTeam

drop procedure if exists sp_addTeam $$

CREATE PROCEDURE sp_addTeam(
    arg_name varchar(50),
    arg_state varchar(2),
    arg_city varchar(50),
    arg_mascot varchar(50)
)
BEGIN
    INSERT INTO team (state, city, name, mascot)
    values (arg_state, arg_city, arg_name, arg_mascot);
    SELECT LAST_INSERT_ID() as out_teamID;
END $$

-- sp_deleteTeam

drop procedure if exists sp_deleteTeam $$

create procedure sp_deleteTeam(arg_teamID int)
BEGIN
	if exists (	
				select teamID 
				from team 
                where teamID = arg_teamID 
                and isDeleted < 1
	)
	then
		update team 
		set isDeleted = 1
		where teamID = arg_teamID;
        select 1 as out_result;
    else
		select 0 as result;
	end if;
end $$

-- sp_editTeam

drop procedure if exists sp_editTeam $$

create procedure sp_editTeam(
    arg_teamID int,
    arg_name varchar(50),
    arg_state varchar(2),
    arg_city varchar(50),
    arg_mascot varchar(50) 
)
begin 
    update team
    set 
        name = if(arg_name is null, name, arg_name),
        state = if(arg_state is null, state, arg_state),
        city = if(arg_city is null, city, arg_city),
        mascot = if(arg_mascot is null, mascot, arg_mascot)
    where teamID = arg_teamID;
    
    select 1 as result;
end $$

-- sp_addPlayer

drop procedure if exists sp_addPlayer $$

create procedure sp_addPlayer(
    arg_firstName varchar(50),
    arg_lastName varchar(50),
    arg_number int,
    arg_teamID int,
    arg_position varchar(30),
    arg_batHandedness ENUM('R','L'),
    arg_throwHandedness ENUM('R','L'),
    arg_gradYear year
)
begin
	if not exists ( -- team needs to exist
		select teamID 
        from team
        where teamID = arg_teamID
    )
    then
		select 'Team not found.' as out_error;
    elseif exists (	-- player can't have same number on same team
			select playerID 
			from player 
			where team = arg_teamID 
			and number = arg_number and isDeleted < 1
		) 
	then
		select 'Player number already taken on that team.' as out_error;
    else
		insert into player(firstName, lastName, number, team, position, batHandedness, throwHandedness, gradYear)
		values (arg_firstName, arg_lastName, arg_number, arg_teamID, arg_position, arg_batHandedness, arg_throwHandedness, arg_gradYear)
		;
        select LAST_INSERT_ID() as out_playerID;
    end if;
end $$

-- sp_deletePlayer

drop procedure if exists sp_deletePlayer $$

create procedure sp_deletePlayer(arg_playerID int)
BEGIN
	if exists (
		select playerID from player where playerID = arg_playerID
    )
    then
		update player 
		set isDeleted = 1
		where playerID = arg_playerID;
        select 1 as result;
    else
		select 0 as result;
    end if;
end $$

-- sp_editPlayer

drop procedure if exists sp_editPlayer $$

create procedure sp_editPlayer(
    arg_playerID int,
    arg_firstName varchar(50),
    arg_lastName varchar(50),
    arg_number int,
    arg_position varchar(30),
    arg_batHandedness ENUM('R','L'),
    arg_throwHandedness ENUM('R','L'),
    arg_gradYear year
)
begin
	if exists ( -- make sure the player exists
		select playerID from player where playerID = arg_playerID
    )
    then
		if exists (	-- player can't have same number on same team
				select playerID 
				from player 
				where number = arg_number and isDeleted < 1 
						and team in (select team from player where playerID = arg_playerID)
			) 
		then
			select 'Player number already taken on that team.' as out_error;
		else
			update player
			set 
				firstName = if(arg_firstName is null, firstName, arg_firstName),
				lastName = if(arg_lastName is null, lastName, arg_lastName),
				number = if(arg_number is null, number, arg_number),
				position = if(arg_position is null, position, arg_position),
				batHandedness = if(arg_batHandedness is null, batHandedness, arg_batHandedness),
				throwHandedness = if(arg_throwHandedness is null, throwHandedness, arg_throwHandedness),
				gradYear = if(arg_gradYear is null, gradYear, arg_gradYear)
			where playerID = arg_playerID;
			select 1 as result;
		end if;
    else
		select 'Player not found.' as out_error;
    end if;
    
end $$



DELIMITER ;

