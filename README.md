# FEBE | Frontend for backend

## Website and Demo

![Demo Gif](./dber.gif)

## Features

1. Design data structures Visually
2. Create relationships with drag and drop
3. Export SQL scripts from the graph

## Tech stack

SVG

Next.js(React)

DBML

ArcoDesign

Dexie(indexDB)

## Getting Started

First, Clone the repository or download the source code.

Install the dependences.

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run in the production mode:

```bash
npm run build && npm run start
```

Export static pages:

```bash
npm run gen
```

## Build & Startup with docker

Build docker image with command:

```
docker build -t dber .
```

Then run it with docker or docker compose:

```
docker run -p 3000:3000 dber
```

OR

```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
