import React from 'react'

import { ShipsListRow } from './ships-list-row'

import '../styles/ships-list.css'

interface ShipUI {
  id: number;
  owner: string;
  title: string;
  description: string;
  price: string;
  location: string
}



interface ShipListUI {
  ships: ShipUI[];
  loading: boolean;
  handleShipRemove: (id: number, title: string) => void;
}

export const ShipsList = (props: ShipListUI) => {
  if (props.loading) return <p>Leaderboard table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Title</th>

            <th className="table-head-item">Owner</th>

            <th className="table-head-item">Location</th>

            <th className="table-head-item">Price per day, $</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.ships.length > 0 ? (
            props.ships.map((ship: ShipUI, idx) => (
              <ShipsListRow
                key={ship.id}
                ship={ship}
                position={idx + 1}
                handleShipRemove={props.handleShipRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no ships to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
