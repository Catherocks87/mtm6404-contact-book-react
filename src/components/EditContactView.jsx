import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../db';

function EditContactView() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "contacts", id), contact);
    navigate(`/contact/${id}`);
  };

  return (
    contact && (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} required />
        <input type="text" placeholder="Last Name" value={contact.lastName} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} required />
        <input type="email" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
        <button type="submit">Update Contact</button>
      </form>
    )
  );
}

export default EditContactView;
