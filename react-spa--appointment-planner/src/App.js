import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  //Define state variables for  contacts and appointments 
  const [contacts, setContacts] = useState([])
  const [appointments, setAppointments] = useState([])

  // Implement functions to add data to contacts and appointments
  function handleAddContact(name, phone, email) {
    const newContact = { name, phone, email }
    setContacts(prevContacts => {
      return [...prevContacts, newContact]
    })
  }

  function handleAddAppointment(name, contact, date, time) {
    const newAppointment = { name, contact, date, time }
    setAppointments(prevContacts => {
      return [...prevContacts, newAppointment]
    })
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}>

      <Route index element={<Navigate to={ROUTES.CONTACTS} replace />} />

      <Route path={ROUTES.CONTACTS}
        element={<ContactsPage
          contacts={contacts}
          onAddContact={handleAddContact} />
        } />

      <Route path={ROUTES.APPOINTMENTS}
        element={<AppointmentsPage
          contacts={contacts}
          appointments={appointments}
          onAddAppointment={handleAddAppointment} />

        } />
    </Route>
  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
