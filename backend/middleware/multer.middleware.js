import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Yahan file save hogi
  },
  filename: function (req, file, cb) {
    // File ka naam unique rakhne ke liye suffix lagate hain
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ 
    storage: storage, 
});