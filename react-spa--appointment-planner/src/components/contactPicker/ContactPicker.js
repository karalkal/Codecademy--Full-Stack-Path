import React from "react";

export const ContactPicker = (props) => {
  const contactNamesOptions = (props.contacts)
    .map(cnt =>
      <option key={cnt.name} value={cnt.name}>{cnt.name}</option>
    )

  return (
    <>
      <select
        // to make life more interesting trigger function with value
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        name={props.name} >

        <option value="">No Contact Selected</option>
        {contactNamesOptions}

      </select >
    </>
  );
};
