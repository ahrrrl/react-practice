import { useDaumPostcodePopup } from 'react-daum-postcode';

interface PostcodeProps {
  address: string;
  setAddress: (string: string) => void;
}

export default function Postcode({ address, setAddress }: PostcodeProps) {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <input value={address} disabled />
      <button type='button' onClick={handleClick}>
        주소찾기
      </button>
    </>
  );
}
