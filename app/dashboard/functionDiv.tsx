'use client';
import "./css/bi_function.css"
import AddModal from "./modal/addModal";
import { selectObject,dateObject,initModalCase} from "../dashboard/main";


import React from 'react';

type props = {
  setselectObjectData?: React.Dispatch<React.SetStateAction<selectObject>>; // 可選的函數來更新選擇的物件
  addTempSelectObject?:()=>void;
  selectObjectData:selectObject
  sqlWhere:initModalCase
}
export default function MainBlocks({addTempSelectObject,selectObjectData,setselectObjectData,sqlWhere}: props) {
  const showAdd_modal = () => {
    setModalOpen(true);
  }

  const [modalOpen, setModalOpen] = React.useState(false);
  const isCloseModal = () => {
    setModalOpen(false);

  }
  return (
    <>
      <div className='function-body'>
        <div className="function-panel">
          <button className="btn btn-default" onClick={showAdd_modal} >➕ 新增</button>
          <button className="btn btn-secondary">✏️ 編輯</button>
          <button className="btn btn-danger">🗑️ 刪除</button>
          <button className="btn btn-outline">📤 匯出</button>
          <button className="btn btn-ghost">🔄 重新整理</button>
        </div>
      </div>
      <AddModal addTempSelectObject={addTempSelectObject} selectObjectData={selectObjectData} setselectObjectData={setselectObjectData} isClose={isCloseModal} sqlWhere={sqlWhere} isOpen={modalOpen} title={""} />

    </>
  )
};
