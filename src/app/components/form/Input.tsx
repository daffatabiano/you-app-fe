'use client';

import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function Input(props: InputType) {
  const { name, type, onChange, required, className, placeholder, disabled } =
    props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    return setShowPassword((curr) => !curr);
  };

  return (
    <div className={`w-full relative`}>
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        id={type === 'password' ? 'hs-password-active' : name}
        className={`${className} w-full p-4 bg-white/5 backdrop-blur-md rounded-lg text-white focus:outline-none focus:bg-white/10`}
      />
      {type === 'password' && (
        <i
          className="shrink-0 top-5 right-2 absolute text-white"
          onClick={handleShowPassword}>
          {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </i>
      )}
    </div>
  );
}
