// src/pages/ApiManager.jsx
import "./ApiManager.css";
function ApiManager() {
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
            borderRadius: "50%",
            width: "40px",
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
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            You have{" "}
            <strong
              id="apiCount"
              style={{
                color: "var(--primary-orange)",
              }}
            >
              2
            </strong>{" "}
            active keys.
          </p>
        </div>

        <button className="btn-primary">
          <i className="fa-solid fa-plus"></i>
          {" "}Add New API Key
        </button>
      </div>

      <div className="api-grid" id="apiGrid">
        {/* Card 1 */}

        <div className="api-card">
          <div className="api-card-header">
            <div className="api-title">
              <i
                className="fa-solid fa-microphone-lines"
                style={{
                  color: "var(--primary-orange)",
                }}
              ></i>

              {" "}ElevenLabs - Main Acct
            </div>

            <span className="api-status">Active</span>
          </div>

          <div className="api-key-box">
            <input
              type="password"
              value="sk_eleven_9876543210abcdef"
              readOnly
            />

            <button className="icon-btn" title="Copy Key">
              <i className="fa-regular fa-copy"></i>
            </button>

            <button className="icon-btn" title="Show/Hide Key">
              <i className="fa-regular fa-eye"></i>
            </button>
          </div>

          <div className="api-actions">
            <button className="icon-btn delete" title="Delete Key">
              <i className="fa-solid fa-trash"></i>
              {" "}Delete
            </button>
          </div>
        </div>

        {/* Card 2 */}

        <div className="api-card">
          <div className="api-card-header">
            <div className="api-title">
              <i
                className="fa-solid fa-microphone-lines"
                style={{
                  color: "var(--primary-orange)",
                }}
              ></i>

              {" "}ElevenLabs - Backup
            </div>

            <span
              className="api-status"
              style={{
                backgroundColor: "#f1f5f9",
                color: "#64748b",
              }}
            >
              Inactive
            </span>
          </div>

          <div className="api-key-box">
            <input
              type="password"
              value="sk_eleven_1234567890qwerty"
              readOnly
            />

            <button className="icon-btn" title="Copy Key">
              <i className="fa-regular fa-copy"></i>
            </button>

            <button className="icon-btn" title="Show/Hide Key">
              <i className="fa-regular fa-eye"></i>
            </button>
          </div>

          <div className="api-actions">
            <button className="icon-btn delete" title="Delete Key">
              <i className="fa-solid fa-trash"></i>
              {" "}Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiManager;