import { deleteLead } from "../api/leads";
import { useState } from "react";

const SOURCE_COLORS = {
  Website: "tag--blue",
  Facebook: "tag--indigo",
  Google: "tag--red",
  Referral: "tag--green",
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function LeadTable({ leads, onLeadDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete lead for "${name}"?`)) return;

    setDeletingId(id);
    try {
      await deleteLead(id);
      onLeadDeleted();
    } catch (err) {
      alert(err.message || "Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h2 className="table-title">All Leads</h2>
          <p className="table-subtitle">
            {leads.length === 0
              ? "No leads yet"
              : `${leads.length} lead${leads.length !== 1 ? "s" : ""} total`}
          </p>
        </div>
        <div className="table-count-badge">{leads.length}</div>
      </div>

      {leads.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">No leads submitted yet.</p>
          <p className="empty-sub">Fill out the form above to add your first lead.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead._id} className="table-row">
                  <td className="row-number">{index + 1}</td>
                  <td className="lead-name">{lead.name}</td>
                  <td className="lead-email">
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  </td>
                  <td className="lead-phone">{lead.phone}</td>
                  <td>
                    <span className={`tag ${SOURCE_COLORS[lead.source] || "tag--grey"}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="lead-date">{formatDate(lead.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(lead._id, lead.name)}
                      className="delete-btn"
                      disabled={deletingId === lead._id}
                      title="Delete lead"
                    >
                      {deletingId === lead._id ? "…" : "✕"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
