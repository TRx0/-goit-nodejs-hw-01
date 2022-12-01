const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.resolve('./db/contacts.json')

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.log(error)
    }

};

  const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const currentContact = contacts.find((contact) => contact.id === contactId);

    if (!currentContact) {
      return null;
    }

    return currentContact;
  } catch (error) {
    console.log(error);
  }
};
  
  const removeContact = async (contactId) => {
    try {
      const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
       fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts)
      );
      console.log(`The contact id:${contactId} was successfully deleted`)
    } catch (err) {
      console.log(err);
    }
  };
  
  const addContact = async (name, email, phone) => {
    try {
      const contacts = await listContacts();
      const newContact = {id: v4(), name, email, phone};
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }