// src/pages/ApiManager.jsx

import { useEffect, useState } from "react";
import "./ApiManager.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/keys";

function ApiManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [newApiLabel, setNewApiLabel] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [apiList, setApiList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApiKeys = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setApiList((result.data || []).map((item) => ({ ...item, visible: false })));
      }
    } catch (error) {
      console.error("Failed to load API keys", error);
      setApiList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewApiLabel("");
    setNewApiKey("");
  };

  const handleSaveApi = async () => {
    if (!newApiLabel.trim() || !newApiKey.trim()) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: newApiLabel,
          key: newApiKey,
          provider: "ElevenLabs",
          active: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setApiList((prev) => [{ ...result.data, visible: false }, ...prev]);
        handleClosePopup();
      } else {
        alert(result.message || "Unable to save API key");
      }
    } catch (error) {
      console.error("Failed to save API key", error);
      alert("Unable to save API key right now");
    }
  };

  const handleToggleKey = (id) => {
    setApiList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  const handleCopyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      alert("API Key copied!");
    } catch (error) {
      console.error("Copy failed", error);
      alert("Copy failed. Please try again.");
    }
  };

  const handleDeleteApi = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        setApiList((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message || "Unable to delete API key");
      }
    } catch (error) {
      console.error("Failed to delete API key", error);
      alert("Unable to delete API key right now");
    }
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

      {loading ? (
        <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>Loading API keys...</p>
      ) : (
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
                <input type={api.visible ? "text" : "password"} value={api.key} readOnly />

                <button className="icon-btn" title="Copy Key" onClick={() => handleCopyKey(api.key)}>
                  <i className="fa-regular fa-copy"></i>
                </button>

                <button className="icon-btn" title="Show / Hide" onClick={() => handleToggleKey(api.id)}>
                  <i className={`fa-regular ${api.visible ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>

              <div className="api-actions">
                <button className="icon-btn delete" onClick={() => handleDeleteApi(api.id)}>
                  <i className="fa-solid fa-trash"></i>
                  {" "}Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add API Key</h2>

            <input
              type="text"
              placeholder="API Label"
              value={newApiLabel}
              onChange={(e) => setNewApiLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveApi()}
            />

            <input
              type="text"
              placeholder="API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveApi()}
            />

            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveApi}>
                Save
              </button>

              <button className="btn-secondary" onClick={handleClosePopup}>
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