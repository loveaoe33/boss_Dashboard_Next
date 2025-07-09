'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

type Block = {
  id: string;
  color: string;
};

function SortableItem({ id, color }: Block) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 300,
    height: 150,
    backgroundColor: color,
    borderRadius: 16,
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    padding: 20,
    color: 'white',
    fontSize: 24,
    cursor: 'grab',
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {id}
    </div>
  );
}

export default function SortableBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 'block-1', color: '#00BFFF' },
    { id: 'block-2', color: '#FF69B4' },
    { id: 'block-3', color: '#32CD32' },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
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
      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col items-center space-y-6 mt-10">
          {blocks.map((block) => (
            <SortableItem key={block.id} id={block.id} color={block.color} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
