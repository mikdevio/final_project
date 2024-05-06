import path from "path";
import multer from "multer";

// FIXME: Multer is not saving files on upload folder

// File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  export default multer({storage: storage}); 