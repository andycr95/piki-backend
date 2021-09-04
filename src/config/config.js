module.exports = {
  "development": {
    "username": `${process.env.USERNAME_DEV}`,
    "password": `${process.env.PASSWORD_DEV}`,
    "database": `${process.env.DATABASE_DEV}`,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "logging": false
  },
  "test": {
    "username": "piki7",
    "password": "piki72020",
    "database": "piki7_test",
    "host": "192.241.155.75",
    "dialect": "mysql"
  },
  "production": {
    "username": "piki7",
    "password": "piki72020",
    "database": "piki7_production",
    "host": "192.241.155.75",
    "dialect": "mysql"
  }
}
