create table Investor (
  username text primary key,
  balance double precision
);

create table Project (
  project_id integer primary key,
  repo text,
  owner text
);

create table Investment (
  investment_id integer primary key,
  timestamp integer,
  value_bought real,
  value real,
  project_id integer not null references Project(project_id),
  username text not null references Investor(username)
);

create table Invested (
  invested_id integer primary key,
  value_bought real,
  value_sold real,
  timestamp integer,
  project_id integer not null references Project(project_id),
  username text not null references Investor(username)
);
