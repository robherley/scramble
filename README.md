## Inspiration

Scramble is inspired by various fast-paced mini-games like Wario Ware and Mario Party series.

## What it does

The server pairs clients into ![Socket.io Rooms](https://socket.io/docs/rooms-and-namespaces/#) and starts a random mini-game between the two clients. Depending on the mini-game, it may end by a set timer or whichever client finishes their game first.

## How we built it

We built our back-end in Express.js, which has a single route to serve our static files. In addition, the server also watches for various socket emitters from each of the clients, and acts accordingly. As for the front-end, we used React.js to dynamically update the DOM when receiving information from the sockets and user input.

## Challenges we ran into

Since sockets work in an asynchronous matter, there were various server-client misalignment when working with socket data.

## Accomplishments that we are proud of

We have a fully working demo; it is hosted on a cloud instance and has modern intuitive design.

## What I learned

We've gained experience about working with sockets (with React.js), asynchronous data flow, and efficient collaborative programming under stress.

## What's next for Scramble

More mini-games, observe opponent's progress and improve performance of the site.

## How to install
* `npm i` in the top level directory to install all dependencies
* Go into `client/`, `npm i` to install dependencies and build then react files `npm run build` 
* Finally, go back up into the top-level server directory and `npm start`

