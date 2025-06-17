const express = require("express");
const router = express.Router();
const FollowUp = require("../models/followUp");

router.post("/schedule-followup", async (req, res) => {
  const { to, message, scheduledAt } = req.body;

  const newFollowUp = await FollowUp.create({ to, message, scheduledAt });
  res.json({ success: true, id: newFollowUp._id });
});

module.exports = router;