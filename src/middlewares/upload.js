import multer from "multer";

// FIXME: Multer is not saving files on upload folder

// File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now())
    }
  });
  
  export default multer({storage: storage}); 