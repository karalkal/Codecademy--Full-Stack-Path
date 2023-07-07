import React from "react";
import { Tile } from '../tile/Tile'

export const TileList = (props) => {
  let listReceived
  if (props.contacts) { listReceived = props.contacts }
  else if (props.appointments) { listReceived = props.appointments }

  return (
    <div>
      {listReceived.map((cntc, idx) => {
        let { name, ...rest } = cntc
        return <Tile key={idx} name={name} description={rest} />
      }
      )}

    </div>
  );
};
