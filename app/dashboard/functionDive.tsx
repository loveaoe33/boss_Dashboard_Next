'use client';
import "./css/bi_function.css"


import React from 'react';
export default function MainBlocks() {
  return (
    <>
      <div className='function-body'>
        <div className="function-panel">
          <button className="btn btn-default">➕ 新增</button>
          <button className="btn btn-secondary">✏️ 編輯</button>
          <button className="btn btn-danger">🗑️ 刪除</button>
          <button className="btn btn-outline">📤 匯出</button>
          <button className="btn btn-ghost">🔄 重新整理</button>
        </div>
      </div>
    </>
    )
};
