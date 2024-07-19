const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
