const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { validateLead } = require("../middleware/validateLead");

router.post("/", validateLead, async (req, res, next) => {
  try {
    const { name, email, phone, source } = req.body;

    const lead = await Lead.create({ name, email, phone, source });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {

    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
