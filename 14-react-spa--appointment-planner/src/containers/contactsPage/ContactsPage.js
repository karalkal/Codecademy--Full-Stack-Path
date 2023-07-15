import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = ({ contacts, onAddContact }) => {
  // Define state variables for contact info and duplicate check
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isDuplicate, setIsDuplicate] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    /*Version 1 before isDuplicate and useEffect were implemented
    Check names after submission
    const namesInContactList = contacts.map(cntct => cntct.name);
        if (namesInContactList.includes(name)) {
          alert("Ain't gonna happen.");
          return;
        }
    */
    if (isDuplicate) {
      alert("Ain't gonna happen.");
      return
    }

    onAddContact(name, phone, email)
    // Add contact info and clear data if the contact name is not a duplicate
    setName('');
    setPhone('');
    setEmail('');
  };


  // Using hooks, check for contact name in the contacts array variable in props
  // Will run each time state of name changes
  useEffect(() => {
    const namesInContactList = contacts.map(cntct => cntct.name);
    namesInContactList.includes(name) ? setIsDuplicate(true) : setIsDuplicate(false);
    return;
  },
    [name, contacts])

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
          isDuplicate={isDuplicate} // to inform user contact exists while typing, a bit annoying...          
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
