const test = require("node:test");
const assert = require("node:assert/strict");
const { sendOrderEmails, verifySmtp } = require("../email");

test("vypnute SMTP neodosiela objednavku", async () => {
  const result = await sendOrderEmails({ items: [] }, { smtpEnabled: "false" });
  assert.deepEqual(result, { configured: false, sent: false });
});

test("overenie odmietne neuplne SMTP nastavenie", async () => {
  await assert.rejects(
    verifySmtp({ smtpHost: "", smtpPort: 587 }),
    /adresu SMTP servera/
  );
});
