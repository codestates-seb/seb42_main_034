import { uploadToS3 } from 'api/imageUpload';
import { useEffect, useState } from 'react';
import { FaLaptopHouse } from 'react-icons/fa';

export const useImageUpload = () => {
  const [image, setImage] = useState<FileList>();
  const [srcImage, setSrcImage] = useState<string>('');
  const [isImageEdit, setIsImageEdit] = useState(false);
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    //중요
    if (e.target.files === null) return;
    if (e.target.files?.length > 0) {
      const url = await uploadToS3(e.target.files[0]);
      console.log(e.target.files);

      setSrcImage(url);
      //이미지 객체 저장
      setImage(e.target.files);
      setIsImageEdit(true);
    }
  };
  useEffect(() => {
    //
  }, [image, isImageEdit]);
  return { image, srcImage, isImageEdit, handleImageUpload, setIsImageEdit };
};
