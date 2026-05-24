require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const leadRoutes = require("./routes/leads");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Lead Management API is running" });
});

app.use("/api/leads", leadRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
