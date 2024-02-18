import React, {useCallback, useState} from 'react'
import '../../styles/list-item.css'

interface OwnersListRowUI {
  position: number;
  owner: {
    id: number;
    ships: number[];
    name: string;
  }
  handleShipRemove: (id: number, title: string) => void;
  shipOwner?: string;
  setShipOwner?: (value: string) => void;
}

export const OwnersListRow = (props: OwnersListRowUI) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, [isOpen]);
  return(
    <tr className="table-row" onClick={toggleModal}>
      <td className="table-item">
        {props.position}
      </td>

      <td
        className="table-item"
        onClick={props.setShipOwner? () => props.setShipOwner(props.owner.name) : () => null}
      >
        {props.owner.name}
      </td>


      <td className="table-item">
        {
          props.setShipOwner
          ?null
            :
            <button
              className="btn btn-remove"
              onClick={() => props.handleShipRemove(props.owner.id, props.owner.name)}>
              Remove owner
            </button>
        }

      </td>
    </tr>
  )
}


