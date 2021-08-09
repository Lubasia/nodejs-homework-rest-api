const { user: service } = require('../../services');

const verify = async (req, res, next) => {
  const { verifyToken } = req.params;
  try {
    const user = await service.getOneUser({ verifyToken });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Код верфикации устарел',
      });
      // res.send("<h2>Код верфикации устарел</h2>")
    }
    await service.updateUserById(user._id, {
      verify: true,
      verifyToken: '',
    });
    res.json({
      status: 'success',
      code: 200,
      message: 'Почта потдверждена, спасибо!',
    });
    res.send('<h2>Почта потдверждена, спасибо!</h2>');
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
