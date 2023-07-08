import React from "react";
import { ContactPicker } from "../contactPicker/ContactPicker"

const getTodayString = () => {
  const [month, day, year] = new Date()
    .toLocaleDateString("en-US")
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export function AppointmentForm({ contacts,
  title, setTitle, contact, setContact, date, setDate, time, setTime,
  onSubmit: submitForm }) {

    let name = "Bay Huy"

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name</label>
      <input id="name"
        // onChange={(e) => setName(e.target.value)}
        name="name"
        value={name} />

      <label htmlFor="date">Date</label>
      <input id="date"
        type="date"
        min={getTodayString()}
        onChange={(e) => setDate(e.target.value)}
        name="date"
        value={date} />

      <label htmlFor="time">Time</label>
      <input id="time"
        type="time"
        onChange={(e) => setTime(e.target.value)}
        name="time"
        value={time} />

      <input type="submit" />

      <ContactPicker />

    </form>


  );
};






