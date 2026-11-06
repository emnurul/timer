import React, { useEffect, useState } from 'react';
import games from './games.js';

const formatTime = (total) => {
  const safe = Math.max(0, total);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':');
};

export default function App() {
  const [selectedId, setSelectedId] = useState(games[0]?.id);
  const [mode, setMode] = useState('ready'); // ready | running | paused | finished
  const [remaining, setRemaining] = useState(games[0]?.timeSeconds ?? 0);

  const selectedGame = games.find((game) => game.id === selectedId) ?? games[0];

  useEffect(() => {
    if (mode !== 'running') return undefined;
    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setMode('finished');
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [mode]);

  const chooseGame = (game) => {
    setSelectedId(game.id);
    setRemaining(game.timeSeconds);
    setMode('ready');
  };

  const startStop = () => {
    if (mode === 'running') {
      setMode('paused');
      return;
    }
    if (remaining <= 0) setRemaining(selectedGame.timeSeconds);
    setMode('running');
  };

  const reset = () => {
    setMode('ready');
    setRemaining(selectedGame.timeSeconds);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Choose a game">
        {/* <div className="sidebar-heading">PRESETS</div> */}
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              className={`game-nav ${game.id === selectedId ? 'active' : ''}`}
              onClick={() => chooseGame(game)}
            >
              {Icon && <Icon aria-hidden="true" />}
            </button>
          );
        })}
      </aside>

      <section
        className="main-panel"
        style={selectedGame.backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(255,255,255,.88), rgba(255,255,255,.88)), url("${selectedGame.backgroundImage}")`
        } : undefined}
      >
        <div className="landing">
          <div className="game-copy">
            <h1>{selectedGame.name}</h1>
            <p className="description">{selectedGame.description}</p>
            <div className={`countdown ${mode === 'finished' ? 'finished' : ''}`} aria-live="polite">
              {formatTime(remaining)}
            </div>
            <p className="status">
              {mode === 'running' ? 'Timer running' : mode === 'finished' ? 'Time is up!' : mode === 'paused' ? 'Stopped' : 'Ready'}
            </p>
          </div>
          <div className="timer-actions">
            <button className="primary-button start-button" onClick={startStop}>
              {mode === 'running' ? 'STOP' : 'START'}
            </button>
            <button className="outline-button" onClick={reset}>RESET</button>
          </div>
        </div>
      </section>
      <footer className="footer">Good luck, Have Fun!</footer>
    </main>
  );
}