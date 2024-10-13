import { useState, useEffect, createContext } from "react";
import Event from "../../Types/Event";
import EventDetailsCard from "../EventDetailsCard/EventDetailsCard";
import AlertType from "../../Types/AlertTypes";
import Alert from "../Alert/Alert";
import './EventListContainer.scss'
import { FetchToggle } from "../../context/FetchToggle";

const EventListContainer = () => {
  const [eventId, setEventId] = useState<string>(""); 
  const [events, setEvents] = useState<Event>(); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [reFetch, setReFetch] = useState<boolean>(false);


  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/event/${eventId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error: any) {
      setError(`${error.message ? Date.now()+":"+error.message:  Date.now()+": Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(eventId !== ""){
      handleSearch()
    }
    
  },[reFetch])

  return (
    <>
      {/* Error message */}
      {error && <Alert message={error} type={AlertType.fail} />}

      <div className="card search-container mx-auto mt-5 ">
        <h2 className="card-title p-2 border-primary border-bottom">
          Search Events
        </h2>
        <div className="row p-2">
          <div className=" col">
            <input
              className="form-control"
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Enter event id"
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
      {events &&<FetchToggle.Provider value={{reFetch, setReFetch}}> <EventDetailsCard event={events} showDatesAndVotes={true} /></FetchToggle.Provider>}
    </>
  );
};

export default EventListContainer;
