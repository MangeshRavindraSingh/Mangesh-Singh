import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateEvent from './components/CreateEvent/CreateEvent'
import EventList from './components/EventList/EventList';
import EventListContainer from './components/EventListContainer/EventListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <>
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="/">Create Event</Link></li>
          <li><Link to="/allEvents">All Event</Link></li>
          <li><Link to="/searchEvent">Search Event</Link></li>
        </ul>
      </nav> */}
      <NavBar/>

      <Routes>
        <Route path="/" element={<CreateEvent/>} />
        <Route path="/allEvents" element={<EventList/>} />
        <Route path="/searchEvent" element={<EventListContainer/>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
