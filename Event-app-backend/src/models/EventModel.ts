import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  name: string;
  dates: string[];
  votes: { date: string, people: string[] }[];
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  dates: { type: [String], required: true },
  votes: [
    {
      date: { type: String },
      people: { type: [String] }
    }
  ]
});

const EventModel = mongoose.model<IEvent>('Event', EventSchema);
export default EventModel;
