import { ChangeEvent, useState } from 'react';

export default function ControlledForm() {
  const [value, setValue] = useState('');

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form>
      <input value={value} onChange={handleOnchange}></input>
    </form>
  );
}
