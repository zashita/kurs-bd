import React from 'react'
import { render } from 'react-dom'

import { Ships } from './components/ships'

import './styles/styles.css'

const rootElement = document.getElementById('root')

// Render Ships component in the DOM
render(<Ships />, rootElement)
