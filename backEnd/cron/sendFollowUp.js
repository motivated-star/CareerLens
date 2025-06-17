const cron = require("node-cron");
const FollowUp = require("../models/followUp");
const sendMail = require("../util/sendMail");

cron.schedule("* * * * *", async () => {
  console.log("🔄 Running follow-up email task...") ;
  const now = new Date();

  const dueFollowUps = await FollowUp.find({
    sent: false,
    scheduledAt: { $lte: now },
  });

  for (const followUp of dueFollowUps) {
  try {
    await sendMail(followUp.to, "Follow-Up Reminder", followUp.message);
    followUp.sent = true;
    await followUp.save();
  } catch (err) {
    console.error(`❌ Failed to send to ${followUp.to}:`, err);
  }
}

});
