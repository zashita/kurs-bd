// Import express
const express = require('express')

// Import books-controller
const shipsRoutes = require('../controllers/ships-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all ship
// In server.js, ships route is specified as '/ships'
// this means that '/all' translates to '/ships/all'
router.get('/all', shipsRoutes.shipsAll)

// Add route for POST request to create new ship
// In server.js, ships route is specified as '/ships'
// this means that '/create' translates to '/ships/create'
router.post('/create', shipsRoutes.shipsCreate)

// Add route for PUT request to delete specific ship
// In server.js, ships route is specified as '/ships'
// this means that '/delete' translates to '/ships/delete'
router.put('/delete', shipsRoutes.shipsDelete)

// Add route for PUT request to reset ships list
// In server.js, ships route is specified as '/ships'
// this means that '/reset' translates to '/ships/reset'
router.put('/reset', shipsRoutes.shipsReset)

// Export router
module.exports = router
