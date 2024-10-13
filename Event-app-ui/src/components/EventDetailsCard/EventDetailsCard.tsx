import { useState } from "react";
import Event from "../../Types/Event";
import AddVotes from "../AddVotes/AddVotes";
import Votes from "../Votes/Votes";
import Results from "../Results/Results";

const EventDetailsCard = ({
  event,
  showDatesAndVotes,
}: {
  event: Event;
  showDatesAndVotes: boolean;
}) => {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="me-5 ms-5 rounded border border-primary mx-auto mt-5 p-5 bg-light">

      {showResult &&<Results eventId={event._id} setShowResult={setShowResult} showResult={showResult}/>}

      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">{event.name}</h5>
          </div>
          <div>
            <button onClick={()=>setShowResult(true)} className="btn btn-primary">Show Results</button>
          </div>
        </div>

        <h6 className="card-subtitle mb-2 text-muted">{event._id}</h6>
        <h6 className="card-title">Dates</h6>
        <ul className="list-group list-group-flush bg-light border rounded">
          {showDatesAndVotes && (
            <>
              {event.dates.map((date) => (
                <li className="list-group-item">{date}</li>
              ))}
            </>
          )}
        </ul>

        <br />

        {event.votes.length >0 && <Votes votes={event.votes} />}

        <AddVotes eventId={event._id} dates={event.dates} />
      </div>
    </div>
  );
};
export default EventDetailsCard;
