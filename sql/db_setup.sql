
-- set up file for the gametracker database
-- mysql

drop database if exists gametracker;
create database gametracker;
use gametracker;

create table team(
    teamID int not null auto_increment,
    state varchar(2), -- OH, FL, PA...
    city varchar(50),
    name varchar(50) not null,
    mascot varchar(50),
    isDeleted TINYINT not null default 0,
    PRIMARY KEY (teamID)
) engine = innodb;

create table game(
    gameID INT NOT NULL AUTO_INCREMENT,
    date date not null,
    time time,
    homeTeam int,
    awayTeam int,
    primary key (gameID),
    FOREIGN key (homeTeam) references team(teamID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN key (awayTeam) references team(teamID) ON UPDATE CASCADE ON DELETE CASCADE
) engine = innodb;

create table player(
    playerID int not null AUTO_INCREMENT,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    number int not null,
    team int not null,
    position varchar(30),
    batHandedness ENUM('R','L'),
    throwHandedness ENUM('R','L'),
    gradYear YEAR not null,
    isDeleted TINYINT not null default 0,
    primary key (playerID),
    FOREIGN key (team) references team(teamID) ON UPDATE CASCADE ON DELETE CASCADE
) engine = innodb;

-- contain every pitch from every game
create table pitch(
    pitchID int not null AUTO_INCREMENT,
    game int not null,
    pitcher int not null,
    batter int not null,
    pitchNum int not null,
    -- game state (before the pitch is thrown)
    balls int not null,
    strikes int not null,
    firstBase int,
    secondBase int,
    thirdBase int,
    -- pitch info
    pitchType varchar(20) not null, -- CHANGE LATER
    pitchLocation int, -- refers to where the pitch crosses the plate. 1-9 in the box. 10-13 outside
    -- swing
    swing varchar(20) not null, -- CHANGE LATER break it up? enum? see XO codebook
    -- keys
    primary key (pitchID),
    FOREIGN key (game) references game(gameID) ON UPDATE CASCADE ON DELETE CASCADE
) engine = innodb;