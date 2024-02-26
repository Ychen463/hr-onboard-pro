import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import AWS from 'aws-sdk';

const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(dirname, '../.env') });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const getPresignedUrl = async (req, res) => {
  const { userId } = req.user;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: userId,
    Expires: 300, // URL expires in 300 seconds, 5 mins
  };

  s3.getSignedUrl('putObject', params, (error, url) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
    res.json({ message: 'AWS S3 presigned Url generated successfully, expire in 5 mins', url });
  });
};

export default getPresignedUrl;
