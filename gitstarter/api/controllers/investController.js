var { Pool } = require('pg');
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

exports.investProject = function(req, res) {
  if (req.cookies.username == null) {
    res.redirect('/logout');
  }
  const username = req.cookies.username;
  const value_bought = req.body.value_bought;
  const value = req.body.value;
  const repo = req.body.repo;
  const owner = req.body.owner;
  var previous_value = req.body.previous_value;
  if (previous_value == null) {
    previous_value = 0;
  }
  const errMessage = {message : "Failed to invest in project."};
  if (username == null || value_bought == null || value == null || repo == null || owner == null) {
    res.status(400).send({message : "Insufficient data for investment."});
  } else {
    pool.connect(function(err, client, done) {
      if (err) {
        done();
        res.status(400).send(err);
        return;
      }
      const shouldAbort = function(err) {
        if (err) {
          client.query("ROLLBACK", function(err) {
            done();
            if (err) {
              res.status(400).send({message : "Error rolling back client"});
            }
          });
        }
        return !!err;
      }
      client.query("BEGIN", function(err) {
        if (shouldAbort(err)) {
          errMessage.error = err;
          res.status(400).send(errMessage);
          return;
        }
        const query = "WITH I AS (SELECT project_id FROM Project WHERE repo = $1 AND owner = $2), J AS (INSERT INTO PROJECT(repo, owner) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM I) RETURNING project_id) SELECT project_id FROM I UNION ALL SELECT project_id FROM J";
        client.query(query, [repo, owner], function (err, result) {
          if (shouldAbort(err)) {
            console.log(err);
            errMessage.error = err;
            res.status(400).send(errMessage);
            return;
          } else if (result.rows.length < 1) {
            shouldAbort(true);
            res.status(400).send(errMessage);
            return;
          }
          const project_id = result.rows[0].project_id;
          const args = [value_bought, value, project_id, username];
          const query = "INSERT INTO Investment(value_bought, value, project_id, username) VALUES ($1, $2, $3, $4) ON CONFLICT (project_id, username) DO UPDATE SET value_bought = $1 + (Investment.value_bought * ($2 / Investment.value)), value = $2 WHERE Investment.project_id = $3 AND Investment.username = $4 RETURNING value_bought";
          client.query(query, args, function(err, result) {
            if (shouldAbort(err)) {
              console.log(err);
              errMessage.error = err;
              res.status(400).send(errMessage);
              return;
            } else if (result.rows.length < 1) {
              shouldAbort(true);
              res.status(400).send(errMessage);
              return;
            }
            const timestamp = Math.round(Date.now() / 1000);
            const new_value = result.rows[0].value_bought;
            const query  = "INSERT INTO Activity(new_value, previous_value, balance, timestamp, project_id, username) VALUES ($1, $2, (SELECT balance - $3 FROM Investor WHERE username = $6), $4, $5, $6) RETURNING balance";
            client.query(query, [new_value, previous_value, value_bought, timestamp, project_id, username], function(err, result) {
              if (shouldAbort(err)) {
                console.log(err);
                errMessage.error = err;
                res.status(400).send(errMessage);
                return;
              } else if (result.rows[0].balance == null || result.rows[0].balance < 0) {
                if (shouldAbort(true)) {
                  errMessage.error = err;
                  res.status(400).send(errMessage);
                }
              }
              const query = "UPDATE Investor SET balance = (SELECT balance FROM Investor WHERE username = $2 AND balance - $1 >= 0) - $1 WHERE username = $2 RETURNING balance";
              client.query(query, [value_bought, username], function(err, result) {
                if (shouldAbort(err)) {
                  console.log(err);
                  errMessage.error = err;
                  res.status(400).send(errMessage);
                  return;
                } else if (result.rows[0].balance == null || result.rows[0].balance < 0) {
                  if (shouldAbort(true)) {
                    errMessage.error = err;
                    res.status(400).send(errMessage);
                  }
                }
                client.query("COMMIT", function(err) {
                  if (shouldAbort(err)) {
                    console.log(err);
                    errMessage.error = err;
                    res.status(400).send(errMessage);
                    return;
                  }
                  done();
                  res.send({message : "Success."});
                });
              });
            });
          });
        });
      });
    });
  }
}

exports.sellProject = function(req, res) {
  if (req.cookies.username == null) {
    res.redirect('/logout');
  }
  const username = req.cookies.username;
  const value_sold = req.body.value_sold;
  const value = req.body.value;
  const repo = req.body.repo;
  const owner = req.body.owner;
  const errMessage = {message : "Failed to sell project."};
  if (username == null || value_sold == null || value == null || repo == null || owner == null) {
    res.status(400).send({message : "Insufficient data for selling."});
  } else if (value_sold <= 0) {
    res.status(400).send({message : "The value sold must be a positive value."})
  } else {
    pool.connect(function(err, client, done) {
      const shouldAbort = function(err) {
        if (err) {
          client.query("ROLLBACK", function(err) {
            done();
            if (err) {
              res.status(400).send({message : "Error rolling back client"});
            }
          });
        }
        return !!err;
      }
      client.query("BEGIN", function(err) {
        if (shouldAbort(err)) {
          console.log(err);
          errMessage.error = err;
          res.status(400).send(errMessage);
          return;
        }
        const query = "SELECT Project.project_id, Investment.value_bought, Investment.value FROM Project, Investment WHERE Project.repo = $1 AND Project.owner = $2 AND Project.project_id = Investment.project_id"
        client.query(query, [repo, owner], function (err, result) {
          if (shouldAbort(err)) {
            console.log(err);
            errMessage.error = err;
            res.status(400).send(errMessage);
            return;
          } else if (result.rows.length < 1) {
            shouldAbort(true);
            res.status(400).send(errMessage);
            return;
          }
          const project_id = result.rows[0].project_id;
          const previous_value_bought = result.rows[0].value_bought;
          const previous_value = result.rows[0].value;
          const new_value_bought = -value_sold + (previous_value_bought * (value / previous_value));
          const args = [new_value_bought, value, project_id, username]
          const query = "UPDATE Investment SET value_bought = $1, value = $2 WHERE project_id = $3 AND username = $4 RETURNING value_bought";
          client.query(query, args, function(err, result) {
            if (shouldAbort(err)) {
              console.log(err);
              errMessage.error = err;
              res.status(400).send(errMessage);
              return;
            } else if (result.rows.length < 1) {
              shouldAbort(true);
              res.status(400).send(errMessage);
              return;
            }
            const timestamp = Math.round(Date.now() / 1000);
            const new_value = result.rows[0].value_bought;
            const args = [new_value, previous_value_bought, -value_sold, timestamp, project_id, username];
            const query  = "INSERT INTO Activity(new_value, previous_value, balance, timestamp, project_id, username) VALUES ($1, $2, (SELECT balance - $3 FROM Investor WHERE username = $6), $4, $5, $6) RETURNING balance";
            client.query(query, args, function(err, result) {
              if (shouldAbort(err)) {
                console.log(err);
                errMessage.error = err;
                res.status(400).send(errMessage);
                return;
              } else if (result.rows[0].balance == null || result.rows[0].balance < 0) {
                if (shouldAbort(true)) {
                  errMessage.error = err;
                  res.status(400).send(errMessage);
                }
              }
              const query = "UPDATE Investor SET balance = (SELECT balance FROM Investor WHERE username = $2 AND balance - $1 >= 0) - $1 WHERE username = $2 RETURNING balance";
              client.query(query, [-value_sold, username], function(err, result) {
                if (shouldAbort(err)) {
                  console.log(err);
                  errMessage.error = err;
                  res.status(400).send(errMessage);
                  return;
                } else if (result.rows[0].balance == null || result.rows[0].balance < 0) {
                  if (shouldAbort(true)) {
                    errMessage.error = err;
                    res.status(400).send(errMessage);
                  }
                }
                client.query("COMMIT", function(err) {
                  if (shouldAbort(err)) {
                    console.log(err);
                    errMessage.error = err;
                    res.status(400).send(errMessage);
                    return;
                  }
                  done();
                  res.send({message : "Success."});
                });
              });
            });
          });
        });
      });
    });
  }
}

exports.getInvestments = function(req, res) {
  if (req.cookies.username == null) {
    res.redirect('/logout');
  }
  const user = req.cookies.username;
  pool.connect(function(err, client, done) {
    client.query("SELECT * FROM Investor, Investment WHERE Investor.username = $1 AND Investor.username = Investment.username AND Investment.value_bought > 0", [user], function(err, result) {
      if (err) {
        done();
        console.log(err);
        res.status(400).send({message : "Failed to get investments."});
      } else {
        done();
        res.send(result);
      }
    });
  });
}

exports.getActivities = function(req, res) {
  if (req.cookies.username == null) {
    res.redirect('/logout');
  }
  const user = req.cookies.username;
  pool.connect(function(err, client, done) {
    client.query("SELECT * FROM Investor, Activity WHERE Investor.username = $1 AND Investor.username = Activity.username ORDER BY Activity.timestamp", [user], function(err, result) {
      if (err) {
        done();
        console.log(err);
        res.status(400).send({message : "Failed to get activities."});
      } else {
        done();
        res.send(result);
      }
    });
  });
}

exports.getBalance = function(req, res) {
  if (req.cookies.username == null) {
    res.redirect('/logout');
  }
  const user = req.cookies.username;
  pool.connect(function(err, client, done) {
    client.query("SELECT balance FROM Investor WHERE Investor.username = $1", [user], function(err, result) {
      if (err) {
        done();
        console.log(err);
        res.status(400).send({message : "Failed to get balance."});
      } else {
        done();
        res.send(result);
      }
    });
  });
}
