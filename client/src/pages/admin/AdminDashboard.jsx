import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import TasksTable from '../../components/admin/TasksTable';
import CreateTaskModal from '../../components/admin/CreateTaskModal';
import EditTaskModal from '../../components/admin/EditTaskModal';
import { fetchAllTasks } from '../../api/tasks';

/* ── Search icon ── */
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8.5" cy="8.5" r="5.5"/>
    <path d="M17 17l-4-4"/>
  </svg>
);

/* ── Plus icon ── */
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 4v12M4 10h12"/>
  </svg>
);

const AdminDashboard = () => {
  const [tasks, setTasks]           = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask]     = useState(null);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage]   = useState(1);
  const [pagination, setPagination]     = useState({ total: 0, totalPages: 1 });
  const [taskStats, setTaskStats]       = useState({ open: 0, submitted: 0, approved: 0 });
  const LIMIT = 10;

  const loadTasks = async (page = currentPage) => {
    try {
      const { data } = await fetchAllTasks(page, LIMIT, search, statusFilter);
      setTasks(data.tasks);
      setPagination(data.pagination);
      setTaskStats(data.stats);
    } catch {
      alert('Failed to load tasks');
    }
  };

  // Re-fetch when page changes
  // eslint-disable-next-line
  useEffect(() => { loadTasks(currentPage); }, [currentPage]);

  // Re-fetch from page 1 when search or status filter changes
  // eslint-disable-next-line
  useEffect(() => { setCurrentPage(1); loadTasks(1); }, [search, statusFilter]);

  const stats = {
    total:     pagination.total,
    open:      taskStats.open,
    submitted: taskStats.submitted,
    approved:  taskStats.approved,
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total,     color: 'text-text-primary' },
    { label: 'Open',        value: stats.open,      color: 'text-info' },
    { label: 'Submitted',   value: stats.submitted, color: 'text-primary' },
    { label: 'Approved',    value: stats.approved,  color: 'text-success' },
  ];


  return (
    <div className="flex min-h-screen bg-bg-dark">
      <Sidebar />

      <main className="ml-[240px] flex-1 px-8 py-8" style={{ maxWidth: 'calc(100vw - 240px)' }}>

        {/* Page header */}
        <div className="flex items-center justify-between mb-7 page-section">
          <div>
            <h1 className="font-display text-[22px] font-semibold tracking-tight text-text-primary">
              Task Management
            </h1>
            <p className="mt-0.5 text-[13px] text-text-muted">
              Create, assign, and track all tasks across your talent pool.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="btn-gradient flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold cursor-pointer font-sans">
            <IconPlus />
            Create Task
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-4 mb-6 page-section">
          {statCards.map(({ label, value, color }) => (
            <div key={label} className="bg-bg-card border border-border rounded-xl px-6 py-5 flex flex-col gap-2 hover:border-border-light transition-colors">
              <span className="text-[12px] font-medium text-text-muted uppercase tracking-[0.6px]">{label}</span>
              <span className={`text-[32px] font-bold tracking-tight ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* Tasks table */}
        <div className="tasks-container page-section">
          {/* Table toolbar */}
          <div className="table-header-bar">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-text-primary font-display">
                All Tasks
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-sans"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-col)',
                }}>
                {pagination.total} {pagination.total === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Search */}
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: '#4B5563' }}>
                  <IconSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search tasks…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input-glass"
                  style={{ minWidth: '180px' }}
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="search-input-glass custom-select"
                style={{ paddingLeft: '12px', cursor: 'pointer' }}>
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Claimed">Claimed</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <TasksTable
            tasks={tasks}
            onEdit={setEditTask}
            onRefresh={() => loadTasks(currentPage)}
            pagination={pagination}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {showCreate && (
        <CreateTaskModal onClose={() => setShowCreate(false)} onCreated={loadTasks} />
      )}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdated={() => { loadTasks(); setEditTask(null); }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
