'use client';

import "./css/bi_main.css";
import DynamicDiv from './dynamicDiv';
import FunctionDiv from "./functionDiv";
import AddModal from "./modal/addModal";

import { rectSortingStrategy } from '@dnd-kit/sortable';

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
import React from 'react';

// 型別定義
type Block = {
  id: string;
  title: string;
  amount: string;
  color?: string;
};

// SortableItem 支援 children 的版本
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
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
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}


export type dateObject = {
  startDate: string;
  endEdate: string;
  compareStartDate: string;
  compareEndDate: string;
}

export type selectObject = {
  sqlCheckbox: string[];
  chartType: string;
  compareRadio: string;
  compareType: dateObject;
}

export type initModalCase = {
  checkbox: string[];
  chartType: string[];
}



export const initialSelectObject: selectObject = {
  sqlCheckbox: [],
  chartType: "",
  compareRadio: "",
  compareType: {
    startDate: "",
    endEdate: "",
    compareStartDate: "",
    compareEndDate: "",
  },
};

export const initalModalCase: initModalCase = {
  checkbox: ["A", "B", "C"],
  chartType: ["line", "bar", "pie"]
}

// 主組件
export default function MainBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', title: '今日營收555', amount: '$12,345' },
    { id: '2', title: '本週營收', amount: '$67,890' },
    { id: '3', title: '本月累積營收', amount: '$123,456' },
    { id: '4', title: '上月累積營收', amount: '$123,456' },
    { id: '5', title: '年度累積營收', amount: '$123,456' },
  ]);

  const dateCompare = (dates: dateObject) => {   //compare dates
    const startDate = new Date(dates.startDate);
    const endEdate = new Date(dates.endEdate);
    const compareStartDate = new Date(dates.compareStartDate);
    const compareEndDate = new Date(dates.compareEndDate);

    if (isNaN(startDate.getTime()) || isNaN(endEdate.getTime()) || isNaN(compareStartDate.getTime()) || isNaN(compareEndDate.getTime())) {
      return false; // if date Format is invalid return false
    }

    // 檢查起始日期不能大於結束日期
    if (startDate > endEdate) return false;
    if (compareStartDate > compareEndDate) return false;

    return true; // 通過檢查

  }

  const clearSelectObject = ():void=> {
    setselectObjectData(initialSelectObject);
  }

  const addTempSelectObject = ():void=> {
     const jsonString=JSON.stringify(selectObjectData);
     clearSelectObject();
     setPostJson(jsonString);

  }


  const [selectObjectData, setselectObjectData] = useState<selectObject>(initialSelectObject);
  const [sqlWhere, setSqlWhere] = useState<initModalCase>(initalModalCase);
  const [postJson, setPostJson] = useState<string>("");

  const sensors = useSensors(useSensor(PointerSensor));
  return (
    <>
      {/* 側邊欄 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>儀表板</h2>
          <button id="toggle-btn">☰</button>
        </div>
        <ul className="menu">
          <li><a href="#">📊 儀表板</a></li>
          <li className="has-submenu">
            <a href="#">📦 訂單管理 ▾</a>
            <ul className="submenu">
              <li><a href="#">📝 新增訂單</a></li>
              <li><a href="#">📂 訂單列表</a></li>
              <li><a href="#">🚚 出貨管理</a></li>
            </ul>
          </li>
          <li className="has-submenu">
            <a href="#">📈 報表分析 ▾</a>
            <ul className="submenu">
              <li><a href="#">📊 每日報表</a></li>
              <li><a href="#">📅 月度報告</a></li>
            </ul>
          </li>
          <li><a href="#">👤 使用者管理</a></li>
          <li><a href="#">⚙ 設定</a></li>
        </ul>
        <div className="resize-handle"></div>
      </div>

      {/* 導覽列 */}
      <div className="navbar">
        <h1>商用儀表板</h1>
      </div>

      {/* 主要內容區 */}
      <div className="content">
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
            <div className="revenue-summary grid grid-cols-1 gap-4 p-6 " >
              {blocks.map((block) => (
                <SortableItem key={block.id} id={block.id}>
                  <div
                    className="revenue-card"
                    style={{
                      width: 300,
                      height: 150,
                      backgroundColor: block.color,
                      borderRadius: 16,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                      padding: 20,
                      color: 'white',
                      fontSize: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="revenue-title">{block.title}</div>
                    <div className="revenue-amount mt-2">{block.amount}</div>
                  </div>
                </SortableItem>
              ))}
            </div>


          </SortableContext>
        </DndContext>
        <div className="middle-function-body">
          {postJson}
          <FunctionDiv addTempSelectObject={addTempSelectObject} selectObjectData={selectObjectData} setselectObjectData={setselectObjectData} sqlWhere={sqlWhere}  />
        </div>
        <div className="middel-chart-body">

        </div>
      </div>

    </>
  );
}
