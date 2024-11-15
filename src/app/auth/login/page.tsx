'use client';

import Button from '@/app/components/form/Button';
import Input from '@/app/components/form/Input';
import { usePost } from '@/app/hooks/usePost';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';

export default function Page() {
  const { postData, data, loading, error } = usePost('login');
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const userDefaultRegister = JSON.parse(localStorage.getItem('user') || '{}');

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmail = formData?.emailOrUsername.includes('@');
    const payload = isEmail
      ? {
          email: formData.emailOrUsername,
          username: formData.emailOrUsername,
          password: formData.password,
        }
      : {
          username: formData.emailOrUsername,
          email: formData.emailOrUsername,
          password: formData.password,
        };

    postData(payload);
    setMessage(data?.message);
    if (data?.message?.includes('successfully')) {
      if (userDefaultRegister) {
        localStorage.removeItem('user');
      }
      return router.push('/profile');
    }
  };

  return (
    <div className="flex justify-center items-center p-4 relative md:w-1/4 md:min-h-[85vh] md:translate-y-10 md:m-auto md:shadow-lg md:rounded-lg md:bg-white/5 md:backdrop-blur w-full h-screen">
      <Link
        href={'/'}
        className="flex items-center gap-1 absolute top-4 left-2 text-white">
        <i className="text-2xl">
          <IoChevronBack />
        </i>
        Back
      </Link>
      <div className="w-full">
        <h1 className="text-2xl font-bold ps-2 pb-6 text-white">Login</h1>
        {message && (
          <p
            className={`${
              error ||
              message?.includes('not found') ||
              message?.includes('wrong') ||
              message?.includes('password')
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
            defaultValue={
              userDefaultRegister?.email ? userDefaultRegister?.email : ''
            }
            name={'emailOrUsername'}
            placeholder="Enter Username/Email"
            value={formData.emailOrUsername}
          />
          <Input
            disabled={loading}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <SubmitButton
            onLoad={loading || !formData.emailOrUsername || !formData.password}
          />
        </form>
        <p className="mt-8 text-white text-center font-light">
          No account ?{' '}
          <Link
            href={'/auth/register'}
            className="underline underline-offset-4 text-[#efd5aa]">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

function SubmitButton({ onLoad }: { onLoad: boolean }) {
  return (
    <Button className="mt-4" disabled={onLoad} type="submit">
      Login
    </Button>
  );
}
