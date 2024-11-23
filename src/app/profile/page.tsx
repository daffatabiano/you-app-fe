'use client';

import Link from 'next/link';
import { AboutCard, ImageCard, InterestCard } from '../components/Card';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useGet } from '../hooks/useGet';
import { useEffect } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';

export default function Page() {
  const { data } = useGet('getProfile');
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasLogin = localStorage.getItem('token');
      if (!hasLogin) {
        router.push('/auth/login');
      }
    }
  }, []);

  return (
    <section className="p-2 md:w-1/3 md:m-auto flex flex-col gap-4 relative">
      <Link
        href={'/'}
        className={`flex items-center gap-2 top-4 left-2 text-white ${
          data?.data?.name && 'absolute'
        }`}>
        <i className="text-2xl">
          <IoChevronBack />
        </i>
        Back
      </Link>

      {data?.data?.name && (
        <h1 className="text-2xl font-bold text-white text-center pt-2">
          @{data?.data?.name}
        </h1>
      )}
      <ImageCard />
      <AboutCard data={data} />
      <InterestCard />
      <button
        type="button"
        onClick={() => router.push('/chat')}
        className="fixed bottom-4 right-4 p-4 rounded-full bg-gradient-to-r from-[#62cdcb] to-[#4599db]">
        <IoMdChatbubbles className="text-2xl text-white" />
      </button>
    </section>
  );
}
