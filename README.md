# Uber Clone

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Description

This project is an Uber clone application built using Next.js and TypeScript. The application mimics the core functionality of the Uber app, including customer and driver authentication, trip management, and payment processing.

## Features

- **User Authentication**: Separate authentication flows for customers and drivers.
- **Trip Management**: Requesting, accepting, and completing trips.
- **Payment Processing**: Handling payments for trips.
- **Real-Time Updates**: Live updates for trip status using WebSockets.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **TypeScript**: A statically typed superset of JavaScript.
- **MongoDB**: A NoSQL database for storing user and trip data.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Folder Structure

The project follows a structured folder organization to keep the codebase maintainable and scalable.


### Folder and File Descriptions

- **app**: Contains the core application logic.
  - **api/auth**: Contains API routes for authentication and trip management.
    - `customer.ts`: Handles customer-specific authentication and actions.
    - `driver.ts`: Handles driver-specific authentication and actions.
    - `trip.ts`: Manages trip-related actions like request, accept, and complete.
    - `payment.ts`: Manages payment processing and related actions.
  - `layout.tsx`: Defines the layout for the application.
  - `page.tsx`: Entry point for the application.

- **components**: Contains reusable React components.
  - `Header.tsx`: Header component for the application.
  - `Footer.tsx`: Footer component for the application.
  - `Map.tsx`: Component for displaying maps.
  - `RideRequestForm.tsx`: Form component for requesting rides.

- **lib**: Contains utility libraries and helper functions.
  - `db.ts`: Database connection and configuration.
  - **models**: Contains database models.
    - `User.ts`: User model schema.
    - `Driver.ts`: Driver model schema.
    - `Trip.ts`: Trip model schema.
    - `Payment.ts`: Payment model schema.

- **public**: Contains public assets like images and styles.
  - `images`: Directory for storing image assets.
  - `styles`: Directory for storing CSS styles.

- **styles**: Contains global CSS styles.
  - `globals.css`: Global CSS file for the application.

- **.env**: Environment variables configuration file.
- **next.config.js**: Next.js configuration file.
- **package.json**: Contains project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
