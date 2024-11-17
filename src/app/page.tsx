'use client';

import styles from '@/app/animation.module.css';
import Link from 'next/link';

export default function Home() {
  const text = 'YOU APP';
  return (
    <main className="flex md:w-1/3 md:m-auto min-h-screen flex-col items-center justify-center p-24">
      <div className='w-full'>
        <p className="text-white/60">Welcome to,</p>
        <h1 className="text-5xl w-full font-extrabold tracking-wider text-white">
          {text.split('').map((character, index) => (
            <span
              key={index}
              className={`text-transparent bg-clip-text bg-gradient-to-r from-[#62cdcb] to-[#4599db] inline-block relative drop-shadow-lg shadow-[#62cdcb]/50 ${styles.animatedText}`}
              style={{ '--i': index } as React.CSSProperties}>
              {' '}
              {character}{' '}
            </span>
          ))}
        </h1>
      </div>
      <Link 
      href={'/auth/login'}
        className="mt-36 md:mt-16 justify-center items-center w-full p-4 flex  rounded-xl text-white bg-gradient-to-r from-[#62cdcb] to-[#4599db] shadow-lg shadow-[#62cdcb]/50 hover:shadow-[#4599db]">
        Get Started
      </Link>
    </main>
  );
}
