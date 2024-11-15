'use client';
import Button from '@/app/components/form/Button';
import Input from '@/app/components/form/Input';
import { usePost } from '@/app/hooks/usePost';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';

export default function Page() {
  const { postData, data, loading, error } = usePost('register');
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(formData);
    setMessage(data?.message);
    if (data?.message?.includes('successfully')) {
      localStorage.setItem('user', JSON.stringify(formData));
      return router.push('/auth/login');
    }
  };

  const disableButton =
    loading ||
    !formData.email ||
    !formData.password ||
    !formData.username ||
    !formData.confirmPassword;

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setMessage('passwords do not match');
    } else setMessage('');
  }, [formData.password, formData.confirmPassword]);

  return (
    <div className="flex justify-center items-center p-4 relative md:w-1/4 md:min-h-[85vh] md:translate-y-10 md:m-auto md:shadow-lg md:rounded-lg md:bg-white/5 md:backdrop-blur w-full h-full">
      <Link
        href={'/'}
        className="flex items-center gap-1 absolute top-4 left-2 text-white">
        <i className="text-2xl">
          <IoChevronBack />
        </i>
        Back
      </Link>
      <div className="pt-20 w-full">
        <h1 className="text-2xl font-bold ps-2 pb-6 text-white">Register</h1>
        {message && (
          <p
            className={`${
              error ||
              message.includes('exists') ||
              message.includes('wrong') ||
              message.includes('password')
                ? 'text-red-500'
                : 'text-green-500'
            }`}>
            {message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full justify-center items-center h-full">
          <Input
            disabled={loading}
            onChange={handleChange}
            name={'email'}
            placeholder="Enter Email"
          />
          <Input
            disabled={loading}
            onChange={handleChange}
            name={'username'}
            placeholder="Create Username"
          />
          <Input
            disabled={loading}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Create Password"
          />
          <Input
            disabled={loading}
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <SubmitButton onLoad={disableButton} />
        </form>
        <p className="mt-8 text-white text-center font-light">
          Have an account ?{' '}
          <Link
            href={'/auth/login'}
            className="underline underline-offset-4 text-[#efd5aa]">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

function SubmitButton({ onLoad }: { onLoad: boolean }) {
  return (
    <Button className="mt-4" disabled={onLoad} type="submit">
      Register
    </Button>
  );
}
