// src/components/Sidebar.jsx

import "./Sidebar.css";

function Sidebar() {
  return (
    <>
          <div class="sidebar">
        <div class="logo">
            <i class="fa-solid fa-layer-group"></i> StudioDash
        </div>
        <ul class="nav-links">
            <li onclick="window.location.href='index.html'"><i class="fa-solid fa-house"></i> Main Dashboard</li>
            <li onclick="window.location.href='generate-audio.html'"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate Audio</li>
            <li onclick="window.location.href='history.html'"><i class="fa-solid fa-clock-rotate-left"></i> Generated History</li>
            <li onclick="window.location.href='youtube-overview.html'"><i class="fa-brands fa-youtube"></i> YouTube Overview</li>
            <li class="active"><i class="fa-solid fa-key"></i> API Manager</li>
            <li onclick="window.location.href='settings.html'"><i class="fa-solid fa-gear"></i> Settings</li>
        </ul>
    </div>
    </>
  );
}

export default Sidebar;