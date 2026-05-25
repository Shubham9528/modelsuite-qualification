const STATUS_CLASS = {
  Open: 'status-Open',
  Claimed: 'status-Claimed',
  Submitted: 'status-Submitted',
  Approved: 'status-Approved',
  Rejected: 'status-Rejected',
};

// Displays the talent's already-claimed/active tasks as a flat list
// Intentional gap: no grouping by status — Approved and Rejected mixed with active tasks
const MyTasksList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-card">
        You haven&apos;t claimed any tasks yet. Go grab one above!
      </div>
    );
  }

  return (
    <div className="my-tasks-list">
      {tasks.map((task) => (
        <div key={task._id} className="my-task-row">
          <div className="my-task-info">
            <p className="my-task-title">{task.title || 'Untitled Task'}</p>
            {/* Intentional gap: raw dueDate string, no formatting */}
            <p className="my-task-due">
              {task.dueDate ? `Due: ${task.dueDate}` : 'No due date set'}
            </p>
          </div>
          {task.status ? (
            <span className={`status-pill ${STATUS_CLASS[task.status] || ''}`}>
              {task.status}
            </span>
          ) : (
            // Intentional gap: undefined status renders silently with no warning to the user
            <span className="status-pill" style={{ background: '#2e2a4a', color: '#5e5a82', border: '1px solid #3a3660' }}>
              —
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTasksList;
