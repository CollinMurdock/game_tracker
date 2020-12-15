
# API Documentation

A few different APIs to keep track of:
- Public API (for client to access).
- DB Stored Procedures
- GameTrackerDB methods


## Public API

### GET /api/v1/getTeamPlayers/:teamID COMPLETED

Retrieve all players for the given team.

##### Expected output

```
{
    teamID: 1,
    players: [
        {
            "id": 1,
            "team": 1,
            "firstName": "Jada",
            "lastName": "Dotson",
            "number": 1,
            "position": "Outfielder",
            "batHandedness": "R",
            "throwHandedness": "R",
            "gradYear": 2022
        }
    ]
}
```


### POST /api/v1/addTeam

Create a new team.

##### Parameters

|Name|Type|Description|
|---|---|---|
|name|string|**Required** Name of the team. (i.e. "Miami University")|
|state|string|What state the team is located in. Two letter abbreviation code (i.e. OH)|
|city|string|What city the team is lcoated in.|
|mascot|string|The team mascot (i.e. Redskins)|

<br>
<br>
<br>
<br>

### POST /api/v1/deleteTeam/:teamID

Deletes a team associated with the given teamID.

<br>
<br>
<br>
<br>

### POST /api/v1/editTeam/:teamID

Edit the information about a team.

##### Parameters

|Name|Type|Description|
|---|---|---|
|teamName|string|The name of the team.|
|state|string|What state the team is located in. Two letter abbreviation code (i.e. OH)|
|city|string|What city the team is lcoated in.|
|mascot|string|The team mascot (i.e. Redskins)

<br>
<br>
<br>
<br>

### POST /api/v1/addPlayer

Adds a new player to a specified team. 

##### Parameters

|Name|Type|Description|
|---|---|---|
|firstName|string|**Required** The first name of the player.|
|lastName|string|**Required** The last name of the player.|
|teamID|int|**Required** The name of the team the player will be added to. This team must already exist.|
|number|int|**Required** The number of the player. Note that currently, double zero (00) is not a valid number.|
|position|string|The player's position.|
|batHandedness|string|What hand the player bats with. "R" or "L".|
|throwHandedness|string|What hand the player throws with. "R" or "L".|
|gradYear|int|**Required** The year that the player will graduate.|

<br>
<br>
<br>
<br>

### POST /api/v1/deletePlayer/:playerID

Deletes a player from a team.

<br>
<br>
<br>
<br>

### POST /api/v1/editPlayer/:playerID

Edit the information for a player

|Name|Type|Description|
|---|---|---|
|firstName|string|The first name of the player.|
|lastName|string|The last name of the player.|
|number|int|The number of the player. Note that currently, double zero (00) is not a valid number.|
|position|string|The player's position.|
|batHandedness|string|What hand the player bats with. "R" or "L".|
|throwHandedness|string|What hand the player throws with. "R" or "L".|
|gradYear|int|The year that the player will graduate.|

-------------------------------------------------

## DB Stored Procedures

### &#8226; sp_getTeamPlayers(teamName varchar(50))  COMPLETED

Retrieve all fields for all players on a given team.

### &#8226; sp_addTeam(name varchar(50), state varchar(2), city varchar(50), mascot varchar(50))

Create a new team.

### &#8226; sp_deleteTeam(teamID int)

Delete a team.

### &#8226; sp_editTeam(teamID int, name varchar(50), state varchar(2), city varchar(50), mascot varchar(50))

Edit information for a team.

### &#8226; sp_addPlayer(firstName varchar(50), lastName varchar(50), number int, teamID int, position varchar(30), batHandedness ENUM('R', 'L'), throwHandedness ENUM('R', 'L'), gradYear year)

Create a new player.

### &#8226; sp_deletePlayer(playerID int)

Delete a player.

### &#8226; sp_editPlayer(playerID int, firstName varchar(50), lastName varchar(50), number int, position varchar(30), batHandedness ENUM('R', 'L'), throwHandedness ENUM('R', 'L'), gradYear year)

Edit information for a player.

--------------------------------------------------

## GameTrackerDB Class

These will line up directly with the stored procedures above.







