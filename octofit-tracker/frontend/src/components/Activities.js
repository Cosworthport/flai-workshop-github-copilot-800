import React, { useState, useEffect } from 'react';

// Parse an ISO date string (YYYY-MM-DD) without timezone shift
function formatDate(isoString) {
  if (!isoString) return null;
  const [year, month, day] = isoString.split('-').map(Number);
  if (!year || !month || !day) return isoString;
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading activities...</p>
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
          <h2 className="mb-0">🏃 Activities</h2>
          <span className="badge bg-light text-dark fs-6">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {activities.length === 0 ? (
            <p className="p-4 text-muted mb-0">No activities found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity._id || activity.id || index}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td className="fw-semibold">{activity.username || activity.user || <span className="text-muted">N/A</span>}</td>
                      <td><span className="badge bg-warning text-dark">{activity.activity_type || 'N/A'}</span></td>
                      <td>{activity.duration != null ? activity.duration : <span className="text-muted">N/A</span>}</td>
                      <td>{formatDate(activity.date) || <span className="text-muted">N/A</span>}</td>
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

export default Activities;
