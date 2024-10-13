import { useState } from "react";
import "./CreateEvent.scss";
import Alert from "../Alert/Alert";
import AlertType from "../../Types/AlertTypes";


const CreateEvent = () => {
  const [name, setName] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [results, setResult] = useState<{message:string, type:AlertType}>({ message: "", type: AlertType.fail });

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/api/v1/event", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, dates }),
    });
    const data = await response.json();
    if (response.ok) {
      setResult({ message: `${Date.now()}:Event created successfully, event id: ${data.id}`, type: AlertType.success });
    } else {
      setResult({ message: `${Date.now()}:Event creation failed`, type: AlertType.success });
    }

    // console.log("Event created with ID:", response.data.id);
  };

  const datesInput = (optionNo:number) =>{
    return (
      <div className="mb-3" key={optionNo}>
      <label htmlFor="exampleFormControlInput1" className="form-label">
        Enter Date {optionNo}
      </label>
      <input
        className="form-control"
        type="date"
        onChange={(e) => {
          const newDate = [...dates]
          newDate[optionNo-1] = e.target.value
          setDates(newDate)
        }}
      />
    </div>
    )
  }
  return (
    <>
    {results.message !== "" && <Alert message={results.message} type={results.type}/>}
      <div className="card rounded border border-primary mx-auto mt-5 p-5">
        <h2 className="card-title p-2 border-primary border-bottom">Create Event</h2>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Event Name
            </label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
            />
          </div>


         {
          dates.map((date, index)=>datesInput(index+1))
         }

          <button className="btn btn-primary mb-3" onClick={()=>setDates([...dates,"yyyy-mm-dd"])}>
            Add more dates
          </button>
          <br/>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
