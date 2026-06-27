import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />

      <main className="main-content">
        <div className="header">
          <div>
            <h1>Welcome Back!</h1>
            <p className="header-subtitle">Here is what's happening today.</p>
          </div>

          <div className="header-actions">
            <i className="fa-regular fa-bell"></i>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=ea580c&color=fff"
              alt="Profile"
            />
          </div>
        </div>

        <div className="grid-cards">
          <div className="card">
            <div className="card-info">
              <h3>Total Audios Generated</h3>
              <h2>1,248</h2>
            </div>
            <div className="card-icon">
              <i className="fa-solid fa-music"></i>
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <h3>Total Videos Uploaded</h3>
              <h2>342</h2>
            </div>
            <div className="card-icon">
              <i className="fa-solid fa-video"></i>
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <h3>System Storage Used</h3>
              <h2>45.2 GB</h2>
            </div>
            <div className="card-icon">
              <i className="fa-solid fa-hard-drive"></i>
            </div>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="chart-container">
            <h3 className="section-title">Channel Analytics (Last 6 Months)</h3>
            <div className="chart-placeholder" aria-label="Analytics chart placeholder">
              <div className="chart-line chart-line-orange"></div>
              <div className="chart-line chart-line-blue"></div>
              <div className="chart-line chart-line-green"></div>
            </div>
          </div>

          <div className="yt-widget">
            <div className="yt-banner">
              <div className="yt-profile">
                <i className="fa-brands fa-youtube"></i>
              </div>
            </div>

            <div className="yt-info">
              <h3>My Official Channel</h3>
              <div className="yt-stats">
                <span><strong>12.5k</strong> Subscribers</span>
                <span><strong>342</strong> Videos</span>
              </div>
              <p>Latest Video: "How to design a modern dashboard..."</p>
              <button className="yt-btn">Go to YouTube Studio</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;