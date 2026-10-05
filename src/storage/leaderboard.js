const STORAGE_KEY = 'memory-game:leaderboard';
const MAX_RESULTS = 10;

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.warn('[leaderboard] Failed to read from localStorage:', error);
    return [];
  }
}

function writeAll(results) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (error) {
    console.warn('[leaderboard] Failed to write to localStorage:', error);
  }
}

function sortResults(results) {
  return [...results].sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;
    return a.date.localeCompare(b.date);
  });
}

export function getLeaderboard() {
  const all = readAll();
  const sorted = sortResults(all);
  return sorted.slice(0, MAX_RESULTS);
}

export function addResult(moves) {
  const all = readAll();
  const newResult = {
    moves,
    date: new Date().toISOString(),
  };
  all.push(newResult);
  const sorted = sortResults(all);
  writeAll(sorted);
  return sorted.slice(0, MAX_RESULTS);
}

export function clearLeaderboard() {
  localStorage.removeItem(STORAGE_KEY);
}
