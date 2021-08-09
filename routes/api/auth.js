const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const { auth: ctrl } = require('../../controllers');
const { users: ctrlUser } = require('../../controllers');
console.log(ctrl, 'routeAuth');

const { validateMiddleware, authtenticate } = require('../../middleware');
const {
  user: { validateUser },
} = require('../../model/schemas');

const tempDir = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
  destination: (__, _, cb) => {
    cb(null, tempDir);
  },
  filename: (__, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000,
  },
});

const uploadMiddleware = multer({
  storage,
});

router.post(
  '/signup',
  express.json(),
  validateMiddleware(validateUser),
  ctrl.signup,
);
router.post(
  '/login',
  express.json(),
  validateMiddleware(validateUser),
  ctrl.login,
);
router.get('/logout', authtenticate, ctrl.logout);
router.get('/current', express.json(), authtenticate, ctrlUser.getUser);
router.patch(
  '/avatars',
  authtenticate,
  uploadMiddleware.single('avatar'),
  ctrlUser.updateAvatar,
);
router.get('/verify/:verificationToken', ctrl.verify);

module.exports = router;
