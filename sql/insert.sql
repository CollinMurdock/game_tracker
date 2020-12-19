
delete from team
where teamID < 10000000;
ALTER TABLE team AUTO_INCREMENT = 1;

delete from player
where playerID < 10000000;
ALTER TABLE player AUTO_INCREMENT = 1;

insert into 
    team (state, city, name, mascot)
values 
    ('OH', 'Oxford', 'Miami University', 'Redhawks'),
    ('OH', 'Bowling Green', 'Bowling Green University', 'Falcons'),
    ('OH', 'Columbus', 'Ohio State University', 'Buckeyes');


insert into 
    player (firstName, lastName, number, team, position, batHandedness, throwHandedness, gradYear)
VALUES
    ('Jada', 'Dotson', 1, 1, 'Outfielder', 'R', 'R', 2022),
    ('Morgan', 'Lott', 2, 1, 'Outfielder', 'R', 'R', 2022),
    ('Taylor', 'Rathe', 3, 1, 'Pitcher', 'R', 'R', 2022),
    ('Nikki', 'Sorgi', 0, 2, 'Infielder', 'R', 'R', 2022),
    ('Sophie', 'Bosket', 1, 2, 'Outfielder', 'L', 'R', 2024),
    ('Payton', 'Hamm', 2, 2, 'Outfielder', 'L', 'R', 2022);
