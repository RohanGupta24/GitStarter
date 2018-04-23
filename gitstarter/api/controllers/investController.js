exports.investProject = function(req, res) {
  const username = req.body.user;
  const value_bought = req.body.value_bought;
  const value = req.body.value;
  const repo = req.body.repo;
  const owner = req.body.owner;
  const previous_value = req.body.previous_value;
  const errMessage = {message : "Failed to invest in project."};
  if (username == null || value_bought == null || value == null || repo == null || owner == null) {
    res.status(400).send({message : "Insufficient data for investment."});
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
          res.status(400).send(errMessage);
          return;
        }
        const query = "WITH I AS (SELECT project_id FROM Project WHERE repo = $1 AND owner = $2), J AS (INSERT INTO PROJECT(project_id, repo, owner) SELECT (SELECT COALESCE(MAX(project_id) + 1, 1) FROM Project), $1, $2 WHERE NOT EXISTS (SELECT 1 FROM I) RETURNING project_id) SELECT project_id FROM I UNION ALL SELECT project_id FROM J";
        client.query(query, [repo, owner], function (err, result) {
          if (shouldAbort(err)) {
            res.status(400).send(errMessage);
            return;
          } else if (result.rows.length < 1) {
            shouldAbort(true);
            res.status(400).send(errMessage);
            return;
          }
          const project_id = result.rows[0].project_id;
          const args = [value_bought, value, project_id, username];
          const query = "INSERT INTO Investment(investment_id, value_bought, value, project_id, username) VALUES ((SELECT COALESCE(MAX(investment_id) + 1, 1) FROM Investment), $1, $2, $3, $4) ON CONFLICT (project_id, username) DO UPDATE SET value_bought = $1 + (Investment.value_bought * ($2 / Investment.value)), value = $2 RETURNING value_bought";
          client.query(query, args, function(err, result) {
            if (shouldAbort(err)) {
              res.status(400).send(errMessage);
              return;
            } else if (result.rows.length < 1) {
              shouldAbort(true);
              res.status(400).send(errMessage);
              return;
            }
            const timestamp = Date.now();
            const new_value = result.rows[0].value_bought;
            const query  = "INSERT INTO Activity(activity_id, new_value, previous_value, timestamp, project_id, username) VALUES ((SELECT COALESCE(MAX(activity_id) + 1, 1) FROM Activity), $5, $3, $4, $1, $2)";
            client.query(query, [project_id, username, previous_value, timestamp, new_value], function(err, result) {
              if (shouldAbort(err)) {
                res.status(400).send(errMessage);
                return;
              }
              const query = "UPDATE Investor SET balance = (SELECT balance FROM Investor WHERE username = $1 AND balance - $1 > 0) - $1 WHERE username = $2";
              client.query(query, [value_bought, username], function(err result) {
                if (shouldAbort(err)) {
                  res.status(400).send(errMessage);
                  return;
                }
                client.query("COMMIT", function(err) {
                  if (shouldAbort(err)) {
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
  const username = req.body.user;
  const value_sold = req.body.value_sold;
  const value = req.body.value;
  const repo = req.body.repo;
  const owner = req.body.owner;
  const errMessage = {message : "Failed to sell project."};
  if (username == null || value_sold == null || value == null || repo == null || owner == null) {
    res.status(400).send({message : "Insufficient data for selling."});
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
          res.status(400).send(errMessage);
          return;
        }
        const query = "SELECT Project.project_id, Investment.value_bought, Investment.value FROM Project, Investment WHERE Project.repo = $1 AND Project.owner = $2 AND Project.project_id = Investment.project_id"
        client.query(query, [repo, owner], function (err, result) {
          if (shouldAbort(err)) {
            res.status(400).send(errMessage);
            return;
          } else if (result.rows.length < 1) {
            shouldAbort(true);
            res.status(400).send(errMessage);
            return;
          }
          const timestamp = Date.now();
          const project_id = result.rows[0].project_id;
          const args = [timestamp, value_bought, value, project_id, username];
          const query = "INSERT INTO Investment(investment_id, timestamp, value_bought, value, project_id, username) VALUES ((SELECT COALESCE(MAX(investment_id) + 1, 1) FROM Investment), $2, $3, $4, $5, $6)"
          client.query(query, args, function(err, result) {
            if (shouldAbort(err)) {
              res.status(400).send(errMessage);
              return;
            }
            const query = "UPDATE Investor SET balance = (SELECT balance FROM Investor WHERE username = $1 AND balance - $1 > 0) - $1 WHERE username = $2";
            client.query(query, [value_bought, username], function(err result) {
              if (shouldAbort(err)) {
                res.status(400).send(errMessage);
                return;
              }
              client.query("COMMIT", function(err) {
                if (shouldAbort(err)) {
                  res.status(400).send(errMessage);
                  return;
                }
                done();
                res.send({message : "Success."});
              });
            })
          });
        });
      });
    });
  }
}
