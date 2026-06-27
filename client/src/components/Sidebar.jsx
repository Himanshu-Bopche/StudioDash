// src/components/Sidebar.jsx
import "./Sidebar.css";

function Sidebar() {
  return (
    <>
          <div className="sidebar">
        <div className="logo">
            <i className="fa-solid fa-layer-group"></i> StudioDash
        </div>
        <ul className="nav-links">
            <li onClick={() => (window.location.href = "index.html")}><i className="fa-solid fa-house"></i> Main Dashboard</li>
            <li onClick={() => (window.location.href = "generate-audio.html")}><i className="fa-solid fa-wand-magic-sparkles"></i> Generate Audio</li>
            <li onClick={() => (window.location.href = "history.html")}><i className="fa-solid fa-clock-rotate-left"></i> Generated History</li>
            <li onClick={() => (window.location.href = "youtube-overview.html")}><i className="fa-brands fa-youtube"></i> YouTube Overview</li>
            <li className="active"><i className="fa-solid fa-key"></i> API Manager</li>
            <li onClick={() => (window.location.href = "settings.html")}><i className="fa-solid fa-gear"></i> Settings</li>
        </ul>
    </div>
    </>
  );
}

export default Sidebar;