import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const features = [
  { to: '/users',       icon: '👤', title: 'Users',       desc: 'View and manage all registered OctoFit members.',         btnClass: 'btn-primary' },
  { to: '/teams',       icon: '🏆', title: 'Teams',       desc: 'Browse teams and see who trains together.',               btnClass: 'btn-success' },
  { to: '/activities',  icon: '🏃', title: 'Activities',  desc: 'Log and review fitness activities across the community.', btnClass: 'btn-warning' },
  { to: '/workouts',    icon: '💪', title: 'Workouts',    desc: 'Explore personalised workout suggestions.',               btnClass: 'btn-danger'  },
  { to: '/leaderboard', icon: '📊', title: 'Leaderboard', desc: 'See who is leading the pack in the competitive rankings.', btnClass: 'btn-info'    },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <div className="octofit-hero text-center">
        <img
          src="/octofitapp-small.png"
          alt="OctoFit Tracker"
          className="img-fluid mb-3"
          style={{ maxHeight: '120px' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker</h1>
        <p className="lead mt-2">
          Track your fitness activities, compete on the leaderboard, and manage your team.
        </p>
      </div>

      {/* Feature cards */}
      <div className="container mb-5">
        <div className="row g-4">
          {features.map((f) => (
            <div key={f.to} className="col-12 col-sm-6 col-lg-4">
              <Link to={f.to} className="feature-card-link">
                <div className="card feature-card h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="feature-icon">{f.icon}</div>
                    <h5 className="card-title fw-semibold">{f.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{f.desc}</p>
                    <span className={`btn ${f.btnClass} mt-3 align-self-start`}>
                      View {f.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit logo"
              className="navbar-brand-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {features.map((f) => (
                <li key={f.to} className="nav-item">
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={f.to}
                  >
                    {f.icon} {f.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/users"      element={<Users />} />
        <Route path="/teams"      element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts"   element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      {/* Footer */}
      <footer className="text-center text-muted py-4 border-top mt-4">
        <small>© 2026 OctoFit Tracker &mdash; Built with React &amp; Django REST Framework</small>
      </footer>
    </Router>
  );
}

export default App;
