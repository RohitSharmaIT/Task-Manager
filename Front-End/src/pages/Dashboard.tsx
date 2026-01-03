import { useState } from 'react';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { PriorityColumn } from '@/components/PriorityColumn';
import { TaskForm } from '@/components/TaskForm';
import { TaskDetails } from '@/components/TaskDetails';
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { StatsBar } from '@/components/StatsBar';
import { Plus, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, tasksByPriority, stats } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const handleCreateTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(data);
    toast.success('Task created successfully!');
  };

  const handleUpdateTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      toast.success('Task updated successfully!');
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    setDeletingTask(null);
    toast.success('Task deleted successfully!');
  };

  const handleToggleStatus = (id: string) => {
    toggleStatus(id);
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      toast.success(`Task marked as ${newStatus}`);
    }
  };

  const handleEditFromDetails = (task: Task) => {
    setViewingTask(null);
    setTimeout(() => setEditingTask(task), 200);
  };

  return (
    <div className="min-h-screen bg-background">
     
      <header className="border-b border-border/50 glass sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Task Manager</h1>
                <p className="text-sm text-muted-foreground">Organize your work efficiently</p>
              </div>
            </div>

            <Button onClick={() => setIsFormOpen(true)} className="gap-2 shadow-glow">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <StatsBar stats={stats} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PriorityColumn
            priority="high"
            tasks={tasksByPriority.high}
            onToggleStatus={handleToggleStatus}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onView={setViewingTask}
          />
          <PriorityColumn
            priority="medium"
            tasks={tasksByPriority.medium}
            onToggleStatus={handleToggleStatus}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onView={setViewingTask}
          />
          <PriorityColumn
            priority="low"
            tasks={tasksByPriority.low}
            onToggleStatus={handleToggleStatus}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onView={setViewingTask}
          />
        </div>
      </main>

      
      <TaskForm
        open={isFormOpen || !!editingTask}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialData={editingTask}
      />

      <TaskDetails
        task={viewingTask}
        open={!!viewingTask}
        onClose={() => setViewingTask(null)}
        onEdit={handleEditFromDetails}
        onToggleStatus={handleToggleStatus}
      />

      <DeleteConfirmation
        task={deletingTask}
        open={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
