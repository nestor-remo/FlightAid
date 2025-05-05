# FlightAid ✈️

FlightAid is a full-stack travel planning web application that allows users to create and manage custom trip itineraries. Users can search for activities in their destination using the Google Places API, receive AI-powered location recommendations via OpenAI, and manage all trip details through a personalized dashboard.

## Features

- GitHub OAuth login (via Passport.js)
- Trip creation and management
- Activity discovery using Google Places API
- AI-generated suggestions for popular spots (OpenAI API)
- Destination images fetched from Wikipedia
- PostgreSQL database hosted on Railway
- Fully responsive UI using React and Tailwind CSS

---

## Tech Stack

- Frontend: React, Tailwind CSS, React Router
- Backend: Node.js, Express.js
- Database: PostgreSQL (Railway)
- APIs: Google Places, OpenAI, Wikipedia
- Auth: GitHub OAuth w/Passport.js

---

### Prerequisites

- Node.js + npm
- PostgreSQL
- GitHub OAuth App (for login)

### Installation

git clone https://github.com/your-username/flightaid.git
cd flightaid

--- 

### Running the Server

from root directory
cd server

create and follow an .env with all the variables from .env.example

npm install
npm run start

---

### Running the Client

from root directory
cd client

create and follow an .env with all the variables from .env.example
npm install
npm run dev

---

### Connecting to PostgreSQL database

I used Railway, but you can connect to any other hosting service that supports PostgreSQL

