import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = ({ contacts, onAddContact }) => {
  // Define state variables for contact info and duplicate check
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    const namesInContactList = contacts.map(cntct => cntct.name);
    console.log(namesInContactList);
    if (namesInContactList.includes(name)) {
      alert("Ain't gonna happen.");
      return;
    }
    onAddContact(name, phone, email)
    // Add contact info and clear data if the contact name is not a duplicate
    setName('');
    setPhone('');
    setEmail('');
  };


  /*
  Using hooks, check for contact name in the 
  contacts array variable in props
  */

  return (
    <div>
      <section>
        <h2>Add Contact</h2>
        <ContactForm
          name={name}
          phone={phone}
          email={email}
          setName={setName}
          setPhone={setPhone}
          setEmail={setEmail}
          onSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList contacts={contacts} />
      </section>
    </div>
  );
};
