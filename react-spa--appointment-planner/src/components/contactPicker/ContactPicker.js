import React from "react";

export const ContactPicker = (props) => {
  const contactNamesOptions = (props.contacts)
    .map(cnt =>
      <option value={cnt.name}>{cnt.name}</option>
    )

  return (
    <>
      <select
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        name={props.name} >

        <option value="">No Contact Selected</option>
        {contactNamesOptions}

      </select >
    </>
  );
};
