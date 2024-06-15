import multer from 'multer';
import cloudinary from 'cloudinary';
import sharp from 'sharp';

const storage = multer.memoryStorage();
export const upload = multer(
    {
        storage,
        limits: {
            fieldSize: 1024 * 1024
        },
    }
)

export const uploadImagesToCloudinary = async (files: Express.Multer.File[]): Promise<string[]> => {
    try {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        files.forEach(file => {
            const sizeInMB = file.size / (1024 * 1024);
            console.log(`Original Image Name: ${file.originalname}, Size: ${sizeInMB.toFixed(2)} MB`);
        });

        const uploadPromises = files.map(async (file) => {
            let buffer = file.buffer;
            const originalSizeInMB = buffer.length / (1024 * 1024);

            if (originalSizeInMB > 2) {
                const metadata = await sharp(buffer).metadata();
                buffer = await sharp(buffer)
                    .resize(metadata.width, metadata.height, {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                    })
                    .jpeg({ quality: 30 })
                    .toBuffer();
            }

            const sizeInMB = buffer.length / (1024 * 1024);
            console.log(`Resized Image Name: ${file.originalname}, Size: ${sizeInMB.toFixed(2)} MB`);

            const b64 = buffer.toString('base64');
            const dataURL = "data:" + file.mimetype + ";base64," + b64;
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURL);
            return cloudinaryResponse.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls;
    } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);
        throw error;
    }
};
