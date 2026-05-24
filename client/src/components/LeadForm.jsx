import { useState } from "react";
import { createLead } from "../api/leads";

const SOURCES = ["Website", "Facebook", "Google", "Referral"];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  source: "",
};

const validate = (fields) => {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Full name is required";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(fields.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!fields.source) {
    errors.source = "Please select a source";
  }

  return errors;
};

export default function LeadForm({ onLeadCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccessMsg("");

    try {
      const newLead = await createLead(form);
      setSuccessMsg(`✅ Lead for "${newLead.name}" added successfully!`);
      setForm(INITIAL_FORM);
      setErrors({});
      onLeadCreated();
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        setServerError(err.errors.join(" • "));
      } else {
        setServerError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-header-icon">✦</div>
        <div>
          <h2 className="form-title">Add New Lead</h2>
          <p className="form-subtitle">Fill in the details to register a lead</p>
        </div>
      </div>

      {serverError && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠</span>
          {serverError}
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success" role="status">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field-group">
            <label className="field-label" htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Arpit Kumar"
              value={form.name}
              onChange={handleChange}
              className={`field-input ${errors.name ? "field-input--error" : ""}`}
              disabled={loading}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. arpit@example.com"
              value={form.email}
              onChange={handleChange}
              className={`field-input ${errors.email ? "field-input--error" : ""}`}
              disabled={loading}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              className={`field-input ${errors.phone ? "field-input--error" : ""}`}
              disabled={loading}
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="source">
              Source <span className="required">*</span>
            </label>
            <select
              id="source"
              name="source"
              value={form.source}
              onChange={handleChange}
              className={`field-input field-select ${errors.source ? "field-input--error" : ""}`}
              disabled={loading}
            >
              <option value="">Select a source...</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.source && <p className="field-error">{errors.source}</p>}
          </div>
        </div>

        <button
          type="submit"
          className={`submit-btn ${loading ? "submit-btn--loading" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            "Submit Lead →"
          )}
        </button>
      </form>
    </div>
  );
}
