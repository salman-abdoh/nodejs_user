const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const User = require('./../models/user');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/file');
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.round(Math.random() * 1e9);
    const uniqueSuffix = `${Date.now()}-${randomNumber}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else callback(null, false);
  },
  limits: 1024 * 1024 * 5,
});
 

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    
  });
});

const userFilesHandler = upload.fields([
  {
    name: 'picture',
    maxCount: 1,
  },
  {
    name: 'cv',
    maxCount: 1,
  },
]);

router.post('/add_user', userFilesHandler, async (req, res) => {
  try {
    const { name,  email } = req.body;
    const { picture, cv } = req.files;

    await User.insertMany({
   
      name,
      email,
     picture: picture[0].path,
      cv: cv[0].path,
    });

    res.render("user_info", { info: req.body });
  } catch (err) {
    console.log(err.writeErrors);
    res.json(err.writeErrors[0].errmsg);
  }
});

module.exports = router;