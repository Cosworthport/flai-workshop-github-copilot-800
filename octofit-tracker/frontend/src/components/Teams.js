import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading teams...</p>
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
          <h2 className="mb-0">🏆 Teams</h2>
          <span className="badge bg-light text-dark fs-6">{teams.length} record{teams.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {teams.length === 0 ? (
            <p className="p-4 text-muted mb-0">No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Member Count</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const members = Array.isArray(team.members) ? team.members : [];
                    return (
                      <tr key={team._id || team.id || index}>
                        <td><span className="badge bg-secondary">{index + 1}</span></td>
                        <td className="fw-semibold">{team.name || <span className="text-muted">N/A</span>}</td>
                        <td>
                          {members.length > 0
                            ? members.map((m, i) => (
                                <span key={i} className="badge bg-success me-1 mb-1">
                                  {m.name || m.username || String(m)}
                                </span>
                              ))
                            : <span className="text-muted">No members</span>}
                        </td>
                        <td>
                          <span className="badge bg-primary fs-6">{members.length}</span>
                        </td>
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

export default Teams;
