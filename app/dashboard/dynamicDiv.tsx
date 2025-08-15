'use client';

import React, { useState, useRef, useEffect } from 'react';
import "./css/bi_dyamic.css";

type BlockType = {
  id: number;
  title: string;
};

export default function MainBlocks() {
  const [todayAmount, setTodayAmount] = useState(0);
  const [weekAmount, setWeelAmount] = useState(0);
  const [monthAmount, setMonthAmount] = useState(0);
  const [lastMonthAmount, setLastMonthAmount] = useState(0);
  const [yearAmount, setYearAmount] = useState(0);

  





  const [blocks, setBlocks] = useState<BlockType[]>([
    { id: 1, title: '區塊 1' },
    { id: 2, title: '區塊 2' },
    { id: 3, title: '區塊 3' },
  ]);

  // 用來存每個區塊的 ref，方便監聽與操作 DOM
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // 新增區塊
  const addBlock = () => {
    setBlocks((prev) => [
      ...prev,
      { id: prev.length + 1, title: `區塊 ${prev.length + 1}` },
    ]);
  };

  // 計算並設定每個區塊跨格數的函式
  const updateGridSpan = (blockEl: HTMLDivElement) => {
    if (!containerRef.current) return;

    const grid = getComputedStyle(containerRef.current);
    // 下面抓的是 grid-auto-columns，如果沒設定會是空字串，所以先 fallback
    const colWidth =
      parseFloat(grid.getPropertyValue('grid-auto-columns')) || 150;
    const rowHeight =
      parseFloat(grid.getPropertyValue('grid-auto-rows')) || 150;
    const gap = parseFloat(grid.getPropertyValue('gap')) || 20;

    // 取得區塊寬高
    const width = blockEl.offsetWidth;
    const height = blockEl.offsetHeight;

    const colSpan = Math.max(
      1,
      Math.round((width + gap) / (colWidth + gap))
    );
    const rowSpan = Math.max(
      1,
      Math.round((height + gap) / (rowHeight + gap))
    );

    blockEl.style.gridColumn = `span ${colSpan}`;
    blockEl.style.gridRow = `span ${rowSpan}`;
  };

  // 用 useEffect 監聽 blocks 變化時綁定 ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObservers: ResizeObserver[] = [];

    blocks.forEach((block) => {
      const blockEl = blockRefs.current.get(block.id);
      if (blockEl) {
        // 先更新一次大小
        updateGridSpan(blockEl);

        // 建立監聽器
        const ro = new ResizeObserver(() => {
          updateGridSpan(blockEl);
        });
        ro.observe(blockEl);
        resizeObservers.push(ro);
      }
    });

    // 清除監聽器
    return () => {
      resizeObservers.forEach((ro) => ro.disconnect());
    };
  }, [blocks]);

  return (
    <div className="dyncmic-body" style={{ padding: 20 }}>
      <h1>可拉伸大小且自動排列的區塊容器</h1>
      <button
        onClick={addBlock}
        style={{
          display: 'block',
          margin: '10px auto 30px',
          padding: '10px 24px',
          fontSize: 16,
          backgroundColor: '#3498db',
          border: 'none',
          color: 'white',
          borderRadius: 6,
          cursor: 'pointer',
          transition: 'background-color 0.25s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget.style.backgroundColor = '#2980b9');
        }}
        onMouseOut={(e) => {
          (e.currentTarget.style.backgroundColor = '#3498db');
        }}
      >
        新增區塊
      </button>

      <div
        id="container"
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gridAutoRows: '150px',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {blocks.map(({ id, title }) => (
          <div
            key={id}
            className="dyncmic-block"
            ref={(el) => {
              if (el) {
                blockRefs.current.set(id, el);
              } else {
                blockRefs.current.delete(id);
              }
            }}
            style={{
              minWidth: 150,
              minHeight: 150,
              resize: 'both',
              overflow: 'auto',
              backgroundColor: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none',
              // gridColumn & gridRow 由 ResizeObserver 動態設定
            }}
          >
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: '1.1rem',
                color: '#2c3e50',
                borderBottom: '2px solid #3498db',
                paddingBottom: 6,
                userSelect: 'text',
              }}
            >
              {title}
            </h2>
            <textarea
              placeholder="輸入內容..."
              style={{
                flexGrow: 1,
                resize: 'none',
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 8,
                fontSize: 16,
                fontFamily: 'monospace',
                backgroundColor: '#fafafa',
                outlineColor: '#3498db',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
