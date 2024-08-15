// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2h-2rCEKgMAc4ZLhvmnNaH0pZhEXxA9E",
  authDomain: "contact-book-b22b6.firebaseapp.com",
  projectId: "contact-book-b22b6",
  storageBucket: "contact-book-b22b6.appspot.com",
  messagingSenderId: "938609654782",
  appId: "1:938609654782:web:dfec657f5d95fbb5ebdeaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the 'contacts' collection
const contactsCollectionRef = collection(db, "contacts");

// Function to add sample contacts if the collection is empty
export const addSampleContacts = async () => {
  const querySnapshot = await getDocs(contactsCollectionRef);

  // Check if the collection is empty
  if (querySnapshot.empty) {
    const sampleContacts = [
      { firstName: "John", lastName: "Doe", email: "example@email.com" },
      { firstName: "Peter", lastName: "Rogers", email: "peter123@gmail.com" },
      { firstName: "Karla", lastName: "Plant", email: "karlap@gmail.com" },
      { firstName: "Nathan", lastName: "Moon", email: "moon@aol.com" },
      { firstName: "Jane", lastName: "Perez", email: "jane456@hotmail.com" },
   
    ];

    // Add each sample contact to Firestore
    for (let contact of sampleContacts) {
      await addDoc(contactsCollectionRef, contact);
    }
  }
};

// Call the function to populate the database with sample contacts
addSampleContacts();

// Export the Firestore database instance
export { db };
