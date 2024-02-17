// Import database
const knex = require('./../db')

// Retrieve all ships
exports.shipsAll = async (req, res) => {
  // Get all ships from database
  knex
    .select('*') // select all records
    .from('ships') // from 'ships' table
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
exports.shipsCreate = async (req, res) => {
  knex('ships')
    .insert({ // insert new record, a ship
      'owner': req.body.owner,
      'title': req.body.title,
      'description': req.body.description,
      'price': req.body.price,
      'location': req.body.location
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
exports.shipsDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('ships')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Ship ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} ship: ${err}` })
    })
}

// Remove all ships on the list
exports.shipsReset = async (req, res) => {
  // Remove all ships from database
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
