const path = require('path');
const fs = require('fs/promises');
const moment = require('moment');
const Jimp = require('jimp');

const { user: service } = require('../../services');

const updateAvatar = async (req, res, next) => {
  const uploadDir = path.join(process.cwd(), 'public/avatars');
  const { path: tempName, originalname } = req.file;
  const now = moment().format('YYYY-MM-DD_hh-mm-ss');
  const fileName = `${now}_${originalname}`;
  const fullFileName = path.join(uploadDir, fileName);

  try {
    const avatar = await Jimp.read(tempName);
    await avatar.resize(250, 250);
    await avatar.writeAsync(fullFileName);
    await fs.unlink(tempName);
    await service.updateUserById(req.user._id, { avatarUrl: fullFileName });
    res.json({
      status: 'success',
      code: 200,
      data: { result: { avatarUrl: fullFileName } },
    });
  } catch (error) {
    await fs.unlink(tempName);
    next(error);
  }
};
module.exports = updateAvatar;
