<script lang="ts">
  import { page } from '$app/state';
  import { auth } from '$lib/auth.svelte';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';
  import wallUrl from '$lib/img/wall.png';
  import boxUrl from '$lib/img/box.png';
  import playerUrl from '$lib/img/player.png';
  import targetUrl from '$lib/img/target.png';
  import targetBoxUrl from '$lib/img/targetBox.png';
  import { onMount } from 'svelte';

  interface Puzzle {
    puzzleId: string;
    minMoves: number;
    content: string;
  }
  //These values are used to encode the puzzle
  const EMP = 0;
  const WALL = 1;
  const BOX = 2;
  const TARGET = 3;
  const TARGETBOX = 4;
  const PLAYER = 5;
  const PLAYERTARG = 6;
  let moveCount: number = $state(0);

  let avgScore = $state(-1);
  let avgTime = $state(-1);
  let numCompleted = $state(0);
  let date: string | undefined = $state();
  let year: string = $state('');
  let month: string = $state('');
  let day: string = $state('');

  if (auth.user) {
    numCompleted = auth.user.numCompleted;
    avgScore = auth.user.averageScore;
    avgTime = auth.user.averageTime;
  }

  let email = $state('');
  let password = $state('');
  let displayName = $state('');
  let submitting = $state(false);
  let loginDiv: boolean = $state(false);
  let regDiv: boolean = $state(false);
  let startTime = $state(new Date());
  let time = $state(startTime);
  let puzzle: Puzzle | null = $state(null);
  let content: number[][] = $state([]);
  let pos = { x: 0, y: 0 };
  initInput();

  function resetPuzzle(){
    if (puzzle) {
      content = [];
      let row: number[] = [];
      let x = 0;
      let y = 0;
      moveCount = 0;
      startTime = new Date();
      for (var char of puzzle.content) {
        if (char === '\n') {
          content.push(row);
          y++;
          row = [];
          x = 0;
        } else {
          if (char === '_') row.push(EMP);
          if (char === '#') row.push(WALL);
          if (char === 'B') row.push(BOX);
          if (char === 'X') row.push(TARGET);
          if (char === '*') row.push(TARGETBOX);
          if (char === 'P') {
            row.push(PLAYER);
            pos.x = x;
            pos.y = y;
          }
          x++;
        }
      }
      content.push(row);
    }

  }

  function move(dir: number) {
    // move right
    if (dir === 1) {
      let next = content[pos.x][pos.y + 1];
      let nextNext = content[pos.x][pos.y + 2];
      // I am writing this at 4:50 in the morning, this game logic is disgusting, but idk
      if (
        next === EMP ||
        next === TARGET ||
        ((next === BOX || next == TARGETBOX) && (nextNext === EMP || nextNext === TARGET))
      ) {
        if (next === TARGET || next === TARGETBOX) {
          content[pos.x][pos.y + 1] = PLAYERTARG;
        } else {
          content[pos.x][pos.y + 1] = PLAYER;
        }
        if (next === BOX || next === TARGETBOX) {
          if (nextNext === TARGET) content[pos.x][pos.y + 2] = TARGETBOX;
          else content[pos.x][pos.y + 2] = BOX;
        }
        if (content[pos.x][pos.y] === PLAYERTARG) content[pos.x][pos.y] = TARGET;
        else content[pos.x][pos.y] = EMP;
        pos.y++;
      }
    }
    // move down
    else if (dir === 2) {
      let next = content[pos.x + 1][pos.y];
      let nextNext = content[pos.x + 2][pos.y];
      // I am writing this at 4:50 in the morning, this game logic is disgusting, but idk
      if (
        next === EMP ||
        next === TARGET ||
        ((next === BOX || next === TARGETBOX) && (nextNext === EMP || nextNext === TARGET))
      ) {
        if (next === TARGET || next === TARGETBOX) {
          content[pos.x + 1][pos.y] = PLAYERTARG;
        } else {
          content[pos.x + 1][pos.y] = PLAYER;
        }
        if (next === BOX || next === TARGETBOX) {
          if (nextNext === TARGET) content[pos.x + 2][pos.y] = TARGETBOX;
          else {
            content[pos.x + 2][pos.y] = BOX;
          }
        }
        if (content[pos.x][pos.y] === PLAYERTARG) content[pos.x][pos.y] = TARGET;
        else content[pos.x][pos.y] = EMP;
        pos.x++;
      }
    }
    //move left
    else if (dir === 3) {
      let next = content[pos.x][pos.y - 1];
      let nextNext = content[pos.x][pos.y - 2];
      // I am writing this at 4:50 in the morning, this game logic is disgusting, but idk
      if (
        next === EMP ||
        next === TARGET ||
        ((next === BOX || next === TARGETBOX) && (nextNext === EMP || nextNext === TARGET))
      ) {
        if (next === TARGET || next === TARGETBOX) {
          content[pos.x][pos.y - 1] = PLAYERTARG;
        } else {
          content[pos.x][pos.y - 1] = PLAYER;
        }
        if (next === BOX || next === TARGETBOX) {
          if (nextNext === TARGET) content[pos.x][pos.y - 2] = TARGETBOX;
          else content[pos.x][pos.y - 2] = BOX;
        }
        if (content[pos.x][pos.y] === PLAYERTARG) content[pos.x][pos.y] = TARGET;
        else content[pos.x][pos.y] = EMP;
        pos.y--;
      }
    }
    //move up
    else if (dir === 4) {
      let next = content[pos.x - 1][pos.y];
      let nextNext = content[pos.x - 2][pos.y];
      // I am writing this at 4:50 in the morning, this game logic is disgusting, but idk
      if (
        next === EMP ||
        next === TARGET ||
        ((next === BOX || next === TARGETBOX) && (nextNext === EMP || nextNext === TARGET))
      ) {
        if (next === TARGET || next === TARGETBOX) {
          content[pos.x - 1][pos.y] = PLAYERTARG;
        } else {
          content[pos.x - 1][pos.y] = PLAYER;
        }
        if (next === BOX || next === TARGETBOX) {
          if (nextNext === TARGET) content[pos.x - 2][pos.y] = TARGETBOX;
          else {
            content[pos.x - 2][pos.y] = BOX;
          }
        }
        if (content[pos.x][pos.y] === PLAYERTARG) content[pos.x][pos.y] = TARGET;
        else content[pos.x][pos.y] = EMP;
        pos.x--;
      }
    }
    moveCount++;
    checkSolution();
  }

  async function checkSolution() {
    for (let line of content) for (let char of line) if (char === BOX) return;

    if (auth.user && puzzle) {
      let userId = auth.user.userId;
      let puzzleId = puzzle.puzzleId;
      let timeSpent = Math.floor((time.getTime() - startTime.getTime()) / 1000);
      // let firstAttempt = await api.get<boolean>('/puzzles/'+userId);
      let firstAttempt = false;

      let result = await api.post('/attempts/' + userId + '/' + puzzleId, {
        moveCount,
        timeSpent,
        firstAttempt,
      });
      if (!result.ok) {
        toast.error('Unable to create an attempt');
        return;
      }
      toast.success('Successful attempt added');
      avgTime = (avgTime * numCompleted + timeSpent) / (numCompleted + 1);
      avgScore = (avgScore * numCompleted + moveCount) / (numCompleted + 1);
      numCompleted++;
    } else {
      toast.info('Puzzle completed, but attempt not logged, login to save scores');
    }
    resetPuzzle();
  }

  function initInput(): void {
    window.addEventListener('keydown', (event) => {
      if (event.key == 'd') move(1);
      if (event.key == 's') move(2);
      if (event.key == 'a') move(3);
      if (event.key == 'w') move(4);
    });
  }

  async function handleReg(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('/users', { email, password, displayName });
    submitting = false;

    if (!result.ok) {
      toast.error('Registration failed. Try a different email.');
      return;
    }
    toast.success('Account created!');

    submitting = true;
    const loginResult = await api.post('/login', { email, password });
    submitting = false;

    if (!loginResult.ok) {
      toast.error('Automatic login failed. Try using the login form');
      return;
    }
    toast.success('Logged in!');
    regDiv = false;
    if (auth.user) {
      numCompleted = auth.user.numCompleted;
      avgScore = auth.user.averageScore;
      avgTime = auth.user.averageTime;
    }
    auth.refresh();
  }

  async function handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;
    const result = await api.post('/login', { email, password });

    submitting = false;
    if (result.status === 403) {
      toast.error('Invalid email or password');
      return;
    }
    if (!result.ok) {
      toast.error('Something went wrong');
      return;
    }
    toast.success('Logged in!');
    loginDiv = false;
    if (auth.user) {
      numCompleted = auth.user.numCompleted;
      avgScore = auth.user.averageScore;
      avgTime = auth.user.averageTime;
    }

    auth.refresh();
  }

  // Took this function from the svelte docs, to update time since puzzle started and til next puzzle
  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  onMount(async () => {
    date = page.params.puzzleDate;
    if (date) {
      let temp: string[] = date.split('-');
      year = temp[0];
      month = temp[1];
      day = temp[2];
    }
    const result = await api.get<Puzzle>(`/puzzles/${date}`);

    if (result.ok) {
      puzzle = result.data;
      let row: number[] = [];
      let x = 0;
      let y = 0;
      for (var char of puzzle.content) {
        if (char === '\n') {
          content.push(row);
          y++;
          row = [];
          x = 0;
        } else {
          if (char === '_') row.push(EMP);
          if (char === '#') row.push(WALL);
          if (char === 'B') row.push(BOX);
          if (char === 'X') row.push(TARGET);
          if (char === '*') row.push(TARGETBOX);
          if (char === 'P') {
            row.push(PLAYER);
            pos.x = x;
            pos.y = y;
          }
          x++;
        }
      }
      content.push(row);
    } else {
      toast.error('Failed to load puzzle');
    }
  });
</script>

<div class="holy-grail-grid">
  <header class="header">
    <div class="column">
      <a href="https://www.github.com/pilovingjoe/dailyban">Github</a>
      <br />
      <a href="/calendar">Calendar</a>
      <br/>
      <a href="/">Today's puzzle</a>
    </div>
    <div class="column" style="width:50%">
      <h1>
        &Tab; {date} &Tab;
        {#if page.params.puzzleDate && !(new Date(page.params.puzzleDate).getTime() >= new Date().getTime() - 24 * 60 * 60 * 1000)}{/if}
      </h1>
    </div>
    <div class="column">
      {#if auth.user}
        <button
          class="loginButton"
          type="button"
          onclick={async () => {
            await api.del('/sessions');
            auth.setUser(null);
            toast.info('Logged out');
            auth.refresh();
          }}
        >
          Logout
        </button>
      {:else if loginDiv || regDiv}
        <button
          class="loginButton"
          type="button"
          onclick={() => {
            loginDiv = false;
            regDiv = false;
          }}>Back</button
        >
      {:else}
        <button class="loginButton" type="button" onclick={() => (loginDiv = true)}>Login</button>
        <button class="loginButton" type="button" onclick={() => (regDiv = true)}>Register</button>
      {/if}
    </div>
  </header>
  <main class="main-content">
    <div class="topSection">
      Time to next puzzle - {(24 - time.getUTCHours()) % 24} Hours, {(60 - time.getUTCMinutes()) %
        60} minutes, {(60 - time.getUTCSeconds()) % 60} seconds
    </div>
    <br />
    <hr />
    {#if loginDiv || regDiv}
      <div class="sessionMgmt">
        {#if loginDiv}
          Login
          <form onsubmit={handleLogin}>
            <label>
              Email
              <input type="email" bind:value={email} required />
            </label>
            <label>
              Password
              <input type="password" bind:value={password} required />
            </label>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        {/if}
        {#if regDiv}
          Register
          <form onsubmit={handleReg}>
            <label>
              Email
              <input type="email" bind:value={email} required />
            </label>
            <label>
              Display Name
              <input type="text" bind:value={displayName} required />
            </label>
            <label>
              Password
              <input type="password" bind:value={password} required />
            </label>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>
        {/if}
      </div>
    {:else if puzzle}
      <div class="puzzle" id="puzzle">
        {#each content as row}
          {#each row as cell}
            <span class="cell">
              {#if cell == WALL}
                <img src={wallUrl} alt="wall" />
              {:else if cell == BOX}
                <img src={boxUrl} alt="box" />
              {:else if cell == TARGET}
                <img src={targetUrl} alt="target" />
              {:else if cell == TARGETBOX}
                <img src={targetBoxUrl} alt="box on target" />
              {:else if cell == PLAYER || cell == PLAYERTARG}
                <img src={playerUrl} alt="player" />
              {/if}
            </span>
          {/each}
          <br />
        {/each}
      </div>
    {:else if page.params.puzzleDate && new Date(page.params.puzzleDate).getTime() && new Date(page.params.puzzleDate).getTime() < new Date().getTime()}
      <h1>
        There is no puzzle for this day, We are still backdating our puzzles, please be patient
      </h1>
    {:else if page.params.puzzleDate && new Date(page.params.puzzleDate).getTime()}
      <h1>This page is for a puzzle that is not yet been posted</h1>
    {:else}
      <h1>This link does not follow the format 'yyyy-mm-dd' (like 2026-05-07)</h1>
    {/if}
    <br />
    <hr />
    {#if !loginDiv && !regDiv}
      <div class="bottomSection">
        <div class="leftCell">Move Count - {moveCount}</div>
        <div class="rightCell">
          Time - {Math.floor((time.getTime() - startTime.getTime()) / 1000)} seconds
        </div>
      </div>
    {/if}
  </main>

  <aside class="left-sidebar">
    <!-- Leaderboards go here -->
    {#if !loginDiv && !regDiv}
      <div class="nav">
        <button
          type="button"
          class="navBut"
          style="grid-column-start: 2;"
          onclick={() => {
            move(4);
          }}>Up</button
        >
        <br />
        <button
          type="button"
          class="navBut"
          style="grid-row-start: 2;"
          onclick={() => {
            move(3);
          }}>Left</button
        >
        <button
          type="button"
          class="navBut"
          style="
          grid-column-start: 3;
          grid-row-start: 2;
        "
          onclick={() => {
            move(1);
          }}>Right</button
        >
        <br />
        <button
          type="button"
          class="navBut"
          style="
          grid-column-start: 2;
          grid-row-start: 3;
        "
          onclick={() => {
            move(2);
          }}>Down</button
        >
      </div>
      <br />
      <br />
      <button
        type="button"
        class="navBut"
        style="
          background-color: #f38ba8
        "
        onclick={() => {
          resetPuzzle();
        }}>Reset</button
      >
    {/if}
  </aside>
  <aside class="right-sidebar">
    {#if auth.user}
      <h2>Welcome {auth.user.displayName}</h2>
      {#if avgScore == -1}
        <p>Do some puzzles and your stats will show up here!</p>
      {:else}
        <p>Average move count: {avgScore}</p>
        <p>Average time taken: {avgTime}</p>
        <p>Number of puzzles completed: {numCompleted}</p>
      {/if}
    {/if}
  </aside>
</div>
