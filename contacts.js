const path = require('path');
const fs = require('fs').promises;
const { uid } = require('uid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
 try {
    const contacts = await listContacts();
     const result = contacts.find(({id}) => id === contactId);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
  const contacts = await listContacts();
   const changedContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(changedContacts));
    return contacts.filter(({ id }) => id === contactId);
   
    } catch (error) {
    console.log(error.message);
  }
    
}

async function addContact(name, email, phone) {
    try {
    const newContact = {
    id: uid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
    } catch (error) {
    console.log(error.message);
  }
   
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};