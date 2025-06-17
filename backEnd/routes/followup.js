const router = require("express").Router();
const FollowUp = require("../models/FollowUp");

router.post("/schedule-followup", async (req, res) => {
  const { to, message, scheduledAt } = req.body;

  const newFollowUp = await FollowUp.create({ to, message, scheduledAt });
  res.json({ success: true, id: newFollowUp._id });
});

module.exports = router;