import React, { useState, useEffect } from 'react';

const rankClass = (rank) => {
  if (rank === 1) return 'rank-badge rank-gold';
  if (rank === 2) return 'rank-badge rank-silver';
  if (rank === 3) return 'rank-badge rank-bronze';
  return 'rank-badge rank-other';
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setEntries(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <strong>Error:&nbsp;</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card section-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">📊 Leaderboard</h2>
          <span className="badge bg-light text-dark fs-6">{entries.length} record{entries.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {entries.length === 0 ? (
            <p className="p-4 text-muted mb-0">No leaderboard entries found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Members</th>
                    <th>Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => {
                    const rank = index + 1;
                    const teamName = entry.team?.name || entry.team || null;
                    const members = Array.isArray(entry.team?.members) ? entry.team.members : [];
                    return (
                      <tr key={entry._id || entry.id || index}>
                        <td><span className={rankClass(rank)}>{rank}</span></td>
                        <td className="fw-semibold">{teamName || <span className="text-muted">N/A</span>}</td>
                        <td>
                          {members.length > 0
                            ? members.map((m, i) => (
                                <span key={i} className="badge bg-success me-1 mb-1">
                                  {m.name || m.username || String(m)}
                                </span>
                              ))
                            : <span className="text-muted">No members</span>}
                        </td>
                        <td><span className="badge bg-info text-dark fs-6">{entry.score != null ? entry.score : 'N/A'}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
