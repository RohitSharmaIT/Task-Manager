import { Task, Priority } from '@/types/task';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Flame, Zap, Leaf } from 'lucide-react';

interface PriorityColumnProps {
  priority: Priority;
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

const priorityConfig = {
  high: {
    label: 'High Priority',
    icon: Flame,
    headerClass: 'bg-priority-high/10 border-priority-high/30',
    iconClass: 'text-priority-high',
    countClass: 'bg-priority-high text-primary-foreground',
  },
  medium: {
    label: 'Medium Priority',
    icon: Zap,
    headerClass: 'bg-priority-medium/10 border-priority-medium/30',
    iconClass: 'text-priority-medium',
    countClass: 'bg-priority-medium text-primary-foreground',
  },
  low: {
    label: 'Low Priority',
    icon: Leaf,
    headerClass: 'bg-priority-low/10 border-priority-low/30',
    iconClass: 'text-priority-low',
    countClass: 'bg-priority-low text-primary-foreground',
  },
};

export const PriorityColumn = ({
  priority,
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
  onView,
}: PriorityColumnProps) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full">
      <div
        className={cn(
          'flex items-center gap-2 p-3 rounded-lg border mb-4',
          config.headerClass
        )}
      >
        <Icon className={cn('h-5 w-5', config.iconClass)} />
        <h2 className="font-semibold text-foreground">{config.label}</h2>
        <span className={cn('ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold', config.countClass)}>
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))
        )}
      </div>
    </div>
  );
};
