import { ChangeEvent, useState } from 'react';

interface ImageUploaderProps {
  images: File[];
  setImages: (value: File[]) => void;
  maxImageCount?: number;
}

export default function ImageUploader({
  images,
  setImages,
  maxImageCount = 1,
}: ImageUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = [...images, ...files].slice(0, maxImageCount);
    setImages(newImages);

    const newPreviewImages = newImages.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages(newPreviewImages);
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  return (
    <div>
      {/* 이미지 미리보기 */}
      {previewImages.map((preview, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <img
            src={preview}
            alt={` preview ${index + 1}`}
            style={{ width: '40px', height: '40px', marginRight: '8px' }}
          />
          <button onClick={() => handleRemove(index)}>삭제</button>
        </div>
      ))}
      {/* 이미지 업로드 버튼 */}
      <label
        htmlFor='imgUploader'
        style={{
          display: previewImages.length === maxImageCount ? 'none' : 'inline',
        }}
      >
        <img alt='이미지 추가' src='/img/btn_img.png' />
      </label>
      <input
        id='imgUploader'
        type='file'
        accept='image/*'
        multiple
        style={{ display: 'none', visibility: 'hidden' }}
        onChange={handleChange}
      />
    </div>
  );
}
