import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { OwnersList } from './owners-list'

import '../../styles/ships.css'

interface Owner{
  shipOwner?: string;
  setShipOwner?: (value: string) => void;
  state: boolean;
  setState: () => void;
}

export const Owners = (props: Owner) => {
  const [name, setName] = useState('')
  const [owners, setOwners] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchOwners()
  }, [props.state])


  const fetchOwners = async () => {
    axios
      .get('http://localhost:4001/owners/all')
      .then(response => {
        setOwners(response.data)

        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the ship list: ${error}`))
  }

  const handleInputsReset = () => {
    setName('')

  }

  const handleOwnerCreate = () => {
    axios
      .post('http://localhost:4001/owners/create', {
        ships: null,
        name: name,
      })
      .then(res => {
        console.log(res.data)

        fetchOwners()
      }).then(props.setState)
      .catch(error => console.error(`There was an error creating the ${name} owner: ${error}`))
  }

  const handleOwnerSubmit = () => {
    if (name.length > 0) {
      handleOwnerCreate()

      console.info(`Ship ${name} `)

      handleInputsReset()
      props.setState;
    }
  }

  const handleOwnerRemove = (id: number, title: string) => {
    // Send PUT request to 'ships/delete' endpoint
    axios
      .put('http://localhost:4001/owners/delete', { id: id , name: title})
      .then(() => {
        console.log(`Ship ${title} removed.`)
        fetchOwners().then(props.setState)
      })
      .catch(error => console.error(`There was an error removing the ${title} ship: ${error}`))
  }


  const handleListReset = () => {
    axios.put('http://localhost:4001/owners/reset')
    .then(() => {

      fetchOwners()
    })
    .catch(error => console.error(`There was an error resetting the ship list: ${error}`))
  }

  return (
    <div className="ship-list-wrapper">
      <div className="ship-list-form">
        <div className="form-wrapper" onSubmit={handleOwnerSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">Enter name:</label>
              <input className="form-input" type="text" id="title" name="title" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            </fieldset>
        <button onClick={handleOwnerSubmit} className="btn btn-add">Add owner</button>
      </div>

      <OwnersList
        owners={owners}
        loading={loading}
        handleShipRemove={handleOwnerRemove}
        shipOwner={props.shipOwner}
        setShipOwner={props.setShipOwner}
      />

      {/*{owners.length > 0 && (*/}
      {/*  <button className="btn btn-reset" onClick={handleListReset}>Reset ships list.</button>*/}
      {/*)}*/}
    </div>
      </div>
    </div>
    )}

