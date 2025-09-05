'use client';

import React, { useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

const initialTasks: Task[] = [
  {
    start: new Date('2025-07-01'),
    end: new Date('2025-07-07'),
    name: '設計階段',
    id: 'Task1',
    type: 'task',
    progress: 30,
    isDisabled: false,
    styles: {
      progressColor: '#76c7c0',
      progressSelectedColor: '#4a9d95',
    },
  },
  {
    start: new Date('2025-07-08'),
    end: new Date('2025-07-15'),
    name: '開發階段',
    id: 'Task2',
    type: 'task',
    progress: 50,
    isDisabled: false,
  },
  {
    start: new Date('2025-07-16'),
    end: new Date('2025-07-20'),
    name: '測試階段',
    id: 'Task3',
    type: 'task',
    progress: 10,
    isDisabled: false,
  },
];


type props = {
  title: string;
  compare: boolean;
  compareType: string;
  jsonString: string;
}


export default function ChartPage({ title, compare, compareType, jsonString }: props) {


  const [amountData, setAmountdata] = React.useState(() => ({
    title,
    compare,
    compareType,
    jsonString,
  }));

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDateChange = (task: Task, start: Date, end: Date) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, start, end } : t
    );
    setTasks(updatedTasks);
    console.log('日期更新:', task.name, start.toDateString(), '→', end.toDateString());
  };

  const handleClick = (task: Task) => {
    alert(`點擊任務: ${task.name}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 專案甘特圖</h2>
      <div className="bg-white shadow rounded p-4">
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Day}
          onClick={handleClick}
          locale="zh-TW"
        />
      </div>
    </div>
  );
}
