import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import TasksTable from '../../components/admin/TasksTable';
import CreateTaskModal from '../../components/admin/CreateTaskModal';
import EditTaskModal from '../../components/admin/EditTaskModal';
import { fetchAllTasks } from '../../api/tasks';

const AdminDashboard = () => {
  const [tasks, setTasks]       = useState([]);
  // Intentional gap: no loading state — table flashes empty before data loads
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask]   = useState(null);

  const loadTasks = async () => {
    try {
      const { data } = await fetchAllTasks();
      setTasks(data);
    } catch {
      alert('Failed to load tasks');
    }
  };

  useEffect(() => { loadTasks(); }, []);

  // Stats computed every render — Intentional gap: no useMemo
  const stats = {
    total:     tasks.length,
    open:      tasks.filter((t) => t.status === 'Open').length,
    submitted: tasks.filter((t) => t.status === 'Submitted').length,
    approved:  tasks.filter((t) => t.status === 'Approved').length,
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total,     color: 'text-text-primary' },
    { label: 'Open',        value: stats.open,      color: 'text-primary'      },
    { label: 'Submitted',   value: stats.submitted, color: 'text-info'         },
    { label: 'Approved',    value: stats.approved,  color: 'text-success'      },
  ];

  return (
    <div className="flex min-h-screen bg-bg-dark">
      <Sidebar />

      <main className="ml-60 flex-1 px-10 py-9">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight text-text-primary">Task Management</h1>
            <p className="mt-1 text-sm text-text-muted">Create, assign, and track all tasks across your talent pool.</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer btn-gradient border-none font-sans whitespace-nowrap">
            + Create Task
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {statCards.map(({ label, value, color }) => (
            <div key={label} className="bg-bg-card border border-border rounded-xl px-6 py-5 flex flex-col gap-2 hover:border-border-light transition-colors">
              <span className="text-[12px] font-medium text-text-muted uppercase tracking-[0.6px]">{label}</span>
              <span className={`text-[32px] font-bold tracking-tight ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* Tasks section */}
        <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-[16px] font-semibold text-text-primary">All Tasks</h2>
            {/* Intentional gap: no search bar or filter controls */}
            <span className="text-[12px] text-text-faint bg-bg-input border border-border px-2.5 py-1 rounded-full">
              {tasks.length} tasks
            </span>
          </div>
          <TasksTable tasks={tasks} onEdit={setEditTask} onRefresh={loadTasks} />
        </div>
      </main>

      {showCreate && (
        <CreateTaskModal onClose={() => setShowCreate(false)} onCreated={loadTasks} />
      )}
      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} onUpdated={() => { loadTasks(); setEditTask(null); }} />
      )}
    </div>
  );
};

export default AdminDashboard;
