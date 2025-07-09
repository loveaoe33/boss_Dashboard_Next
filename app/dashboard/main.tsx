



export default function mainBlocks() {
  // const [blocks, setBlocks] = useState<Block[]>([
  //   { id: 'block-1', color: '#00BFFF' },
  //   { id: 'block-2', color: '#FF69B4' },
  //   { id: 'block-3', color: '#32CD32' },
  // ]);

  // const sensors = useSensors(useSensor(PointerSensor));

  return (
    <body>
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

      <div className="navbar">
        <h1>商用儀表板</h1>
      </div>

      <div className="content">
        <div className="revenue-summary">
          <div className="revenue-card">
            <div className="revenue-title">今日營收</div>
            <div className="revenue-amount">$12,345</div>
          </div>
          <div className="revenue-card">
            <div className="revenue-title">本週營收</div>
            <div className="revenue-amount">$67,890</div>
          </div>
          <div className="revenue-card">
            <div className="revenue-title">本月累積營收</div>
            <div className="revenue-amount">$123,456</div>
          </div>
          <div className="revenue-card">
            <div className="revenue-title">上月累積營收</div>
            <div className="revenue-amount">$123,456</div>
          </div>
          <div className="revenue-card">
            <div className="revenue-title">年度累積營收</div>
            <div className="revenue-amount">$123,456</div>
          </div>

          <h2>歡迎來到儀表板</h2>
          <p>這裡是你的商業數據分析中心。</p>


        </div>
      </div>
    </body>

  );
}






// <script>
// document.addEventListener("DOMContentLoaded", function () {
//     const sidebar = document.querySelector(".sidebar");
//     const toggleBtn = document.getElementById("toggle-btn");
//     const resizeHandle = document.querySelector(".resize-handle");
//     const submenuItems = document.querySelectorAll(".has-submenu > a");

//     // 側邊欄折疊
//     toggleBtn.addEventListener("click", function () {
//         sidebar.classList.toggle("collapsed");
//     });

//     // 可調整側邊欄寬度
//     let isResizing = false;
//     resizeHandle.addEventListener("mousedown", function (e) {
//         isResizing = true;
//         document.addEventListener("mousemove", resize);
//         document.addEventListener("mouseup", stopResize);
//     });

//     function resize(e) {
//         if (isResizing) {
//             let newWidth = Math.max(70, Math.min(400, e.clientX));
//             sidebar.style.width = newWidth + "px";
//         }
//     }

//     function stopResize() {
//         isResizing = false;
//         document.removeEventListener("mousemove", resize);
//         document.removeEventListener("mouseup", stopResize);
//     }

//     // 子選單展開/收起
//     submenuItems.forEach(item => {
//         item.addEventListener("click", function (e) {
//             e.preventDefault();
//             this.nextElementSibling.classList.toggle("open");
//         });
//     });
// });


// </script>