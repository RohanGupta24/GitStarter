create table Investor (
  username text primary key,
  balance double precision
);

create table Project (
  project_id serial primary key,
  repo text,
  owner text
);

create table Investment (
  investment_id serial primary key,
  value_bought real,
  value real,
  project_id integer not null references Project(project_id),
  username text not null references Investor(username),
  constraint uq_project_id_username unique (project_id, username)
);

create table Activity (
  activity_id serial primary key,
  new_value real,
  previous_value real,
  balance real,
  timestamp integer,
  project_id integer not null references Project(project_id),
  username text not null references Investor(username)
);
