# Public API

Broken down into different sections for the main operation.

## Team Endpoints

### GET /api/v1/getTeam:/teamID COMPLETED

Get information for a team.

##### Expected Response

```
{
    "teamName": "Miami",
    "state": "OH",
    "city": "Oxford",
    "mascot": "Redhawks"
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/addTeam COMPLETED

Create a new team.

##### Fields

|Name|Type|Description|
|---|---|---|
|name|string|**Required** Name of the team. (i.e. "Miami University")|
|state|string|What state the team is located in. Two letter abbreviation code (i.e. OH)|
|city|string|What city the team is lcoated in.|
|mascot|string|The team mascot (i.e. Redskins)|

##### Expected Response

```
{
    "status": "success",
    "teamID": 23
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/deleteTeam/:teamID COMPLETED

Deletes a team associated with the given teamID.

##### Expected Response

```
{
    "status": "success"
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/editTeam/:teamID COMPLETED

Edit the information about a team.

##### Fields

|Name|Type|Description|
|---|---|---|
|name|string|The name of the team.|
|state|string|What state the team is located in. Two letter abbreviation code (i.e. OH)|
|city|string|What city the team is lcoated in.|
|mascot|string|The team mascot (i.e. Redskins)

##### Expected Response

```
{
    "status": "success"
}
```

<br>
<br>
<br>
<br>

## Player Endpoints

### GET /api/v1/getTeamPlayers/:teamID COMPLETED

Retrieve all players for the given team.

##### Expected Response 

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

<br>
<br>
<br>
<br>

### GET /api/v1/getPlayer/:playerID COMPLETED

Retrieve information on a given player.

##### Expected Response

```
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
```

<br>
<br>
<br>
<br>

### POST /api/v1/addPlayer COMPLETED

Adds a new player to a specified team. 

##### Fields

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

##### Expected Response

```
{
    "status": "success",
    "playerID": 23
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/deletePlayer/:playerID COMPLETED

Deletes a player from a team.

##### Expected Response

```
{
    "status": "success"
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/editPlayer/:playerID COMPLETED

Edit the information for a player

##### Fields

|Name|Type|Description|
|---|---|---|
|firstName|string|The first name of the player.|
|lastName|string|The last name of the player.|
|number|int|The number of the player. Note that currently, double zero (00) is not a valid number.|
|position|string|The player's position.|
|batHandedness|string|What hand the player bats with. "R" or "L".|
|throwHandedness|string|What hand the player throws with. "R" or "L".|
|gradYear|int|The year that the player will graduate.|

##### Expected Response

```
{
    "status": "success",
    "fieldsUpdated": [
        "firstName": "new first name",
        "lastName": "new last name",
        "number": "new number",
        "position": "new position",
        "batHandedness": "new bat handednesss",
        "throwHandedness": "new throw handednesss",
        "gradYear": "new graduation year"
    ]
}
```

<br>
<br>
<br>
<br>

## Game Endpoints

### GET /api/v1/getGame/:gameID

Get information about a game.

##### Expected Response

```
{
    "homeTeam": 12,
    "awayTeam": 15,
    "date": "2020-03-15",
    "time": "15:30"
}
```

<br>
<br>
<br>
<br>

### GET /api/v1/getAllGames

Get information on all games.

##### Expected Response

```
{
    "teams": [
        {
            "homeTeam": 12,
            "awayTeam": 15,
            "date": "2020-03-15",
            "time": "15:30"
        },
        {
            "homeTeam": 9,
            "awayTeam": 17,
            "date": "2020-03-12",
            "time": "17:30"
        }
    ]
}
```

<br>
<br>
<br>
<br>

### POST /api/v1/addGame

Create a game.

##### Fields

|Name|Type|Description|
|---|---|---|
|homeTeam|int|**Required** Team ID for the home team.|
|awayTeam|int|**Required** Team ID for the away team.|
|date|string|**Required** Date of the game. Format: YYYY-MM-DD|
|time|string|Time of day for the game. Format: HH:MM e.g. 09:30, 15:00|

##### Expected Response

```
{
    "status": "success",
    "gameID": 1212
}
```

<br>
<br>
<br>
<br>
<br>

### POST /api/v1/deleteGame/:gameID

Delete a game and all of its recorded pitches.

##### Expected Response

```
{
    "status": "success"
}
```

## Pitch Endpoints

### GET /api/v1/getGamePitches/:gameID

Return a CSV file containing all the pitches for the specified game.

<br>
<br>
<br>
<br>

### GET /api/v1/getTeamPitches/:teamID

Return a CSV file containing all pitches for a team. Use the query string arguments `startDate` and `endDate` to filter using a date range. Examples:
- `/api/v1/getTeamPitches/10` will return all pitches for the given team.
- `/api/v1/getTeamPitches/10?startDate=2020-01-01&endDate=2020-02-13` will return all pitches for the given team between the start of 2020 and March 15th (inclusive)
- `/api/v1/getTeamPitches/10?startDate=2020-01-01` will return all pitches for the given team including and after Jan 1, 2020.

<br>
<br>
<br>
<br>

### GET /api/v1/getPitcherPitches/:playerID

Return a CSV file containing all pitches for a given pitcher. Use the query string arguments `startDate` and `endDate` to filter using a date range (See GET /api/v1/getTeamPitches/:teamID for examples.) 

<br>
<br>
<br>
<br>

### GET /api/v1/getBatterPitches/:playerID

Return a CSV file containing all pitches that a given batter has seen. Use the query string arguments `startDate` and `endDate` to filter using a date range (See GET /api/v1/getTeamPitches/:teamID for examples.) 

<br>
<br>
<br>
<br>

### POST /api/v1/recordPitch

Record a pitch.
<br>
<br>
**Note on pitch location.** The pitch location fields describe where the ball was thrown in relation to the strike zone. The strike zone for every batter will technically be different, because player's heights differ and the call is subjective. Nevertheless, we can define our own dimensions for a the strike zone. This article [here](https://www.baseballprospectus.com/news/article/40891/prospectus-feature-the-universal-strike-zone/) details what an MLB "universal" strike zone may look like. This system will use those dimensions to define a strike zone of roughly the same scale and record data using arbitrary units. The article proposes a zone that is roughtly 20 inches wide by 44 inches tall. For simplicity, we can use any zone that is twice as tall as it is wide. **Therefore, our strike zone will be defined as 100 units width by 200 units height. The origin (0,0) will be the top left corner of the zone.** Negative measurements or measurements greater than the boundary will indicate that a pitch was thrown outside of the strike zone. This doesn't always mean it was called a ball, though.

##### Fields

|Name|Type|Description|
|---|---|---|
|gameID|int|**Required** The ID of the game this pitch takes place in.|
|pitcherID|int|**Required** The ID of the pitcher that threw this pitch.|
|batterID|int|**Required** The ID of the batter that took this pitch.|
|inning|int|**Required** The inning that this pitch took place in.|
|balls|int|**Required** The number of balls for the at bat (before the pitch occured).|
|strikes|int|**Required** The number of strikes for the at bat (before the pitch occured).|
|firstBase|boolean|**Required** `true` if there is a player on first. `false` otherwise.|
|secondBase|boolean|**Required** `true` if there is a player on second. `false` otherwise.|
|thirdBase|boolean|**Required** `true` if there is a player on third. `false` otherwise.|
|pitchType|string|The type of pitch that was thrown (i.e. "fastball").|
|pitchLocationX|int|The X component of the location of the pitch in the strike zone (See note above).|
|pitchLocationY|int|The Y component of the location of the pitch in the strike zone (See note above).|
|swing|string|**Required** This is the result of the pitch (i.e. single, double, ball, stike ...). Enumerated codes for these events to come.|
