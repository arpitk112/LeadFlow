
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const fetchLeads = async () => {
  const response = await fetch(`${API_URL}/leads`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch leads");
  }

  return data.data;
};

export const createLead = async (leadData) => {
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to create lead");
    error.errors = data.errors || [];
    throw error;
  }

  return data.data;
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_URL}/leads/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete lead");
  }

  return data.data;
};
