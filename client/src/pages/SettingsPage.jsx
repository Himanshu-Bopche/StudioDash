import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "12px" }}>Settings Page</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
        This is a new page created in the app.
      </p>

      <Link
        to="/"
        style={{
          display: "inline-block",
          background: "var(--primary-orange)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Back to API Manager
      </Link>
    </div>
  );
}

export default SettingsPage;
