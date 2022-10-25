import css from './App.module.css'
import {useState, useEffect} from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid'


export default function App() {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  },[contacts])


  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter))
  }

  const addContact = ({ name, number }) => {
    const newContact = {
          id: nanoid(),
          name,
          number,
        };
    contacts.find(contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
        ? alert( `${newContact.name} is already in contacts` )
        : setContacts([newContact, ...contacts],
        )
  }

  const deleteContact = contactId => {
    setContacts(
      prevContacts => 
        prevContacts.filter(contact => contact.id !== contactId),
      
    )
  }
  
  return (
      <div className={css.phonebook}>
        <h1 className="counter__title">Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        
        <h2 className="counter__title">Contacts</h2>
        <Filter value={filter} onChange={changeFilter } />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
}



// class App extends Component {
//   state = {
//     contacts: [ ],
//     filter: '',
//   };


  // componentDidMount() {
  //   const localContacts = localStorage.getItem("contacts");
  //   const parsedContacts = JSON.parse(localContacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;
  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  // changeFilter = e => {
  //       this.setState({ filter: e.currentTarget.value });
  // }

  // getVisibleContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter))
  // }

  // addContact = ({ name, number }) => {
  //   const { contacts } = this.state;
  //   const newContact = {
  //         id: nanoid(),
  //         name,
  //         number,
  //       };
  //   contacts.find(contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
  //       ? alert( `${newContact.name} is already in contacts` )
  //       : this.setState(({contacts}) => ({
  //         contacts: [newContact, ...contacts],
  //       }))
  // }

  // deleteContact = contactId => {
  //   this.setState(
  //     prevState => ({
  //       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //     })
  //   )
  // }

//   render() {
//     const filteredContacts = this.getVisibleContacts()
//     return (
//       <div className={css.phonebook}>
//         <h1 className="counter__title">Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
        
//         <h2 className="counter__title">Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter } />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
  

// export default App;
