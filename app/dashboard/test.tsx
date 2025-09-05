'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { rectSortingStrategy } from '@dnd-kit/sortable';

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';

// 區塊資料型別
type Block = {
  id: string;
  title: string;
  amount: string;
  color?: string;
};

// 拖曳區塊元件：支援 children + 拖曳把手
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '12px',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    background: '#f9f9f9',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        {...listeners}
        style={{
          background: '#ccc',
          padding: '8px 16px',
          cursor: 'grab',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        拖曳排序
      </div>
      {children}
    </div>
  );
}

// 主組件
export default function MainBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', title: '今日營收', amount: '$12,345' },
    { id: '2', title: '本月累積營收', amount: '$123,456' },
    { id: '3', title: '本年累積營收', amount: '$67,890' },
    { id: '4', title: '去年累積營收', amount: '$98,765' },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <main className="min-h-screen bg-gray-100 p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 商業儀表板 - 拖曳區塊</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;

          const oldIndex = blocks.findIndex((b) => b.id === active.id);
          const newIndex = blocks.findIndex((b) => b.id === over.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            setBlocks((items) => arrayMove(items, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={blocks.map((b) => b.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => (
              <SortableItem key={block.id} id={block.id}>
                <div
                  className="p-6 text-white"
                  style={{
                    backgroundColor: block.color,
                    borderRadius: '0 0 16px 16px',
                  }}
                >
                  <div className="text-lg font-semibold">{block.title}</div>
                  <div className="text-2xl mt-2">{block.amount}</div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <p className="mt-10 text-gray-600">拖曳上方灰色區塊可調整順序。</p>
    </main>
  );
}
