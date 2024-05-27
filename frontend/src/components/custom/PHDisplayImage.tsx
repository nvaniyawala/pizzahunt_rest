import  { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { convertByteArrayToImage } from '../../utils/utils';
const PHDisplayImage = ({ ba }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const displayImage = async () => {
    try {
      const imageUrl = await convertByteArrayToImage(ba);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error creating image URL:', error);
    }
  };
useEffect(() => {
  
  displayImage()
}, [])

  // const createBlobUrl = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(blob);
  //   });
  // };

  return (
    <div>
        {imageSrc && (
        <div>
          <img src={imageSrc} alt="Preview" style={{ height:"5rem",width:"7rem" }} />
        </div>
        )}
    </div>
  );
};

export default PHDisplayImage;
