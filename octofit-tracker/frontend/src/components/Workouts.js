import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading workouts...</p>
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
          <h2 className="mb-0">💪 Workouts</h2>
          <span className="badge bg-light text-dark fs-6">{workouts.length} record{workouts.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {workouts.length === 0 ? (
            <p className="p-4 text-muted mb-0">No workouts found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Workout Name</th>
                    <th>Description</th>
                    <th>Duration (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout._id || workout.id || index}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td className="fw-semibold" style={{ minWidth: '180px' }}>
                        {workout.name || <span className="text-muted">N/A</span>}
                      </td>
                      <td style={{ minWidth: '240px', maxWidth: '420px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {workout.description || <span className="text-muted">N/A</span>}
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {workout.duration != null
                          ? <span className="badge bg-danger">{Math.round(workout.duration)} min</span>
                          : <span className="text-muted">N/A</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
