// Import database
const knex = require('./../db')

// Retrieve all ships
exports.ownersAll = async (req, res) => {
  // Get all ships from database
  knex
    .select('*') // select all records
    .from('owners') // from 'ships' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving ships: ${err}` })
    })
}

// Create new ship
exports.ownersCreate = async (req, res) => {
  knex('owners')
    .insert({ // insert new record, a ship
      'name': req.body.name,
      'ships': req.body.title,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Ship \'${req.body.title}\' by ${req.body.owner} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} ship: ${err}` })
    })
}

// Remove specific ship
exports.ownersDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('owners')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Ship ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} ship: ${err}` })
    }).then(knex('ships')
    .where('owner', req.body.name)
    .del().catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.name} owner: ${err}` })
    }))

}

// Remove all ships on the list
exports.ownersReset = async (req, res) => {
  // Remove all ships from database
  knex
    .select('*') // select all records
    .from('owners') // from 'ships' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Ship list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting ship list: ${err}.` })
    })

  knex
    .select('*') // select all records
    .from('ships') // from 'ships' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Ship list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting ship list: ${err}.` })
    })
}
