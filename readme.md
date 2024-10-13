# Event Scheduling Application

This is a simplified event scheduling application, built with **Node.js**, **TypeScript**, and **React**. The application allows users to create events, vote on suitable dates, and view results of the event.

## Features

- **Create Event**: Users can create a new event by providing a name and a list of potential dates.
- **View All Events**: List all the created events with the ability to view individual event details.
- **Vote on Dates**: Participants can vote on dates that are suitable for them.
- **View Results**: Get the list of dates most suitable for all participants.
- **Persistent Data**: Data is stored in a MongoDB database and is persisted across application launches.

## Tech Stack

### Frontend:
- **React** (with **TypeScript**)
- **Vite** for build tooling
- **React Router** for client-side routing
- **Bootstrap** for UI components and styling

### Backend:
- **Node.js** (with **TypeScript**)
- **Express.js** as the web framework
- **MongoDB** with **Mongoose** for data persistence
- **Cors** for cross-origin request handling

## Setup Instructions

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (local or remote)
- **npm** (or **yarn**) for package management

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-scheduling-app.git
cd event-scheduling-app
