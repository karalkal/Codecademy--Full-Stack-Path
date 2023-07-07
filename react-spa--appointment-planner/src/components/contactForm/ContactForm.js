import React from "react";

export function ContactForm({ name, setName,
  phone, setPhone, email, setEmail, onSubmit: submitForm }) {

  // accept only numbers
  function handlePhoneChange(e) {
    if (Number.isInteger(Number(e.target.value))) {
      setPhone(e.target.value)
    }
  }

  
  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name</label>
      <input id="name"
        onChange={(e) => setName(e.target.value)}
        name="name"
        value={name} />

      <label htmlFor="phone">Phone</label>
      <input id="phone"
        onChange={(e) => handlePhoneChange(e)}
        name="phone"
        value={phone} />

      <label htmlFor="email">Email</label>
      <input id="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email} />
      <input type="submit" />
    </form>
  );
};

