# Travel&Live · Frontend

An end-to-end, Airbnb-style booking platform. Guests search and book stays, and hosts manage listings and incoming orders in real time.

This repo is the **React client**. The API and WebSocket server live in [Travel-Live-Backend](https://github.com/moriyaeldar/Travel-Live-Backend).

## Features

- **Explore & filter stays** by city, price range, property type, stay type and amenities
- **Stay page** with image slider, reviews and ratings, an interactive Google Map, and a date-range booking form with a guest picker
- **Host dashboard** with listings, incoming orders, and revenue and rating charts (Chart.js)
- **Become a host** flow that creates a listing with image uploads to Cloudinary
- **Real-time notifications and chat** between guests and hosts over Socket.io
- **Wishlist**, order history, and user account pages
- Login / signup with a cookie-based session

## Tech stack

| Layer | Tools |
|---|---|
| UI | React, React Router, SCSS, Material-UI |
| State | Redux + redux-thunk (stays, orders, reviews, users, page state) |
| Data | Axios service layer, `socket.io-client` |
| Integrations | Google Maps, Cloudinary, Chart.js, react-date-range |

## Architecture

```
src/
├── pages/      # route-level views (Home, Explore, StayDetails, Host, Wishlist…)
├── cmps/       # reusable components (StayList, OrderForm, HostCharts, Chat…)
├── store/      # Redux actions + reducers per domain
└── services/   # http, socket, stay/order/review/user services
```

In development, the client talks to the backend at `localhost:3030`. In production, the backend serves the built client from `/public`.

## Getting started

```bash
npm install
cp .env.example .env   # add a Google Maps API key
npm start              # http://localhost:3000
```

Run [Travel-Live-Backend](https://github.com/moriyaeldar/Travel-Live-Backend) alongside it on port 3030.

---
Built as the capstone project of the Code Academy full-stack bootcamp.
