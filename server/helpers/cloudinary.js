const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dirtbztjg',
    api_key: '216758462551758',
    api_secret: "Hl-0hiDc0q9OPW-UnGbgGZ1LGn4",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });

    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };