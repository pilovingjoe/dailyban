import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { sessionMiddleware } from './sessionConfig.js';
import {
  registerUser,
  getMe,
  logIn,
  logOut,
  getUserProfile,
  getUserAttempts,
} from './controllers/UserController.js';
import {
  getPuzzle,
  getTodaysPuzzle,
  getPuzzles,
  createPuzzle,
  getPuzzleAttempts,
  deletePuzzle,
} from './controllers/PuzzleController.js';
import { createAttempt, getAttempt } from './controllers/AttemptController.js';

import {
  updateLeaderboard,
  getTopSpeeds,
  getTopMoveCounts,
  getNearbySpeeds,
  getNearbyMoves,
} from './controllers/LeaderboardController.js';

const app: Express = express();

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.static('frontend/build'));

// -- Routes --------------------------------------------------
// Register your routes below this line

//Adding and deleting puzzles should be done through the DB manually, so I have disabled those endpoints

app.post('/api/users', registerUser);
app.post('/api/login', logIn);
app.delete('/api/sessions', logOut);
app.get('/api/me', getMe);
app.get('/api/users/:userId', getUserProfile);
// app.post('/api/puzzles/', createPuzzle);
app.get('/api/puzzles/today', getTodaysPuzzle);
app.get('/api/puzzles/:date', getPuzzle);
// app.delete('/api/puzzles/:date', deletePuzzle);
app.get('/api/puzzles/', getPuzzles);
app.post('/api/attempts/:userId/:puzzleId', createAttempt);
app.get('/api/attempts/:attemptId', getAttempt);
app.get('/api/attempts/user/:userId', getUserAttempts);
app.get('/api/attempts/puzzle/:date', getPuzzleAttempts);

app.patch('/api/leaderboards/:leaderboardId/:attemptId', updateLeaderboard);
app.get('/api/leaderboards/:date/speed/top', getTopSpeeds);
app.get('/api/leaderboards/:date/moveCount/top', getTopMoveCounts);
app.get('/api/leaderboards/:date/speed/near', getNearbySpeeds);
app.get('/api/leaderboards/:date/moveCount/near', getNearbyMoves);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
