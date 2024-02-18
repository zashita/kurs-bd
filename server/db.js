// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "ships"
knex.schema
  // Make sure no "ships" table exists
  // before trying to create new
  .hasTable('ships')
    .then((exists) => {
      if (!exists) {

        return knex.schema.createTable('ships', (table)  => {
          table.increments('id').primary()
          table.string('owner')
          table.string('title')
          table.string('description')
          table.integer('price')
          table.string('location')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Ships\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "ships" table
knex.select('*').from('ships')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))


knex.schema
  // Make sure no "ships" table exists
  // before trying to create new
  .hasTable('owners')
  .then((exists) => {
    if (!exists) {

      return knex.schema.createTable('owners', (table)  => {
        table.increments('id').primary()
        table.string('name')
        table.specificType('ships', 'INT[]')

      })
        .then(() => {
          // Log success message
          console.log('Table \'Ships\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    // Log success message
    console.log('done')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

// Just for debugging purposes:
// Log all data in "ships" table
knex.select('*').from('owners')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex
