import multer from "multer";


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