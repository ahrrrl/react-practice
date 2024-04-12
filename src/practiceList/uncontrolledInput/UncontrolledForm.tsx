import { useRef, useState } from 'react';

export default function UncontrolledForm() {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [errors, setErrors] = useState<Array<boolean>>([]);

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
    if (newErrors.every((error) => !error)) {
      // 여기에서 실제 폼 제출 로직을 수행할 수 있습니다.
      console.log('Form submitted');
    }
  };
  console.log('언컨 재랜더링');
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onBlur={() => handleBlur(0)}
        ref={(el) => (inputRefs.current[0] = el)}
        style={{ border: errors[0] ? '1px solid red' : '' }}
      />
      <input
        type='date'
        onBlur={() => handleBlur(1)}
        ref={(el) => (inputRefs.current[1] = el)}
        style={{ border: errors[1] ? '1px solid red' : '' }}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
