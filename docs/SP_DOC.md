
# DB Stored Procedures

Broken down into main table that it interacts with.

##### Note on status codes
Status codes are returned in a field called `status`

## Team Procedures

### &#8226; sp_addTeam(name varchar(50), state varchar(2), city varchar(50), mascot varchar(50))

Create a new team.

##### Status Codes
- 0: successful!
- 1: team name already taken

<br>
<br>

### &#8226; sp_deleteTeam(teamID int)

Delete a team.

##### Status Codes
- 0: successful!
- 1: team not found

<br>
<br>

### &#8226; sp_editTeam(teamID int, name varchar(50), state varchar(2), city varchar(50), mascot varchar(50))

Edit information for a team.

##### Status Codes
- 0: successful!
- 1: team not found
- 2: team name already taken

<br>
<br>

## Player Procedures

### &#8226; sp_getTeamPlayers()

Retrieve all fields for all players on a given team.

###### Status Codes
- 0: successful!
- 1: team not found.

<br>
<br>

### &#8226; sp_addPlayer(firstName varchar(50), lastName varchar(50), number int, teamID int, position varchar(30), batHandedness ENUM('R', 'L'), throwHandedness ENUM('R', 'L'), gradYear year)

Create a new player.

##### Status Codes
- 0: successful!
- 1: team not found
- 2: new player has the same number as someone already on the team

<br>
<br>

### &#8226; sp_deletePlayer(playerID int)

Delete a player.

##### Status Codes
- 0: successful!
- 1: player not found

<br>
<br>

### &#8226; sp_editPlayer(playerID int, firstName varchar(50), lastName varchar(50), number int, position varchar(30), batHandedness ENUM('R', 'L'), throwHandedness ENUM('R', 'L'), gradYear year)

Edit information for a player.

##### Status Codes
- 0: successful!
- 1: player not found
- 2: player has the same number as someone already on the team

<br>
<br>

## Game Procedures

### &#8226; sp_addGame(homeTeamID int, awayTeamID int, date date, time time)

Create a game entry.

##### Status Codes
- 0: successful!
- 1: home team not found
- 2: away team not found

<br>
<br>

### &#8226; sp_deleteGame(gameID int)

Delete a game entry and all of it's pitches.

##### Status Codes
- 0: successful!
- 1: game not found

<br>
<br>

### &#8226; sp_getGame(gameID int)

Get information for a specific game.

##### Status Codes
- 0: successful!
- 1: game not found

<br>
<br>

### ~&#8226; sp_getAllGames()~

~List all of the games.~

##### ~Status Codes~
- ~0: successful!~

<br>
<br>

## Pitch Procedures

### &#8226; sp_recordPitch(gameID int, pitcherID int, batterID int, inning int, balls tinyint, strikes tinyint, firstBase bool, secondBase bool, thirdBase bool, pitchType varchar, pitchLocationX smallint, pitchLocationY smallint, swing varchar)

Record a pitch.

##### Status Codes
- 0: successful!
- 1: game not found
- 2: pitcher not found
- 3: batter not found

<br>
<br>

### &#8226; sp_deletePitch(pitchID int)

Delete a pitch.

##### Status Codes
- 0: successful!
- 1: pitch not found

<br>
<br>

### &#8226; sp_getGamePitches(gameID int)

Get all pitches from a game.

##### Status Codes
- 0: successful!
- 1: game not found

<br>
<br>

### &#8226; sp_getTeamPitches(teamID int, startDate date, endDate date)

Get all pitches for a team in the given range.

##### Status Codes
- 0: successful!
- 1: team not found

<br>
<br>

### &#8226; sp_getPitcherPitches(pitcherID int, startDate date, endDate date)

Get all pitches for a pitcher in the given range.

##### Status Codes
- 0: successful!
- 1: player not found

<br>
<br>

### &#8226; sp_getBatterPitches(batterID int, startDate date, endDate date)

Get all pitcher that a batter saw in the given range.

##### Status Codes
- 0: successful!
- 1: player not found
