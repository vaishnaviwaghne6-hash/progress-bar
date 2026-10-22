
import { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Plan the project", completed: false },
  { id: 2, title: "Design the interface", completed: false },
  { id: 3, title: "Develop the features", completed: false },
  { id: 4, title: "Test the application", completed: false },
  { id: 5, title: "Launch the project", completed: false },
];

function Confetti() {
  const symbols = ["✦", "✧", "★", "✳", "•", "✨"];

  return (
    <div className="finish-celebration" aria-live="polite">
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className={`confetti confetti-${i % 6}`}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 10) * 0.12}s`,
          }}
        >
          {symbols[i % symbols.length]}
        </span>
      ))}

      <div className="completion-message">
        <span className="trophy">🏆</span>
        <strong>PROJECT COMPLETED!</strong>
        <span>All tasks finished successfully!</span>
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const completed = tasks.filter((task) => task.completed).length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  const finished = progress === 100;

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function resetTasks() {
    setTasks(initialTasks.map((task) => ({ ...task })));
  }

  return (
    <main className="app">
      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-mark">↗</span>
          Track<span>it.</span>
        </a>

        <span className="header-label">MY WORKSPACE</span>
      </header>

      <div className="container" id="home">
        <section className="intro">
          <span className="eyebrow">PROJECT TRACKER</span>
          <h1>Make progress.</h1>
          <p>
            One task at a time. One step closer to the finish line.
          </p>
        </section>

        <section className="race-card">
          <div className="race-header">
            <div>
              <span className="label">ACTIVE PROJECT</span>
              <h2>Website Development</h2>
              <p>
                {finished
                  ? "Amazing work! You crossed the finish line."
                  : `${tasks.length - completed} tasks left to finish`}
              </p>
            </div>

            <div className="percentage">
              <strong>{progress}%</strong>
              <span>{finished ? "Completed" : "In progress"}</span>
            </div>
          </div>

          <div className="race-scene">
            <div className="scene-sky">
              <span className="cloud cloud-one">☁</span>
              <span className="cloud cloud-two">☁</span>
              <span className="sun" />
            </div>

            <div className="race-track">
              <div className="track-line" />

              <div
                className="car-position"
                style={{ left: `${5 + progress * 0.84}%` }}
              >
                <div className={`car ${finished ? "car-finished" : ""}`}>
                  <svg
                    viewBox="0 0 100 54"
                    width="94"
                    height="51"
                    role="img"
                    aria-label="Progress car"
                  >
                    <ellipse
                      cx="50"
                      cy="47"
                      rx="43"
                      ry="4"
                      fill="#222b27"
                      opacity=".12"
                    />

                    <path
                      d="M13 31 L20 19 Q22 16 28 16 L65 16 Q71 16 76 24 L85 29 Q90 31 90 37 L90 40 L10 40 L10 34 Q10 31 13 31Z"
                      fill="#347653"
                    />

                    <path
                      d="M28 19 L62 19 Q67 19 71 27 L24 27Z"
                      fill="#dcece2"
                    />

                    <path
                      d="M12 32 L87 32 L89 38 L10 38Z"
                      fill="#245c43"
                    />

                    <rect
                      x="5"
                      y="30"
                      width="8"
                      height="5"
                      rx="2"
                      fill="#f8e8a8"
                    />

                    <rect
                      x="85"
                      y="30"
                      width="8"
                      height="5"
                      rx="2"
                      fill="#f08b79"
                    />

                    <circle cx="27" cy="39" r="9" fill="#26312c" />
                    <circle cx="27" cy="39" r="4" fill="#d6ded8" />

                    <circle cx="72" cy="39" r="9" fill="#26312c" />
                    <circle cx="72" cy="39" r="4" fill="#d6ded8" />

                    <path
                      d="M17 13 L11 9"
                      stroke="#347653"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {finished && (
                    <>
                      <span className="finish-spark">✦</span>
                      <span className="car-confetti">✨</span>
                    </>
                  )}
                </div>
              </div>

              <div className="finish-line" aria-label="Finish line">
                <span>FINISH</span>
                <div className="checkered" />
              </div>

              <div className="road-markings">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>

            <div className="scene-ground" />

            {finished && <Confetti />}
          </div>

          <div className="race-footer">
            <div>
              <span className="label">RACE STATUS</span>
              <strong>
                {finished
                  ? "Finished! 🏆"
                  : progress === 0
                    ? "Ready to go"
                    : "You're moving forward"}
              </strong>
            </div>

            <div className="completed-count">
              <strong>
                {completed}/{tasks.length}
              </strong>
              <span>tasks done</span>
            </div>
          </div>
        </section>

        <section className="tasks-section">
          <div className="tasks-heading">
            <div>
              <span className="label">YOUR CHECKLIST</span>
              <h2>Race checkpoints</h2>
            </div>

            <button
              className="reset-button"
              type="button"
              onClick={resetTasks}
            >
              ↻ Reset
            </button>
          </div>

          <div className="task-list">
            {tasks.map((task, index) => (
              <label
                key={task.id}
                className={`task-row ${
                  task.completed ? "task-complete" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span className="checkbox">
                  {task.completed ? "✓" : ""}
                </span>

                <span className="task-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="task-title">{task.title}</span>

                <span className="task-state">
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </label>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>TRACKIT.</span>
          <span>Progress is built one step at a time.</span>
        </footer>
      </div>
    </main>
  );
}