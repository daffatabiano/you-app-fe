'use client';

import Link from 'next/link';
import { AboutCard, ImageCard, InterestCard } from '../components/Card';
import { IoChevronBack } from 'react-icons/io5';

export default function Page() {
  const data = JSON.parse(localStorage.getItem('edit-profile') || '{}');

  return (
    <section className="p-2 md:w-1/3 md:m-auto flex flex-col gap-4 relative">
      <Link
        href={'/'}
        className="flex items-center absolute gap-2 top-4 left-2 text-white">
        <i className="text-2xl">
          <IoChevronBack />
        </i>
        Back
      </Link>

      {data?.displayName && (
        <h1 className="text-2xl font-bold text-white text-center pt-2">
          @{data?.displayName}
        </h1>
      )}
      <ImageCard />
      <AboutCard data={data} />
      <InterestCard />
    </section>
  );
}
