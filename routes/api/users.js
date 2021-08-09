const express = require('express');

// const multer = require('multer');
// const path = require('path');

// const { authtenticate } = require('../../middleware');
const { users: ctrl } = require('../../controllers');
console.log(ctrl, 'done-userApi');

const router = express.Router;

// const tempDir = path.join(process.cwd(), 'temp');

// const storage = multer.diskStorage({
//   destination: (__, _, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (__, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 10000,
//   },
// });

// const uploadMiddleware = multer({
//   storage,
// });

// router.get('/current', express.json(), authtenticate, ctrl.getUser);
// router.patch(
//   '/avatars',
//   authtenticate,
//   uploadMiddleware.single('avatar'),
//   ctrl.updateAvatar,
// );

module.exports = router;
