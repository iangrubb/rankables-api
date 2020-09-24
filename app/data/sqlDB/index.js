const { SQLDataSource } = require("datasource-sql");

class sqlDB extends SQLDataSource {

  all(tableName) {
    return this.knex
      .select("*")
      .from(tableName)
  }

  select(tableName, condition) {
    return this.knex
      .where(condition)
      .select("*")
      .from(tableName) 
  }

  insertRows(tableName, data) {

    return this.knex
    .returning("*")
    .insert(data)
    .into(tableName)
    
  }

}

module.exports = sqlDB;