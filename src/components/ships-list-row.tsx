import React, {useCallback, useState} from 'react'
import {Modal} from "../ui/Modal/Modal";
import '../styles/list-item.css'

interface ShipListRowUI {
  position: number;
  ship: {
    id: number;
    owner: string;
    title: string;
    description: string;
    price: string;
    location: string;
  }
  handleShipRemove: (id: number, title: string) => void;
}

export const ShipsListRow = (props: ShipListRowUI) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, [isOpen]);
  return(
    <tr className="table-row" onClick={toggleModal}>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div>
          <p className={"modal-text"}><b>Ship name: </b>{props.ship.title}</p>
          <p className={"modal-text"}><b>Owner name: </b>{props.ship.owner}</p>
          <p className={"modal-text"}><b>Ship's location: </b>{props.ship.location}</p>
          <p className={"modal-text"}><b>Price per day, $: </b>{props.ship.price}</p>
          <p className={"modal-text"}><b>Ship description: </b>{props.ship.description}</p>
        </div>
      </Modal>
      <td className="table-item">
        {props.ship.title}
      </td>

      <td className="table-item">
        {props.ship.owner}
      </td>

      <td className="table-item">
        {props.ship.location}
      </td>

      <td className="table-item">
        {props.ship.price}
      </td>

      {/*<td className="table-item">*/}
      {/*  {props.ship.price}*/}
      {/*</td>*/}

      <td className="table-item">
        <button
          className="btn btn-remove"
          onClick={() => props.handleShipRemove(props.ship.id, props.ship.title)}>
          Remove ship
        </button>
      </td>
    </tr>
  )
}
