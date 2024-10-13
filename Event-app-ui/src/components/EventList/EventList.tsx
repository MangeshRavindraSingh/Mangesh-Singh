import { useState, useEffect } from "react";
import Event from "../../Types/Event";
import './EventList.scss'

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/api/v1/event/list");
      const data = await response.json();
      setEvents(data.events);
    };
    fetchEvents();
  }, []);

  return (
    <div className="card  rounded border border-primary mx-auto mt-5 p-5">
      <h2>Events</h2>
      <ul className="list-group list-group-flush">
        {events.map((event) => (
          <li key={event._id} className="list-group-item">
            <p>ID:{event._id}</p>
            <p>Name:{event.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
