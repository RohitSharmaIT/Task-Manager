import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar, Flag, Clock, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskDetailsProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onToggleStatus: (id: string) => void;
}

const priorityConfig = {
  high: {
    label: 'High Priority',
    className: 'bg-priority-high/20 text-priority-high border-priority-high/30',
    icon: '🔴',
  },
  medium: {
    label: 'Medium Priority',
    className: 'bg-priority-medium/20 text-priority-medium border-priority-medium/30',
    icon: '🟡',
  },
  low: {
    label: 'Low Priority',
    className: 'bg-priority-low/20 text-priority-low border-priority-low/30',
    icon: '🟢',
  },
};

export const TaskDetails = ({ task, open, onClose, onEdit, onToggleStatus }: TaskDetailsProps) => {
  if (!task) return null;

  const config = priorityConfig[task.priority];
  const isCompleted = task.status === 'completed';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] glass">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggleStatus(task.id)}
              className="mt-1 transition-transform hover:scale-110"
            >
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-status-completed" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
            </button>
            <div className="flex-1">
              <DialogTitle
                className={cn(
                  'text-xl font-bold mb-2',
                  isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {task.title}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={config.className}>
                  <Flag className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    isCompleted
                      ? 'bg-status-completed/20 text-status-completed border-status-completed/30'
                      : 'bg-status-pending/20 text-status-pending border-status-pending/30'
                  )}
                >
                  {isCompleted ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
            <p className="text-foreground leading-relaxed">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Due Date</span>
              </div>
              <p className="text-foreground font-semibold">
                {format(new Date(task.dueDate), 'MMMM d, yyyy')}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-foreground font-semibold">
                {format(new Date(task.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(task)}>Edit Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
