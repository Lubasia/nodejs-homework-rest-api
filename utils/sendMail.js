const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    text,
    html,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const answer = await sgMail.send(mail);
    return answer;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };
