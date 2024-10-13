import express, {  NextFunction, Request, Response } from "express";
import EventModel from '../models/EventModel';
import validationHelper from "../services/validationHelper";
import constants from "../services/constants";
import mongoose from 'mongoose';

const createEvent =  async (req: Request, res: Response, next: NextFunction) => {
    const { name, dates } = req.body;

    // input validation
    if(!validationHelper.validateDates(dates) || !validationHelper.validateName(name)){
        return next({
            statusCode:constants.STATUS_CODES.BAD_REQUEST.code, 
            message: constants.STATUS_CODES.BAD_REQUEST.message
        })
    }

    const newEvent = await EventModel.create({ name, dates, votes: [] });
    res.json({ id: newEvent.id });
  }

  const listAllEvents =  async (req: Request, res: Response) => {
    const events = await EventModel.find({}, 'id name');
    res.json({ events });
  }

  const getEventDetails =  async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params

    // input validation
    if(!validationHelper.validateMongoId(id)){
        return next({
            statusCode:constants.STATUS_CODES.BAD_REQUEST.code, 
            message: constants.STATUS_CODES.BAD_REQUEST.message
        })  
    }

  const event = await EventModel.findById(id);
  if (event) res.json(event);
  else res.status(constants.STATUS_CODES.NOT_FOUND.code).send(constants.STATUS_CODES.NOT_FOUND.message);
}

const addVote =  async (req: Request, res: Response, next: NextFunction) => {

  const { name, votes } = req.body;
  const {id} = req.params;

      // input validation
      if(!validationHelper.validateDates(votes) || !validationHelper.validateName(name) || !validationHelper.validateMongoId(id)){
        return next({
            statusCode:constants.STATUS_CODES.BAD_REQUEST.code, 
            message: constants.STATUS_CODES.BAD_REQUEST.message
        })
    }

  const event = await EventModel.findById(id);

  if (event) {
    votes.forEach((voteDate: string) => {
      let vote = event.votes.find(v => v.date === voteDate);

      if (!vote) {
        event.votes.push({ date: voteDate, people: [name] });
      } else{
        vote.people.push(name);
      }

    });
    await event.save();
    res.json(event);
  } else {
    res.status(constants.STATUS_CODES.NOT_FOUND.code).send(constants.STATUS_CODES.NOT_FOUND.message)
  }
}

const showResult = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
      // input validation
      if(!validationHelper.validateMongoId(id)){
        return next({
            statusCode:constants.STATUS_CODES.BAD_REQUEST.code, 
            message: constants.STATUS_CODES.BAD_REQUEST.message
        })  
    }

    const ObjectId = mongoose.Types.ObjectId;

  let event:any = await EventModel.aggregate([
    {
      // Match the event with the given ID
      $match: { _id: new ObjectId(id) }
    },
    {
      // Unwind the votes array to create a separate document for each vote
      $unwind: "$votes"
    },
    {
      // Add a field for the number of people in each vote
      $addFields: {
        numberOfPeople: { $size: "$votes.people" }
      }
    },
    {
      // Group by event to find the maximum number of people across all votes
      $group: {
        _id: "$_id",
        name: { $first: "$name" }, // Keep the event name
        maxPeople: { $max: "$numberOfPeople" },
        votes: {
          $push: {
            date: "$votes.date",
            people: "$votes.people",
            numberOfPeople: "$numberOfPeople"
          }
        }
      }
    },
    {
      // Use $addFields to bring maxPeople value down to individual documents
      $addFields: {
        votes: {
          $filter: {
            input: "$votes",
            as: "vote",
            cond: { $eq: ["$$vote.numberOfPeople", "$maxPeople"] }
          }
        }
      }
    },
    {
      // Optionally project the desired fields for the final output
      $project: {
        _id: 1,
        name: 1,    
        maxPeople: 1,
        votes: {
          date: 1,
          people: 1
        }
      }
    }
  ]);
  

  if (event) {
    event = event[0];
    res.json({ id: event._id, name: event.name, suitableDates: event.votes });
    // res.json(event)
  } else {
    res.status(constants.STATUS_CODES.NOT_FOUND.code).send(constants.STATUS_CODES.NOT_FOUND.message);
  }

}

  export default {createEvent, listAllEvents, getEventDetails, addVote, showResult}