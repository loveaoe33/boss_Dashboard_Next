'use client';

import "./css/bi_main.css";
import DynamicDiv from './dynamicDiv';
import FunctionDiv from "./functionDiv";
import AddModal from "./modal/addModal";
import TestChart from "./testChart";
import TestLineChart from "./testLineChart";
import TestRecharts from "./testRecharts";
import { getDayAmount, getWeekAmount, getYearAmount, getLastYearAmount, getCaseSelectAmount } from "../dashboard/lib/bi_lib"


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
import { useEffect, useState } from 'react';
import React from 'react';

// 型別定義
type Block = {
  id: string;
  title: string;
  amount: string;
  color?: string;
};


type ChartSelect = {
  title: string;
  compare: boolean;
  compareType: string;
  jsonString: string;
};


type ChartItem = {
  type: string
  props: ChartSelect

}


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
  checkbox: ["純自費收益", "健保與自費收益", "門診", "住院", "醫師"],
  chartType: ["line", "bar", "pie"]
}

// 主組件
export default function MainBlocks() {


  const [initAmounts, setInitAmounts] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);




  const dateCompare = (dates: dateObject) => {
    const { startDate, endEdate, compareStartDate, compareEndDate } = dates;
    const toDate = (d: string) => new Date(d);

    const start = toDate(startDate);
    const end = toDate(endEdate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return false;

    if (selectObjectData.compareRadio === "otherYear") {
      const cStart = toDate(compareStartDate);
      const cEnd = toDate(compareEndDate);
      if (isNaN(cStart.getTime()) || isNaN(cEnd.getTime()) || cStart > cEnd) return false;
    }

    return true;
  };

  const clearSelectObject = (): void => {
    setselectObjectData(initialSelectObject);
  }

  const addTempSelectObject = async (): Promise<void> => {
    if (dateCompare(selectObjectData.compareType)) {
      const jsonString = JSON.stringify(selectObjectData);
      clearSelectObject();
      const testChart = await getCaseSelectAmount("http://localhost:8080/BI_Data_Controller/test2", jsonString);
      setPostJson(jsonString);

    } else {

      alert("false");
    }


  }
  const handelClick = (index: number): void => {
    setSelectIndex(index);

  }
  const removeChart = (): void => {
    if (selectIndex !== null) {
      setCharts(prev => prev.filter((_, i) => i !== selectIndex));
      setSelectIndex(null); // 刪除後清除選擇
    }
  };

  const initAmount = async (): Promise<void> => {
    const testAmoint = await getDayAmount("http://localhost:8080/BI_Data_Controller/initAmountData");
    const parts = testAmoint.split("_");
    console.log(parts);
    setInitAmounts(parts);
    console.log(initAmounts);
    const testChart = await getCaseSelectAmount("http://localhost:8080/BI_Data_Controller/test2", "{\"sqlSelect\":\"select * from test\"}");
  }
  const chartsComponents: Record<string, (props: ChartSelect) => JSX.Element> = {
    line: (props) => <TestLineChart
      {...props}
    />,
    reCharts: (props) => <TestRecharts
      {...props} />,
    Chart: (props) => <TestChart
      {...props} />,

  }
  const [charts, setCharts] = useState<ChartItem[]>([{
    type: "line",
    props: {
      title: "第一張圖",
      compare: true,
      compareType: "month",
      jsonString: '{"x":[1,2,3]}',
    },
  },
  {
    type: "reCharts",
    props: {
      title: "第二張圖",
      compare: false,
      compareType: "year",
      jsonString: '{"x":[10,20,30]}',
    },
  },
  ]);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [selectObjectData, setselectObjectData] = useState<selectObject>(initialSelectObject);
  const [sqlWhere, setSqlWhere] = useState<initModalCase>(initalModalCase);
  const [postJson, setPostJson] = useState<string>("");
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    initAmount();
  }, []);
  useEffect(() => {
    console.log("initAmounts 更新後:", initAmounts);
    setBlocks([
      { id: '1', title: '今日應收累計', amount: `$ ${initAmounts[2]}` },
      { id: '2', title: '本月應收累計', amount: `$ ${initAmounts[1]}` },
      { id: '3', title: '本年應收累計', amount: `$ ${initAmounts[0]}` },
      { id: '4', title: '本年實收累計', amount: `$ ${initAmounts[4]}` },
      { id: '5', title: '去年應收累計', amount: `$ ${initAmounts[3]}` },
    ])
  }, [initAmounts]);


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
          <FunctionDiv addTempSelectObject={addTempSelectObject} selectObjectData={selectObjectData} setselectObjectData={setselectObjectData} removeChart={removeChart} sqlWhere={sqlWhere} />
        </div>



        {charts.map((type, index) => (
          <div key={index} className="middel-chart-body" onClick={() => handelClick(index)}>
            {chartsComponents[type.type]?.(type.props) ?? "無開放此圖"}
          </div>
        ))}
      </div>

    </>
  );
}
