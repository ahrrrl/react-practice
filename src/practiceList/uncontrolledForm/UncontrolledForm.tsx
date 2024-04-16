import { useRef, useState } from 'react';
import './UncontrolledForm.scss';
import Postcode from '../addressInput/AddressInput';
import ImageUploader from '../imageInput/ImageInput';
import { UncontrolledInput } from './UncontrolledInput';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface CreateActivityBody {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export default function UncontrolledForm() {
  const inputRefs = useRef<
    Array<HTMLInputElement | HTMLTextAreaElement | null>
  >([]);
  const [errors, setErrors] = useState<Array<boolean>>([]);
  const [address, setAddress] = useState('');
  const [subImageUrls, setSubImageUrls] = useState<File[]>([]);

  const handleBlur = (index: number) => {
    const value = inputRefs.current[index]?.value.trim();
    const newErrors = [...errors];
    newErrors[index] = !value;
    setErrors(newErrors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: Array<boolean> = [];
    inputRefs.current.forEach((ref, index) => {
      const value = ref?.value.trim();
      newErrors[index] = !value;
    });
    setErrors(newErrors);
    // 모든 인풋 태그가 유효한지 확인
    if (newErrors.every((error) => !error) && address) {
      // 여기에서 실제 폼 제출 로직을 수행할 수 있습니다.
      const body = {
        title: inputRefs.current[0],
        category: '임시',
        description: inputRefs.current[1],
        price: inputRefs.current[2],
        address: address,
        schedules: '임시',
        bannerImageUrl: '임시',
        subImageUrls: subImageUrls,
      };
      console.log('Form submitted', body);
    }
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-header'>
          <h2>내 체험 등록</h2>
          <button type='submit'>등록하기</button>
        </div>
        <section className='form-content'>
          <UncontrolledInput
            className='form-input'
            type='text'
            placeholder='제목'
            onBlur={() => handleBlur(0)}
            forwardRef={(el) => (inputRefs.current[0] = el)}
            error={errors[0]}
          />
          <textarea
            className='form-textarea'
            placeholder='설명'
            onBlur={() => handleBlur(1)}
            ref={(el) => (inputRefs.current[1] = el)}
            style={{ border: errors[1] ? '1px solid red' : '' }}
          />
          <div className='input-box'>
            <label htmlFor='price'>가격</label>
            <UncontrolledInput
              className='form-input'
              id='price'
              type='number'
              placeholder='가격'
              onBlur={() => handleBlur(2)}
              forwardRef={(el) => (inputRefs.current[2] = el)}
              error={errors[2]}
            />
          </div>
          <div className='input-box'>
            <label htmlFor='address'>주소</label>
            <Postcode address={address} setAddress={setAddress} />
          </div>
          <div>
            <label htmlFor='subImage'>소개 이미지</label>
            <ImageUploader
              images={subImageUrls}
              setImages={setSubImageUrls}
              maxImageCount={4}
            />
          </div>
        </section>
      </form>
    </>
  );
}
