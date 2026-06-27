// src/pages/ApiManager.jsx

import { useEffect, useState } from "react";
import "./ApiManager.css";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL || "/api/keys";

function ApiManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [newApiLabel, setNewApiLabel] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [apiList, setApiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

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

  const showToast = (message, type = "success") => {
    setToast({ show: true, type, message });
    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewApiLabel("");
    setNewApiKey("");
  };

  const handleSaveApi = async () => {
    if (submitting) return;

    if (!newApiLabel.trim() || !newApiKey.trim()) {
      showToast("Please fill in both fields", "error");
      return;
    }

    setSubmitting(true);

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
        showToast("API key added successfully", "success");
      } else {
        showToast(result.message || "Unable to save API key", "error");
      }
    } catch (error) {
      console.error("Failed to save API key", error);
      showToast("Unable to save API key right now", "error");
    } finally {
      setSubmitting(false);
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
      showToast("API Key copied!", "success");
    } catch (error) {
      console.error("Copy failed", error);
      showToast("Copy failed. Please try again.", "error");
    }
  };

  const handleDeleteApi = async (id) => {
    if (deletingId) return;

    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        setApiList((prev) => prev.filter((item) => item.id !== id));
        showToast("API key deleted successfully", "success");
      } else {
        showToast(result.message || "Unable to delete API key", "error");
      }
    } catch (error) {
      console.error("Failed to delete API key", error);
      showToast("Unable to delete API key right now", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
     <div className="app-shell">
      <Sidebar active="api-manager" />
      <main className="main-content">
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
                <button
                  className="icon-btn delete"
                  onClick={() => handleDeleteApi(api.id)}
                  disabled={deletingId === api.id}
                >
                  <i className="fa-solid fa-trash"></i>
                  {" "}{deletingId === api.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast.show && (
        <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          <i className={`fa-solid ${toast.type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}`}></i>
          <span>{toast.message}</span>
        </div>
      )}

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span>
                <i className="fa-solid fa-key" style={{ color: "var(--primary-orange)" }}></i>{" "}
                Add New API Key
              </span>

              <button type="button" className="icon-btn" onClick={handleClosePopup}>
                <i className="fa-solid fa-xmark" style={{ fontSize: "20px" }}></i>
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="apiLabel">API Provider / Label</label>
              <input
                id="apiLabel"
                type="text"
                className="form-control"
                placeholder="e.g., ElevenLabs - Project X"
                value={newApiLabel}
                onChange={(e) => setNewApiLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveApi()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apiValue">Secret API Key</label>
              <input
                id="apiValue"
                type="text"
                className="form-control"
                placeholder="sk_..."
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveApi()}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleClosePopup}>
                Cancel
              </button>

              <button type="button" className="btn-primary" onClick={handleSaveApi} disabled={submitting}>
                {submitting ? "Saving..." : "Save API Key"}
              </button>
            </div>
          </div>
        </div>
      )}
     </main>
    </div>
  );
}

export default ApiManager;