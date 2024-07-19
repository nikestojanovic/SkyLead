const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Status = require('./status')(sequelize, DataTypes);
db.Task = require('./task')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);

db.Status.hasMany(db.Task, { foreignKey: 'statusId' });
db.Task.belongsTo(db.Status, { foreignKey: 'statusId' });

db.User.hasMany(db.Task, { foreignKey: 'assignedUserId' });
db.Task.belongsTo(db.User, { foreignKey: 'assignedUserId' });

module.exports = db;
