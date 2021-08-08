const { nanoid } = require('nanoid');

const { user: service } = require('../../services');
const { sendMail } = require('../../utils');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOneUser({ email });
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
      return;
    }
    const verificationToken = nanoid();
    await service.addUser({ email, password, verificationToken });
    const mail = {
      to: email,
      subject: 'Подтвердите свой email',
      text: `<a href="https://mysite.com/api/v1/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'success signup. Verify email',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
