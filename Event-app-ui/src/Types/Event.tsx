type Event = {
  _id: string;
  name: string;
  dates: string[];
  votes: Vote[];
};

type Vote = {
  date: string;
  people: string[];
  _id: string;
};

export default Event;
