const cron = require("node-cron");
const FollowUp = require("../models/FollowUp");
const sendMail = require("../utils/sendMail");

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const dueFollowUps = await FollowUp.find({
    sent: false,
    scheduledAt: { $lte: now },
  });

  for (const followUp of dueFollowUps) {
    await sendMail(followUp.to, "Follow-Up Reminder", followUp.message);
    followUp.sent = true;
    await followUp.save();
  }
});
