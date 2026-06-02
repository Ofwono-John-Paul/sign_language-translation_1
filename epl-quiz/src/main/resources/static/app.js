const app = document.getElementById('app');

const state = {
  questions: [],
  leaderboard: [],
  playerName: '',
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  locked: false,
  view: 'home',
};

const style = document.createElement('style');
style.textContent = `
  :root {
    color-scheme: dark;
    --bg: #08111f;
    --bg-2: #0f1d35;
    --panel: rgba(11, 20, 36, 0.82);
    --panel-strong: rgba(18, 30, 52, 0.95);
    --line: rgba(255, 255, 255, 0.1);
    --text: #edf4ff;
    --muted: #9bb0cc;
    --accent: #5ae0c2;
    --accent-2: #7cc4ff;
    --danger: #ff7b7b;
    --success: #6ef0a5;
    --shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    color: var(--text);
    background:
      radial-gradient(circle at top left, rgba(90, 224, 194, 0.15), transparent 30%),
      radial-gradient(circle at top right, rgba(124, 196, 255, 0.15), transparent 28%),
      linear-gradient(160deg, var(--bg), var(--bg-2));
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: radial-gradient(circle at center, black 55%, transparent 100%);
    opacity: 0.35;
  }

  .shell {
    width: min(1180px, calc(100vw - 32px));
    margin: 0 auto;
    padding: 28px 0 40px;
  }

  .hero {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
    align-items: stretch;
  }

  .brand, .panel, .card, .list-item, .status, .input, .button {
    border: 1px solid var(--line);
    backdrop-filter: blur(16px);
  }

  .brand {
    background: linear-gradient(140deg, rgba(20, 33, 58, 0.95), rgba(11, 19, 34, 0.85));
    border-radius: 28px;
    padding: 30px;
    box-shadow: var(--shadow);
  }

  .eyebrow {
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.76rem;
    margin: 0 0 10px;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.2rem, 5vw, 4.3rem);
    line-height: 0.95;
  }

  .subtitle {
    max-width: 60ch;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 16px;
  }

  .stats {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  .chip {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--line);
    padding: 10px 14px;
    border-radius: 999px;
    color: var(--text);
    font-size: 0.92rem;
  }

  .panel {
    background: rgba(8, 15, 28, 0.75);
    border-radius: 28px;
    padding: 22px;
    box-shadow: var(--shadow);
  }

  .panel h2, .panel h3 {
    margin: 0 0 16px;
    font-size: 1.1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 20px;
    margin-top: 20px;
  }

  .card {
    background: var(--panel);
    border-radius: 24px;
    padding: 22px;
    box-shadow: var(--shadow);
  }

  .menu {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 18px;
  }

  .button {
    appearance: none;
    border-radius: 16px;
    padding: 12px 18px;
    color: var(--text);
    background: rgba(255,255,255,0.06);
    cursor: pointer;
    font: inherit;
    transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
  }

  .button:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.1);
  }

  .button.primary {
    background: linear-gradient(135deg, #32d0b0, #5fa8ff);
    color: #03111d;
    border-color: transparent;
    font-weight: 700;
  }

  .button.secondary {
    background: rgba(255,255,255,0.05);
  }

  .button.ghost {
    background: transparent;
  }

  .input {
    width: 100%;
    border-radius: 16px;
    background: rgba(255,255,255,0.04);
    color: var(--text);
    padding: 14px 16px;
    border: 1px solid var(--line);
    outline: none;
    font: inherit;
  }

  .input:focus {
    border-color: rgba(90, 224, 194, 0.65);
    box-shadow: 0 0 0 4px rgba(90, 224, 194, 0.14);
  }

  .question {
    font-size: clamp(1.15rem, 2.5vw, 1.65rem);
    line-height: 1.35;
    margin: 6px 0 18px;
  }

  .options {
    display: grid;
    gap: 12px;
  }

  .option {
    text-align: left;
    border-radius: 18px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--line);
  }

  .option.selected { border-color: rgba(124, 196, 255, 0.8); background: rgba(124, 196, 255, 0.16); }
  .option.correct { border-color: rgba(110, 240, 165, 0.65); background: rgba(110, 240, 165, 0.1); }
  .option.wrong { border-color: rgba(255, 123, 123, 0.75); background: rgba(255, 123, 123, 0.12); }

  .meta {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin: 0 0 14px;
    color: var(--muted);
    font-size: 0.92rem;
  }

  .meter {
    height: 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
    margin-bottom: 18px;
  }

  .meter > div {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    width: 0%;
    transition: width 220ms ease;
  }

  .leaderboard {
    display: grid;
    gap: 10px;
  }

  .entry, .list-item {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    padding: 13px 14px;
    border-radius: 16px;
    background: rgba(255,255,255,0.04);
  }

  .entry strong { font-size: 0.95rem; }
  .entry span { color: var(--muted); }

  .notice {
    color: var(--muted);
    line-height: 1.65;
  }

  .result {
    display: grid;
    gap: 12px;
  }

  .result-score {
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
  }

  .rating {
    color: var(--accent);
    font-size: 1.1rem;
    font-weight: 700;
  }

  @media (max-width: 920px) {
    .hero, .grid { grid-template-columns: 1fr; }
    .shell { width: min(100vw - 20px, 1180px); }
  }
`;

document.head.appendChild(style);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function getRating(pct) {
  if (pct === 100) return "Perfect. You're a legend.";
  if (pct >= 80) return 'Excellent. Top of the table.';
  if (pct >= 60) return 'Good. Mid-table form.';
  if (pct >= 40) return 'Decent. Need more training.';
  return 'Relegation zone. Study up.';
}

function renderLayout(content, sidebar = null) {
  app.innerHTML = '';

  const shell = el('div', 'shell');
  const hero = el('section', 'hero');

  const brand = el('div', 'brand');
  brand.append(
    Object.assign(el('p', 'eyebrow', 'EPL QUIZ'), { style: 'margin-top: 0;' }),
    el('h1', '', 'Premier League quiz, rebuilt as a browser game.'),
    el('p', 'subtitle', 'Test your knowledge of all things Premier League with 10 random questions each time. Compete for the top spot on the leaderboard!')
  );

  const stats = el('div', 'stats');
  stats.append(
    el('div', 'chip', 'JavaScript UI'),
    el('div', 'chip', 'Spring Boot API'),
    el('div', 'chip', 'Persistent leaderboard')
  );
  brand.append(stats);

  const actions = el('div', 'menu');
  const startButton = el('button', 'button primary', 'Start quiz');
  startButton.addEventListener('click', showStartScreen);
  const leaderboardButton = el('button', 'button secondary', 'View leaderboard');
  leaderboardButton.addEventListener('click', () => {
    state.view = 'leaderboard';
    renderApp();
  });
  actions.append(startButton, leaderboardButton);
  brand.append(actions);

  const infoPanel = el('div', 'panel');
  infoPanel.innerHTML = `
    <h2>How it works</h2>
    <div class="notice">
      1. Enter your name and start the quiz.<br />
      2. Answer 10 random Premier League questions.<br />
      3. Save your score to the leaderboard when you finish.
    </div>
  `;

  hero.append(brand, infoPanel);
  shell.append(hero);

  const grid = el('section', 'grid');
  const main = el('div', 'card');
  main.append(content);
  grid.append(main);

  const side = el('aside', 'panel');
  if (sidebar) {
    side.append(sidebar);
  } else {
    side.innerHTML = `
      <h3>Quick notes</h3>
      <div class="notice">This version replaces the terminal flow with a JS front end, so you can play directly in the browser at <strong>http://localhost:8080</strong>.</div>
    `;
  }
  grid.append(side);

  shell.append(grid);
  app.append(shell);
}

function showStartScreen() {
  state.view = 'start';
  const content = el('div');
  content.innerHTML = `
    <p class="eyebrow">Start screen</p>
    <h2 style="margin:0 0 14px;">Enter your name to begin.</h2>
    <p class="notice" style="margin-top:0;">The quiz will pull a fresh random set of questions from the server each time.</p>
  `;

  const nameInput = el('input', 'input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Your name';
  nameInput.value = state.playerName || '';

  const start = el('button', 'button primary', 'Begin quiz');
  start.addEventListener('click', async () => {
    state.playerName = nameInput.value.trim() || 'Anonymous';
    state.view = 'quiz';
    state.currentIndex = 0;
    state.score = 0;
    state.selectedAnswer = null;
    state.locked = false;
    await loadQuestions();
    renderApp();
  });

  const back = el('button', 'button ghost', 'Back to home');
  back.addEventListener('click', renderApp);

  const menu = el('div', 'menu');
  menu.append(start, back);

  content.append(nameInput, menu);

  const sidebar = el('div');
  sidebar.innerHTML = `
    <h3>Leaderboard</h3>
    <div id="preview-leaderboard" class="leaderboard"></div>
  `;

  renderLayout(content, sidebar);
  loadLeaderboardPreview('preview-leaderboard');
}

async function loadQuestions() {
  const response = await fetch('/api/questions');
  state.questions = await response.json();
}

async function loadLeaderboard() {
  const response = await fetch('/api/leaderboard');
  state.leaderboard = await response.json();
}

async function loadLeaderboardPreview(containerId) {
  await loadLeaderboard();
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  state.leaderboard.slice(0, 5).forEach((entry, index) => {
    const row = el('div', 'entry');
    row.append(
      el('strong', '', `${index + 1}. ${entry.name}`),
      el('span', '', `${entry.score}/${entry.total} (${Math.round((entry.score * 100) / Math.max(entry.total, 1))}%)`)
    );
    container.append(row);
  });
  if (!container.children.length) {
    container.append(el('div', 'notice', 'No scores yet. Be the first.'));
  }
}

function renderQuiz() {
  const question = state.questions[state.currentIndex];
  if (!question) {
    return renderResult();
  }

  const progress = Math.round((state.currentIndex / state.questions.length) * 100);
  const content = el('div');
  content.innerHTML = `
    <p class="eyebrow">Quiz in progress</p>
    <div class="meta"><span>Player: ${escapeHtml(state.playerName)}</span><span>${state.currentIndex + 1} / ${state.questions.length}</span></div>
    <div class="meter"><div style="width:${progress}%"></div></div>
    <h2 class="question">${escapeHtml(question.question)}</h2>
  `;

  const options = el('div', 'options');
  question.options.forEach((option) => {
    const button = el('button', 'button option', option);
    if (state.selectedAnswer === option) {
      button.classList.add('selected');
    }
    button.disabled = state.locked;
    button.addEventListener('click', () => selectAnswer(option));
    options.append(button);
  });

  const footer = el('div', 'menu');
  const skip = el('button', 'button ghost', 'Skip question');
  skip.disabled = state.locked;
  skip.addEventListener('click', () => {
    state.selectedAnswer = null;
    submitAnswer(true);
  });
  footer.append(skip);

  const submit = el('button', 'button primary', 'Submit answer');
  submit.disabled = state.locked || !state.selectedAnswer;
  submit.addEventListener('click', () => submitAnswer(false));
  footer.append(submit);

  content.append(options, footer);

  const sidebar = el('div');
  sidebar.innerHTML = `
    <h3>Scoreboard</h3>
    <div class="result-score">${state.score}</div>
    <div class="notice">Correct answers so far</div>
    <div style="height:16px"></div>
    <h3>Leaderboard</h3>
    <div id="live-leaderboard" class="leaderboard"></div>
  `;

  renderLayout(content, sidebar);
  loadLeaderboardPreview('live-leaderboard');
}

function selectAnswer(option) {
  if (state.locked) return;
  state.selectedAnswer = option;
  renderQuiz();
}

function submitAnswer(skipped) {
  const question = state.questions[state.currentIndex];
  if (!question || state.locked) return;
  if (!skipped && !state.selectedAnswer) return;
  if (skipped) {
    state.selectedAnswer = null;
  }

  state.locked = true;

  const options = document.querySelectorAll('.option');
  options.forEach((optionButton) => {
    optionButton.disabled = true;
    if (state.selectedAnswer && optionButton.textContent === state.selectedAnswer && state.selectedAnswer === question.answer) {
      optionButton.classList.add('correct');
    } else if (state.selectedAnswer && optionButton.textContent === state.selectedAnswer && state.selectedAnswer !== question.answer) {
      optionButton.classList.add('wrong');
    }
  });

  if (state.selectedAnswer === question.answer) {
    state.score += 1;
  }

  const footer = document.querySelector('.card .menu');
  const nextButton = el('button', 'button primary', state.currentIndex === state.questions.length - 1 ? 'Finish quiz' : 'Next question');
  nextButton.addEventListener('click', async () => {
    state.currentIndex += 1;
    state.selectedAnswer = null;
    state.locked = false;
    if (state.currentIndex >= state.questions.length) {
      await renderResult();
    } else {
      renderQuiz();
    }
  });

  if (footer) {
    footer.append(nextButton);
  }
}

async function renderResult() {
  const total = state.questions.length || 1;
  const percent = Math.round((state.score * 100) / total);

  await fetch('/api/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: state.playerName,
      score: state.score,
      total,
    }),
  });

  await loadLeaderboard();

  const content = el('div', 'result');
  content.innerHTML = `
    <p class="eyebrow">Full time</p>
    <div class="result-score">${state.score}/${total}</div>
    <div class="rating">${getRating(percent)}</div>
    <div class="notice">${escapeHtml(state.playerName)} finished with ${percent}%.</div>
  `;

  const menu = el('div', 'menu');
  const playAgain = el('button', 'button primary', 'Play again');
  playAgain.addEventListener('click', showStartScreen);
  const viewBoard = el('button', 'button secondary', 'View leaderboard');
  viewBoard.addEventListener('click', () => {
    state.view = 'leaderboard';
    renderApp();
  });
  menu.append(playAgain, viewBoard);
  content.append(menu);

  const sidebar = el('div');
  sidebar.innerHTML = `
    <h3>Leaderboard</h3>
    <div id="final-leaderboard" class="leaderboard"></div>
  `;

  renderLayout(content, sidebar);
  loadLeaderboardPreview('final-leaderboard');
}

function renderLeaderboard() {
  const content = el('div');
  content.innerHTML = `
    <p class="eyebrow">Leaderboard</p>
    <h2 style="margin:0 0 14px;">Current top scores</h2>
    <p class="notice" style="margin-top:0;">Scores are stored by the Spring Boot backend in <strong>scores.json</strong>.</p>
  `;

  const list = el('div', 'leaderboard');
  if (!state.leaderboard.length) {
    list.append(el('div', 'notice', 'No scores yet. Start a quiz to create the first entry.'));
  } else {
    state.leaderboard.forEach((entry, index) => {
      const row = el('div', 'entry');
      row.append(
        el('strong', '', `${index + 1}. ${entry.name}`),
        el('span', '', `${entry.score}/${entry.total} (${Math.round((entry.score * 100) / Math.max(entry.total, 1))}%)`)
      );
      list.append(row);
    });
  }
  content.append(list);

  const sidebar = el('div');
  sidebar.innerHTML = `
    <h3>Actions</h3>
    <div class="menu">
      <button class="button primary" id="leaderboard-start">Start quiz</button>
      <button class="button secondary" id="leaderboard-home">Home</button>
    </div>
  `;

  renderLayout(content, sidebar);
  document.getElementById('leaderboard-start').addEventListener('click', showStartScreen);
  document.getElementById('leaderboard-home').addEventListener('click', renderApp);
}

async function renderApp() {
  await loadLeaderboard();

  if (state.view === 'leaderboard') {
    renderLeaderboard();
    return;
  }

  if (state.view === 'quiz') {
    renderQuiz();
    return;
  }

  if (state.view === 'start') {
    showStartScreen();
    return;
  }

  const content = el('div');
  content.innerHTML = `
    <p class="eyebrow">Welcome</p>
    <h2 style="margin:0 0 14px;">Choose a mode.</h2>
    <p class="notice" style="margin-top:0;">Use the buttons below to start the quiz or inspect the leaderboard.</p>
  `;

  const menu = el('div', 'menu');
  const start = el('button', 'button primary', 'Start quiz');
  start.addEventListener('click', showStartScreen);
  const board = el('button', 'button secondary', 'View leaderboard');
  board.addEventListener('click', () => {
    state.view = 'leaderboard';
    renderApp();
  });
  menu.append(start, board);
  content.append(menu);

  const sidebar = el('div');
  sidebar.innerHTML = `
    <h3>Latest leaderboard</h3>
    <div id="home-leaderboard" class="leaderboard"></div>
  `;

  renderLayout(content, sidebar);
  loadLeaderboardPreview('home-leaderboard');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

(async function boot() {
  try {
    await renderApp();
  } catch (error) {
    app.innerHTML = `<div style="padding:24px;color:#fff">Failed to load the quiz UI: ${escapeHtml(error.message)}</div>`;
  }
})();
