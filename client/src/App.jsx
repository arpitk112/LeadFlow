import { useState, useEffect, useCallback } from "react";
import LeadForm from "./components/LeadForm";
import LeadTable from "./components/LeadTable";
import { fetchLeads } from "./api/leads";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      setFetchError("Could not load leads. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">◈</span>
            <span className="logo-text">LeadFlow</span>
          </div>
          <p className="header-tagline">Lead Management System</p>
        </div>
      </header>

      <main className="app-main">
        <LeadForm onLeadCreated={loadLeads} />

        {fetchError && (
          <div className="alert alert-error" style={{ marginTop: "1rem" }}>
            <span className="alert-icon">⚠</span> {fetchError}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading leads…</p>
          </div>
        ) : (
          <LeadTable leads={leads} onLeadDeleted={loadLeads} />
        )}
      </main>

      <footer className="app-footer">
        <p>Lead Management System · Arpit Kumar</p>
      </footer>
    </div>
  );
}
