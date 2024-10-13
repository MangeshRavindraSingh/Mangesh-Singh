import { useEffect, useState } from "react";
import Event from "../../Types/Event";

const Votes = ({ votes }: { votes: Event["votes"] }) => {
  const [max, setMax] = useState(0);
  
  useEffect(() => {
    const totalPeople = votes.reduce(
      (acc, vote) => acc + vote.people.length,
      0
    );
    setMax(totalPeople);
  }, [votes]);

  return (
    <>
      <h5>Votes</h5>
      {votes.map((vote) => {
        return (
          <div>
            <label>{vote.date}</label>
            <div className="progress mb-3" key={vote._id}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={vote.people.length}
                aria-valuemin={0}
                aria-valuemax={max}
                style={{
                  width: `${Math.floor((vote.people.length / max) * 100)}%`,
                }}
              >
              </div>
              <span>{Math.floor((vote.people.length / max) * 100)}%</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Votes;
