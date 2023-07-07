import React from "react";
import { Tile } from '../tile/Tile'

export const TileList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((cntc, idx) => {
        let { name, ...rest } = cntc
        console.log(name)
        return <Tile key={idx} name={name} description={rest} />
      }
      )}

    </div>
  );
};
