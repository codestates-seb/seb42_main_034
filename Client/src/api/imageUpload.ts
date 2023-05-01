import AWS, { S3 } from 'aws-sdk';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: 'ap-northeast-2',
});
//s3에 보내고 url얻어오는

export const uploadToS3 = async (file: File) => {
  const s3 = new S3();
  const fileName = `images/${Date.now()}-${file.name}`;
  const params = {
    Bucket: 'mainproproject34',
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.log(err);
    return '';
  }
};
