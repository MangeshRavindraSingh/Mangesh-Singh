import { useState, useContext } from "react";
import Alert from "../Alert/Alert";
import AlertType from "../../Types/AlertTypes";
import { FetchToggle } from "../../context/FetchToggle";

const AddVotes = ({ eventId, dates }: { eventId: string; dates: string[] }) => {
  const [name, setName] = useState("");
  const [votes, setVotes] = useState<string[]>([]);
  const [results, setResult] = useState<{ message: string; type: AlertType }>({
    message: "",
    type: AlertType.fail,
  });
  const { reFetch, setReFetch } = useContext(FetchToggle);

  const handleVote = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/event/${eventId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, votes }),
    });

    const data = await response.json();
    if (response.ok) {
      setResult({
        message: `${data._id} : Vote added successfully`,
        type: AlertType.success,
      });
      setReFetch(!reFetch)
    } else {
      setResult({ message:  Date.now()+":"+"Failed to add vote", type: AlertType.success });
    }

    console.log("Vote submitted");
  };

  const handleVotesChange = (date:string, remove:boolean)=>{
    let newVotes=[]
    if(remove){
      newVotes = votes.filter(vote=>vote !== date)
    } else{
      newVotes = [...votes, date]
    }
    setVotes(newVotes)
  }

  return (
    <>
      {results.message !== "" && (
        <Alert message={`${results.message}`} type={results.type} />
      )}
      <div>
        <h5>Vote for Event</h5>
        <div className="mb-3">
        <input
        className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        </div>
       
        {dates&& dates.map((date) => {
          return (
            <div className="form-check mb-3">

              <input
                className="form-check-input"
                type="checkbox"
                value="test"
                checked={votes.includes(date)}
                onChange={()=>handleVotesChange(date,votes.includes(date))}
                id="defaultCheck1"
              />
              <label className="form-check-label">
                {date}
              </label>
            </div>
          );
        })}

        <button className="btn btn-primary" onClick={handleVote}>Vote</button>
      </div>
    </>
  );
};

export default AddVotes;
