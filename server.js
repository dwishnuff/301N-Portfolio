'use strict';

const fs = require('fs');
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

// const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME';
const conString = 'postgres://postgres:postgres@localhost:5432/301portfolio';

const client = new pg.Client(conString);

client.connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// app.get('/new', function(request, response) {
//   response.sendFile('new.html', {root: './public'});
// });


app.get('/projects', function(request, response) {
  client.query('SELECT * FROM projects')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.post('/projects', function(request, response) {
  client.query(
    `INSERT INTO
    projects(title, image, "link", techUsed, "publishedOn", summary, overlay)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      request.body.title,
      request.body.image,
      request.body.link,
      request.body.techUsed,
      request.body.publishedOn,
      request.body.summary,
      request.body.overlay,
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.put('/projects/:id', function(request, response) {
  client.query(
    `UPDATE projects
    SET
      title=$1, image=$2, "link"=$3, techUsed=$4, "publishedOn"=$5, summary=$6, overlay=$7
    WHERE project_id=$8;
    `,
    [
      request.body.title,
      request.body.image,
      request.body.link,
      request.body.techUsed,
      request.body.publishedOn,
      request.body.summary,
      request.body.overlay,
      request.params.id
    ]
  )
  .then(function() {
    response.send('update complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('./public/projects/:id', function(request, response) {
  client.query(
    `DELETE FROM projects WHERE project_id=$1;`,
    [request.params.id]
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('/projects', function(request, response) {
  client.query(
    'DELETE FROM projects;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

loadDB();

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadProjects() {
  client.query('SELECT COUNT(*) FROM projects')
  .then(result => {
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('./public/data/projects.json', (err, fd) => {
        JSON.parse(fd.toString()).forEach(ele => {
          client.query(`
            INSERT INTO
            projects(title, image, "link", techUsed, "publishedOn", summary, overlay)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
          `,
            [ele.title, ele.image, ele.link, ele.techUsed, ele.publishedOn, ele.summary, ele.overlay]
          )
        })
      })
    }
  })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS projects (
      article_id SERIAL PRIMARY KEY,
      image VARCHAR (255),
      title VARCHAR(255) NOT NULL,
      "link" VARCHAR (255),
      techUsed VARCHAR(255),
      "publishedOn" DATE,
      summary TEXT NOT NULL,
      overlay VARCHAR(20));`
    )
    .then(function() {
      loadProjects();
    })
    .catch(function(err) {
      console.error(err);
    }
  );
}
