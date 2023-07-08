import React from "react";
import { Tile } from '../tile/Tile'

export const TileList = (props) => {

  /*
  TASK:
  The requirements for the TileList component are generalized and allow it to be shared 
  by the ContactsPage and AppointmentsPage components. 
  As long as an array of objects with either the contact data or appointments data is passed 
  then the content will be handled appropriately.
  */
  let listReceived
  if (props.contacts) { listReceived = props.contacts }
  else if (props.appointments) { listReceived = props.appointments }

  // SIMILAR but beautiful 
  /*
  let objKey = Object.getOwnPropertyNames(props)[0]
  let objValues = props[objKey]
  console.log(listReceived === objValues)
  */

  return (
    <div>
      {listReceived.map((item, idx) => {
        let { name, ...rest } = item
        return <Tile key={idx} name={name} description={rest} />
      }
      )}

    </div>
  );
};
