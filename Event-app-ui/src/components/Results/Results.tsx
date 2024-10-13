import { useState, useEffect } from "react";
import Event from "../../Types/Event";

const Results = ({
  eventId,
  setShowResult,
  showResult,
}: {
  eventId: string;
  setShowResult: any;
  showResult: boolean;
}) => {
  const [results, setResult] = useState<{
    name: string;
    suitableDates: Event["votes"];
    id: string;
  }>({
    id: "",
    name: "",
    suitableDates: [],
  });

  const handleResult = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/event/${eventId}/results`
    );
    const data = await response.json();

    setResult(data);
  };

  useEffect(() => {
    handleResult();
  }, []);

  return (
    <>
      <div
        className="modal"
        tabIndex={1}
        style={{ display: showResult ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{results.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowResult(false)}
              ></button>
            </div>
            <div className="modal-body">
              <h5>Suitable Dates</h5>
              {results.suitableDates.map((item) => {
                return (
                  <>
                    <p
                      className="badge bg-primary text-wrap fst-italic"
                      key={item.date}
                    >
                      {item.date}
                    </p>
                    <ul>
                      {item.people.map((people) => (
                        <li key={people}>{people}</li>
                      ))}
                    </ul>
                  </>
                );
              })}
              <p></p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowResult(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
