declare module 'react-frappe-gantt' {
  import { ComponentType } from 'react';

  interface Task {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies?: string;
    custom_class?: string;
  }

  interface GanttProps {
    tasks: Task[];
    viewMode?: 'Quarter Day' | 'Half Day' | 'Day' | 'Week' | 'Month';
    onClick?: (task: Task) => void;
    onDateChange?: (task: Task, start: Date, end: Date) => void;
    onProgressChange?: (task: Task, progress: number) => void;
    onTasksChange?: (tasks: Task[]) => void;
  }

  const Gantt: ComponentType<GanttProps>;
  export default Gantt;
}
