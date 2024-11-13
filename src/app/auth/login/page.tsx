'use client';

import { signin } from '@/app/actions/auth';
import Button from '@/app/components/form/Button';
import Input from '@/app/components/form/Input';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { IoChevronBack } from 'react-icons/io5';

export default function Page() {
  const [state, action] = useFormState(signin, undefined);

  return (
    <div className="flex justify-center items-center p-4 relative">
      <Link
        href={'/'}
        className="flex items-center gap-1 absolute top-4 left-2 text-white">
        <i className="text-2xl">
          <IoChevronBack />
        </i>
        Back
      </Link>
      <div className="pt-20 w-full">
        <h1 className="text-2xl font-bold ps-2 pb-6 text-white">Login</h1>
        <form
          action={action}
          className="flex flex-col gap-4 w-full justify-center items-center h-full">
          <Input name="email" placeholder="Enter Username/Email" />
          {state?.errors?.username ||
            (state?.errors?.email && (
              <p className="text-red-700">
                {state?.errors?.username || state?.errors?.email}
              </p>
            ))}
          <Input type="password" name="password" placeholder="Enter Password" />
          {state?.errors?.password && (
            <p className="text-red-700">{state?.errors?.password}</p>
          )}
          <SubmitButton />
        </form>
        <p className="mt-8 text-white text-center font-light">
          No account ?{' '}
          <Link
            href={'/auth/register'}
            className="underline underline-offset-4">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { onLoad }: any = useFormStatus();

  return (
    <Button className="mt-4" disabled={onLoad} type="submit">
      Login
    </Button>
  );
}
