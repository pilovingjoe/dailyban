import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { sessionMiddleware } from './sessionConfig.js';
import { registerUser, logIn, logOut, getUserProfile } from './controllers/UserController.js';
import {
  getPuzzle,
  getTodaysPuzzle,
  getPuzzles,
  createPuzzle,
} from './controllers/PuzzleController.js';
import { getAttempt, createAttempt } from './controllers/AttemptController.js';

const app: Express = express();

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
// Register your routes below this line
app.post('/users', registerUser);
app.post('/login', logIn);
app.delete('/sessions', logOut);
app.get('/users/:userId', getUserProfile);
app.get('/attmpets/:attemptId', getAttempt);
app.post('/attempts/:userId/:puzzleId', createAttempt);
app.get('/puzzles/:date', getPuzzle);
app.get('/puzzles/today', getTodaysPuzzle);
app.get('/puzzles/', getPuzzles);
app.post('/puzzles/', createPuzzle);
// app.get('/leaderboards/:date/speed/top', getTopSpeeds);
// app.get('/leaderboards/:date/moveCount/top', getTopScore);
// app.get('/leaderboards/:date/speed/near', getAdjacentSpeeds);
// app.get('/leaderboards/:date/moveCount/near', getAdjacnetScore);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
