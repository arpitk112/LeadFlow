const validateLead = (req, res, next) => {
  const { name, email, phone, source } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Full name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!phone || phone.trim() === "") {
    errors.push("Phone number is required");
  } else if (!/^\d{10}$/.test(phone.trim())) {
    errors.push("Phone number must be exactly 10 digits");
  }

  const validSources = ["Website", "Facebook", "Google", "Referral"];
  if (!source || source.trim() === "") {
    errors.push("Source is required");
  } else if (!validSources.includes(source)) {
    errors.push("Source must be one of: Website, Facebook, Google, Referral");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = { validateLead };
