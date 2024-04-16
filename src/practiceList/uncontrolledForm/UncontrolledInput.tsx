import { LegacyRef } from 'react';

interface UncontrolledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  forwardRef: LegacyRef<HTMLInputElement> | undefined;
  error?: boolean;
}

export function UncontrolledInput({
  forwardRef,
  error,
  ...restProps
}: UncontrolledInputProps) {
  return (
    <input
      ref={forwardRef}
      {...restProps}
      style={{ border: error ? '1px solid red' : '' }}
    />
  );
}
