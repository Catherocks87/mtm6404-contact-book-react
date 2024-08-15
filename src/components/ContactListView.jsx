import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '../db';
import { Link } from 'react-router-dom';

function ContactListView() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "contacts"), orderBy("lastName", "asc"));
      const querySnapshot = await getDocs(q);
      setContacts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.lastName}, {contact.firstName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/new">Add New Contact</Link>
    </div>
  );
}

export default ContactListView;
