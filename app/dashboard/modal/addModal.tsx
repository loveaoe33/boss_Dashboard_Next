"use client";

import { useState } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import type { selectObject, dateObject, initModalCase } from "../main";

import "../css/bi_addModal.css";
// 修正拼寫為 ModalViewProps，並添加 children（可選）
type boardModal = {
  isClose: () => void;
  isOpen: boolean;
  title: string;
  addTempSelectObject?: React.MouseEventHandler<HTMLButtonElement>;
  selectObjectData: selectObject;
  setselectObjectData?: React.Dispatch<React.SetStateAction<selectObject>>;
  sqlWhere: initModalCase;
};
const viewAlert = () => {
  alert("DDD");
};


const Modal = ReactModal as unknown as React.FC<any>;


// ModalView 組件
const modalView = ({ addTempSelectObject, selectObjectData, setselectObjectData, sqlWhere, isClose, isOpen, title }: boardModal) => {


  if (!isOpen) return null;



  // 可選擇性地在 Modal 打開時調用 viewAlert
  // viewAlert(); // 如果你希望每次 Modal 打開時彈出 alert，取消這行註解


  const errorAlert = (message: string): void => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };


  const successAlert = (message: string): void => {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };


  const handleCheckboxChange = (value: string) => {
    setselectObjectData?.((prev: selectObject): selectObject => {
      const exists = prev.sqlCheckbox.includes(value);
      return {
        ...prev,
        sqlCheckbox: exists
          ? prev.sqlCheckbox.filter(v => v !== value)
          : [...prev.sqlCheckbox, value],
      };
    });
  };



  const handleChartTypeChange = (value: string) => {
    if (setselectObjectData) {
      setselectObjectData({
        ...selectObjectData,
        chartType: value,
      });
    }
  };

  const handleCompareRadioChange = (value: string) => {
    if (setselectObjectData) {
      setselectObjectData({
        ...selectObjectData,
        compareRadio: value,
      });
    }
  };



  const handleDateChange = (field: keyof dateObject, value: string) => {
    setselectObjectData?.((prev: selectObject): selectObject => ({
      ...prev,
      compareType: {
        ...prev.compareType,  // 保留其他欄位
        [field]: value,       // 更新指定欄位
      },
    }));
  };





  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel={title}
      ariaHideApp={false} // 在Next.js中，使用此配置来避免错误
      preventScroll={false}
      className="addModal-modal"

    >
      <button
        onClick={isClose}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '30px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ×
      </button>

      <div className="board-modal-container">
        <h2>{title}</h2>




        <div className="addModal-body">
          <div className="addModal-container">
            <h2>多時間比較 + 日期區間 + 圖表範例</h2>

            <div className="addModal-controls">
              <div className="addModal-filter-section">
                <h3>選擇條件 (模擬 SQL WHERE)</h3>

                {sqlWhere.checkbox.map((checkbox) => (

                  <label key={checkbox}>
                    <input
                      type="checkbox"
                      value={checkbox}
                      checked={selectObjectData.sqlCheckbox.includes(checkbox)}
                      onChange={() => handleCheckboxChange(checkbox)}
                    />
                    {checkbox}
                  </label>
                ))}

                {/* <label><input type="checkbox" value="A" checked /> 類別 A</label>
                <label><input type="checkbox" value="B" checked /> 類別 B</label>
                <label><input type="checkbox" value="C" checked /> 類別 C</label>
                <label><input type="checkbox" value="D" checked /> 類別 D</label> */}
              </div>

              <div className="addModal-filter-section" style={{ flex: "1 1 150px" }}>
                <h3>選擇圖表樣板</h3>

                <select id="chartTypeSelect" aria-label="選擇圖表類型" onChange={(e) => handleChartTypeChange(e.target.value)} value={selectObjectData.chartType}>
                  {sqlWhere.chartType && sqlWhere.chartType.map((chartType: string) => (
                    <option key={chartType} value={chartType}>
                      {chartType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="addModal-filter-section" style={{ flex: "1 1 300px" }}>
                <h3>比較設定</h3>
                <label><input type="radio" id="comparelocalYear" value="localYear" checked={selectObjectData.compareRadio === "localYear"} onChange={(e) => handleCompareRadioChange(e.target.value)} /> 月份成長圖-(選主區間即可)</label>
                <label><input type="radio" id="compareLastYear" value="lastYear" checked={selectObjectData.compareRadio === "lastYear"} onChange={(e) => handleCompareRadioChange(e.target.value)} /> 比較去年-(選主區間即可)</label>
                <label><input type="radio" id="compareOtherDate" value="otherYear" checked={selectObjectData.compareRadio === "otherYear"} onChange={(e) => handleCompareRadioChange(e.target.value)} /> 比較其他日期-(主、副區間選擇)</label>
                <div>
                  <label>主資料日期區間：</label>
                  <div className="date-range">


                    <input type="date" value={selectObjectData.compareType.startDate} onChange={(e) => handleDateChange("startDate", e.target.value)} id="dateFrom" />
                    <input type="date" value={selectObjectData.compareType.endEdate} onChange={(e) => handleDateChange("endEdate", e.target.value)} id="dateTo"  />
                  </div>
                </div>
                <div>
                  <label>其他日期區間 (比較用)：</label>
                  <div className="date-range">
                    <input type="date" id="otherDateFrom" onChange={(e) => handleDateChange("compareStartDate", e.target.value)} value={selectObjectData.compareType.compareStartDate} disabled={selectObjectData.compareRadio!=="otherYear"}/>
                    <input type="date" id="otherDateTo" onChange={(e) => handleDateChange("compareEndDate", e.target.value)} value={selectObjectData.compareType.compareEndDate} disabled={selectObjectData.compareRadio!=="otherYear"}/>
                  </div>
                </div>
              </div>
            </div>
            <button className="plus-Button" onClick={addTempSelectObject}> +</button>
          </div>

        </div>




        {/* <a href="#" className="link">忘記密碼？</a> */}
      </div>
      <ToastContainer />
    </Modal>
  );
};


// export default function view_modal(){
// const [isModalOpen,setModalOpen]=useState(false);
// return( 
//     <div classNameName="flex flex-col items-center justify-center min-h-screen">
//       <button 
//         classNameName="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
//         onClick={() => setModalOpen(true)}
//       >
//         打開 Modal
//       </button>
//       <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="彈出視窗">
//         <p>這是彈出視窗的內容。</p>
//       </Modal>
//     </div>

// )

// }


export default modalView;
