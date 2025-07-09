
'use client';

import ReactFrappeGantt from 'react-frappe-gantt';

const ganttTasks = [
  {
    id: 'Task 1',
    name: '設計階段',
    start: '2025-07-01',
    end: '2025-07-07',
    progress: 30,
  },
  {
    id: 'Task 2',
    name: '開發階段',
    start: '2025-07-08',
    end: '2025-07-15',
    progress: 50,
  },
];

export default function ChartPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">甘特圖</h2>
      <div className="bg-white shadow rounded">
        <ReactFrappeGantt
          tasks={ganttTasks}
          viewMode="Day"
          onClick={(task) => console.log('點擊任務', task)}
          onDateChange={(task, start, end) => {
            console.log('時間變更', task, start, end);
          }}
        />
      </div>
    </div>
  );
}
