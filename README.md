# NFT Marketplace

Here is a deployed UI only version: https://joshua-brigati-kinetic-take-home.vercel.app/
- **This will not have the database setup so adding to cart won't actually do anything**
- **There are steps below to get everything working in Docker**


https://github.com/user-attachments/assets/024ab804-b421-4949-8253-3e18c7dd8d8f


## Introduction

This NFT Marketplace is a full-stack web application that allows users to browse, select, and manage NFTs in a shopping cart. It's built with modern web technologies, focusing on performance, scalability, and user experience.

## Features

- Browse NFT collections
- View individual NFT details
- Add/remove NFTs to/from a shopping cart
- Persistent shopping cart across sessions
- Responsive design for various screen sizes

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Testing**: Jest

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker and Docker Compose
- Git

## Docker Setup (Optional)

To run the entire application in Docker:

1. Build the Docker image:
docker build -t joshua-brigati-kinetic-take-home .

2. Run the application with Docker Compose:
docker-compose up

3. Access the application at [http://localhost:3000](http://localhost:3000).

## Local Client - Docker DB

1. Clone the repository:
git clone https://github.com/JoshuaBrigati/joshua-brigati-kinetic-take-home.git

2. Install dependencies:
npm install

3. Set up environment variables:
Create a `.env` file in the root directory and add:
DATABASE_URL="postgresql://user:password@localhost:5432/nftcart?schema=public"

4. Start the PostgreSQL database using Docker:
docker run --name postgres-dev -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nftcart -p 5432:5432 -d postgres:13

5. Initialize the database:
npx prisma migrate dev --name init

6. Run the development server:
npm run dev

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/components/`: React components
- `src/pages/`: Next.js pages and API routes
- `src/lib/`: Utility functions and database setup
- `prisma/`: Prisma schema and migrations
- `__tests__`: Jest unit tests

## Technicals

1. **Next.js**: Chosen for its server-side rendering capabilities, API routes, and excellent developer experience.

2. **Prisma vs TypeORM**: Initially, we attempted to use TypeORM, but encountered integration issues with Next.js, particularly in API routes. We switched to Prisma for its better compatibility with Next.js and more straightforward setup in serverless environments.

3. **React Query**: Used for efficient server state management and caching, improving performance and user experience.

4. **VirtuosoGrid**: I used VirtuosoGrid to render my large grids which used virtualized rendering. It also makes it easy to make infinite scroll. I used `useInfiniteQuery` from tanstack/react-query to set up infinite scroll on those pages.

5. **Tailwind CSS**: Adopted for rapid UI development and easy customization.

6. **Docker**: Implemented for consistent development and deployment environments.

7. **Tests**: Used Jest to create some unit tests for components and pages.
