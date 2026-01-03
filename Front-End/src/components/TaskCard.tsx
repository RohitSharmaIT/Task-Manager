import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Pencil, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isPast, isToday } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

const priorityConfig = {
  high: {
    label: 'High',
    className: 'bg-priority-high/20 text-priority-high border-priority-high/30 hover:bg-priority-high/30',
  },
  medium: {
    label: 'Medium',
    className: 'bg-priority-medium/20 text-priority-medium border-priority-medium/30 hover:bg-priority-medium/30',
  },
  low: {
    label: 'Low',
    className: 'bg-priority-low/20 text-priority-low border-priority-low/30 hover:bg-priority-low/30',
  },
};

export const TaskCard = ({ task, onToggleStatus, onEdit, onDelete, onView }: TaskCardProps) => {
  const dueDate = new Date(task.dueDate);
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && task.status !== 'completed';
  const isDueToday = isToday(dueDate);

  return (
    <Card
      className={cn(
        'group p-4 transition-all duration-200 hover:shadow-lg cursor-pointer glass animate-in',
        task.status === 'completed' && 'opacity-60'
      )}
      onClick={() => onView(task)}
    >
      <div className="flex items-start gap-3">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={() => onToggleStatus(task.id)}
            className="mt-1 h-5 w-5 border-2 data-[state=checked]:bg-status-completed data-[state=checked]:border-status-completed"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={cn(
                'font-semibold text-foreground truncate',
                task.status === 'completed' && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>
            <Badge variant="outline" className={cn('shrink-0', priorityConfig[task.priority].className)}>
              {priorityConfig[task.priority].label}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>

          <div className="flex items-center justify-between">
            <div
              className={cn(
                'flex items-center gap-1.5 text-xs',
                isOverdue && 'text-destructive',
                isDueToday && 'text-priority-medium',
                !isOverdue && !isDueToday && 'text-muted-foreground'
              )}
            >
              {isOverdue ? <Clock className="h-3.5 w-3.5" /> : <Calendar className="h-3.5 w-3.5" />}
              <span>
                {isOverdue ? 'Overdue' : isDueToday ? 'Due today' : format(dueDate, 'MMM d, yyyy')}
              </span>
            </div>

            <div
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(task)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(task)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
