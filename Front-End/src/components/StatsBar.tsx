import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsBarProps {
  stats: {
    total: number;
    pending: number;
    completed: number;
  };
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="glass p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/20">
          <ListTodo className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 rounded-lg bg-status-pending/20">
          <Clock className="h-5 w-5 text-status-pending" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
        </div>
      </div>

      <div className="glass p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 rounded-lg bg-status-completed/20">
          <CheckCircle2 className="h-5 w-5 text-status-completed" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Completed</p>
            <span className="text-sm font-medium text-status-completed">{completionRate}%</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
        </div>
      </div>
    </div>
  );
};
