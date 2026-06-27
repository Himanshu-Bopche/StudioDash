import "./Sidebar.css";

function Sidebar({ active }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-layer-group"></i> StudioDash
      </div>

      <ul className="nav-links">
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => (window.location.href = "/")}
        >
          <i className="fa-solid fa-house"></i> Main Dashboard
        </li>

        <li
          className={active === "generate-audio" ? "active" : ""}
          onClick={() => (window.location.href = "/generate-audio")}
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i> Generate Audio
        </li>

        <li
          className={active === "history" ? "active" : ""}
          onClick={() => (window.location.href = "/history")}
        >
          <i className="fa-solid fa-clock-rotate-left"></i> Generated History
        </li>

        <li
          className={active === "youtube-overview" ? "active" : ""}
          onClick={() => (window.location.href = "/youtube-overview")}
        >
          <i className="fa-brands fa-youtube"></i> YouTube Overview
        </li>

        <li
          className={active === "api-manager" ? "active" : ""}
          onClick={() => (window.location.href = "/api-manager")}
        >
          <i className="fa-solid fa-key"></i> API Manager
        </li>

        <li
          className={active === "settings" ? "active" : ""}
          onClick={() => (window.location.href = "/settings")}
        >
          <i className="fa-solid fa-gear"></i> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;