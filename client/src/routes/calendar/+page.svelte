<script lang="ts">
  import { auth } from '$lib/auth.svelte';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';
  import { onMount } from 'svelte';

  let email = $state('');
  let password = $state('');
  let displayName = $state('');
  let submitting = $state(false);
  let loginDiv: boolean = $state(false);
  let regDiv: boolean = $state(false);
  let startTime: Date = new Date();
  let time: Date = startTime;

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

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
    auth.refresh();
  }

  onMount(async () => {});
</script>

<div class="holy-grail-grid">
  <header class="header">
    <div class="column"><a href="https://www.github.com/pilovingjoe">Github</a></div>
    <div class="column" style="width:50%">
      <h1>
        Calendar
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
    {/if}
    <br />
    <hr />
    <div class="calendar">
      <div class="month">
        <div class="label">January</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-01-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">February</div>
        <div class="weeks">
          {#each { length: 28 } as _, i}
            <div class="day"><a href={"2026-02-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">March</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-03-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">April</div>
        <div class="weeks">
          {#each { length: 30 } as _, i}
            <div class="day"><a href={"2026-04-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">May</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-05-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">June</div>
        <div class="weeks">
          {#each { length: 30 } as _, i}
            <div class="day"><a href={"2026-06-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">July</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-07-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">August</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-08-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">September</div>
        <div class="weeks">
          {#each { length: 30 } as _, i}
            <div class="day"><a href={"2026-09-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">October</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-10-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">November</div>
        <div class="weeks">
          {#each { length: 30 } as _, i}
            <div class="day"><a href={"2026-11-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
      <div class="month">
        <div class="label">December</div>
        <div class="weeks">
          {#each { length: 31 } as _, i}
            <div class="day"><a href={"2026-12-"+(i+1).toString().padStart(2,'0')}> {i+1}</a></div>
          {/each}
        </div>
      </div>
    </div>
  </main>

  <aside class="left-sidebar">Leaderboards go here</aside>
  <aside class="right-sidebar">
    {#if auth.user}
      <h2>Welcome {auth.user.displayName}</h2>
      <!-- <p>Average move count: {auth.user.averageScore}</p> -->
      <!-- <p>Average time taken: {auth.user.averageTime}</p> -->
      <!-- <p>Number of puzzles completed: {auth.user.numCompleted}</p> -->
    {/if}
  </aside>
</div>
