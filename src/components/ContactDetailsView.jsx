import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../db';

function ContactDetailsView() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate('/');
  };

  return (
    <div>
      {contact && (
        <>
          <h2>{contact.firstName} {contact.lastName}</h2>
          <p>Email: {contact.email}</p>
          {/* Add more fields as needed */}
          <Link to={`/edit/${id}`}>Edit Contact</Link>
          <button onClick={handleDelete}>Delete Contact</button>
          <Link to="/">Back to Contacts</Link>
        </>
      )}
    </div>
  );
}

export default ContactDetailsView;
