import React from 'react'

import { OwnersListRow } from './owners-list-row'

import '../../styles/ships-list.css'

interface OwnerUI {
  id: number;
  name: string;
  ships: number[]

}



interface OwnerListUI {
  owners: OwnerUI[];
  loading: boolean;
  handleShipRemove: (id: number, title: string) => void;
  shipOwner?: string;
  setShipOwner?: (value: string) => void;
}

export const OwnersList = (props: OwnerListUI) => {
  if (props.loading) return <p>Leaderboard table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Name</th>


            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.owners.length > 0 ? (
            props.owners.map((owner: OwnerUI, idx) => (
              <OwnersListRow
                key={owner.id}
                owner={owner}
                position={idx + 1}
                handleShipRemove={props.handleShipRemove}
                shipOwner={props?.shipOwner}
                setShipOwner={props?.setShipOwner}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no owners to show. Add one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
