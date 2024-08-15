import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactListView from './components/ContactListView';
import ContactDetailsView from './components/ContactDetailsView';
import NewContactView from './components/NewContactView';
import EditContactView from './components/EditContactView';
import './App.css';



function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Contact Book</h1>
        <Routes>
          <Route path="/" element={<ContactListView />} />
          <Route path="/contact/:id" element={<ContactDetailsView />} />
          <Route path="/new" element={<NewContactView />} />
          <Route path="/edit/:id" element={<EditContactView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

