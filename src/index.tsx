import React from 'react'
import { render } from 'react-dom'


import './styles/styles.css'
import App from "./App";

const rootElement = document.getElementById('root')

// Render Ships component in the DOM
render(<App/>, rootElement)
