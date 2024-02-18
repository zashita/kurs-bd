import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import { ShipsList } from './ships-list'

import '../styles/ships.css'
import {Modal} from "../ui/Modal/Modal";
import {Owners} from "./owners/owners";

interface Ships{
  state: boolean;
  setState: () => void;
}

export const Ships = (props: Ships) => {
  const [owner, setOwner] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [ships, setShips] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('')
  useEffect(() => {
    fetchShips()
  }, [props.state])

   const fetchShips = async () => {
    axios
      .get('http://localhost:4001/ships/all')
      .then(response => {
        setShips(response.data)

        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the ship list: ${error}`))
  }

  const handleInputsReset = () => {
    setOwner('')
    setTitle('')
    setDescription('')
    setPrice('')
    setLocation('')
  }

  const handleShipCreate = () => {
    axios
      .post('http://localhost:4001/ships/create', {
        owner: owner,
        title: title,
        description: description,
        price: price,
        location: location,
      })
      .then(res => {
        console.log(res.data)

        fetchShips()
      })
      .catch(error => console.error(`There was an error creating the ${title} ship: ${error}`))
  }

  const handleShipSubmit = () => {
    if (owner.length > 0 && title.length > 0 && description.length > 0 && price.length > 0 && location.length > 0) {
      handleShipCreate()

      console.info(`Ship ${title} by ${owner} added.`)

      handleInputsReset()
    }
  }

  const handleShipRemove = (id: number, title: string) => {
    // Send PUT request to 'ships/delete' endpoint
    axios
      .put('http://localhost:4001/ships/delete', { id: id })
      .then(() => {
        console.log(`Ship ${title} removed.`)
        fetchShips()
      })
      .catch(error => console.error(`There was an error removing the ${title} ship: ${error}`))
  }


  const handleListReset = () => {
    axios.put('http://localhost:4001/ships/reset')
    .then(() => {

      fetchShips()
    })
    .catch(error => console.error(`There was an error resetting the ship list: ${error}`))
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, [isOpen]);

  const [isOpenLoc, setIsOpenLoc] = useState(false);
  const toggleModalLoc = useCallback(() => {
    setIsOpenLoc((prevState) => !prevState);
  }, [isOpenLoc]);


  return (
    <div className="ship-list-wrapper">
      <div className="ship-list-form">
        <div className="form-wrapper" onSubmit={handleShipSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">Enter title:</label>
              <input className="form-input" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="owner">Enter owner:</label>
              <input
                className="form-input"
                type="text"
                id="owner"
                name="owner"
                value={owner}
                onClick={toggleModal}
                onChange={toggleModal}/>
              <Modal
                isOpen={isOpen}
                onClose={toggleModal}
              >
                <Owners
                  setShipOwner={setOwner}
                  shipOwner={owner}
                  state={props.state}
                  setState={props.setState}/>
              </Modal>
            </fieldset>
          </div>

          <div className="form-row">

            <fieldset>
              <label className="form-label" htmlFor="location">Enter location:</label>
              <input
                className="form-input"
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={toggleModalLoc}
                onClick={toggleModalLoc}
              />
              <Modal
                isOpen={isOpenLoc}
                onClose={toggleModalLoc}
              >
                  <table className={"table"}>
                    <thead>
                    <tr>
                      <th className="table-head-item">Region</th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                      <tr className="table-row" onClick={() => setLocation('Минская область')}>
                          <td className="table-item">
                            Минская область
                          </td>
                      </tr>
                      <tr className="table-row" onClick={() => setLocation('Брестская область')}>
                        <td className="table-item">
                          Брестская область
                        </td>
                      </tr>

                      <tr className="table-row" onClick={() => setLocation('Гродненская область')}>
                        <td className="table-item">
                          Гродненская область
                        </td>
                      </tr>

                      <tr className="table-row" onClick={() => setLocation('Витебская область')}>
                        <td className="table-item">
                          Витебская область
                        </td>
                      </tr>

                      <tr className="table-row" onClick={() => setLocation('Могилевская область')}>
                        <td className="table-item">
                          Могилевская область
                        </td>

                      </tr>

                      <tr className="table-row" onClick={() => setLocation('Гомельская область')}>
                        <td className="table-item">
                          Гомельская область
                        </td>
                      </tr>
                    </tbody>
                  </table>




              </Modal>
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="price">Enter price, $/d:</label>
              <input className="form-input" type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.currentTarget.value)} />
            </fieldset>
          </div>
          <div className={"form-row"}>
            <fieldset>
              <label className="form-label" htmlFor="description">Enter description:</label>
              <input className="form-input" type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleShipSubmit} className="btn btn-add">Add ship</button>
      </div>

      <ShipsList ships={ships} loading={loading} handleShipRemove={handleShipRemove} />

      {ships.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset ships list.</button>
      )}
    </div>
  )
}
