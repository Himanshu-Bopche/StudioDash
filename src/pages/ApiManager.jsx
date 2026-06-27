// src/pages/ApiManager.jsx

import { useState } from "react";
import "./ApiManager.css";

function ApiManager() {
  const [showPopup, setShowPopup] = useState(false);

  const [apiList, setApiList] = useState([
    {
      id: 1,
      label: "ElevenLabs - Main Acct",
      key: "sk_eleven_9876543210abcdef",
      active: true,
      visible: false,
    },
  ]);

  // Open Modal
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Close Modal
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Toggle API Key Visibility
  const handleToggleKey = (id) => {
    setApiList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, visible: !item.visible }
          : item
      )
    );
  };

  // Copy API Key
  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    alert("API Key copied!");
  };

  // Delete API
  const handleDeleteApi = (id) => {
    setApiList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>API Manager</h1>

          <p
            style={{
              color: "var(--text-muted)",
              marginTop: "5px",
            }}
          >
            Manage your ElevenLabs and other API keys efficiently.
          </p>
        </div>

        <img
          src="https://ui-avatars.com/api/?name=Admin&background=ea580c&color=fff"
          alt="Profile"
          style={{
            width: "40px",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="action-bar">
        <div>
          <h3
            style={{
              color: "var(--dark-bg)",
            }}
          >
            Connected APIs
          </h3>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
            }}
          >
            You have{" "}
            <strong
              style={{
                color: "var(--primary-orange)",
              }}
            >
              {apiList.length}
            </strong>{" "}
            active keys.
          </p>
        </div>

        <button className="btn-primary" onClick={handleOpenPopup}>
          <i className="fa-solid fa-plus"></i>
          {" "}Add New API Key
        </button>
      </div>

      <div className="api-grid">
        {apiList.map((api) => (
          <div className="api-card" key={api.id}>
            <div className="api-card-header">
              <div className="api-title">
                <i
                  className="fa-solid fa-microphone-lines"
                  style={{ color: "var(--primary-orange)" }}
                ></i>

                {" "}
                {api.label}
              </div>

              <span
                className="api-status"
                style={
                  api.active
                    ? {}
                    : {
                        background: "#f1f5f9",
                        color: "#64748b",
                      }
                }
              >
                {api.active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="api-key-box">
              <input
                type={api.visible ? "text" : "password"}
                value={api.key}
                readOnly
              />

              <button
                className="icon-btn"
                title="Copy Key"
                onClick={() => handleCopyKey(api.key)}
              >
                <i className="fa-regular fa-copy"></i>
              </button>

              <button
                className="icon-btn"
                title="Show / Hide"
                onClick={() => handleToggleKey(api.id)}
              >
                <i
                  className={`fa-regular ${
                    api.visible ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>

            <div className="api-actions">
              <button
                className="icon-btn delete"
                onClick={() => handleDeleteApi(api.id)}
              >
                <i className="fa-solid fa-trash"></i>
                {" "}Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add API Key</h2>

            <input
              type="text"
              placeholder="API Label"
            />

            <input
              type="text"
              placeholder="API Key"
            />

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={handleClosePopup}
              >
                Save
              </button>

              <button
                className="btn-secondary"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApiManager;