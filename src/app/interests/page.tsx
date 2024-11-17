'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { usePut } from '../hooks/usePut';

interface Profile {
  interests: string[];
}

export default function Page() {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const profile = JSON.parse(localStorage.getItem('edit-profile') || '{}')
  const { putData } = usePut('updateProfile');
  if (!token) {
    router.push('/auth/login');
  }

  const interestTag = () => {
    const payload : Profile = {
      ...profile,
    }
    putData(payload);
    router.push('/profile');
  }

  return (
    <section className="p-2 md:w-1/3 md:m-auto flex flex-col relative">
      <div className="flex items-center justify-between ">
        <Link
          href={'/profile'}
          className="flex items-center gap-2 top-4 left-2 text-white">
          <i className="text-2xl">
            <IoChevronBack />
          </i>
          Back
        </Link>

        <button
          type="button"
          onClick={interestTag}
          className="text-lg capitalize text-[#AADAFF] pe-2 bg-transparent">
          Save
        </button>
      </div>

      <div className="pt-36">
        <p className="text-[#F3EDA6] text-lg font-bold">
          Tell everyone about yourself
        </p>
        <h1 className="text-white text-4xl font-bold">What interest you?</h1>
        <div className="pt-8">
          <TagInput />
        </div>
      </div>
    </section>
  );
}

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [storedProfile, setStoredProfile] = useState<any>(null)
  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};
  const [profile, setProfile] = useState<Profile>(() => {
    if (!parsedProfile.interests) {
      return { ...parsedProfile, interests: [] };
    } else {
      return parsedProfile;
    }
  });

  useEffect(() => {
    if(typeof window !== 'undefined'){
      setStoredProfile(localStorage.getItem('edit-profile'));
    }
  },[])

  useEffect(() => {
    setTags(profile.interests);
  }, [profile.interests]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.includes(' ')) {
      const newTags = value.trim().split(/\s+/);
      setTags([...tags, ...newTags]);
      setInputValue('');
      const updatedProfile = {
        ...profile,
        interests: [...profile.interests, ...newTags],
      };
      localStorage.setItem('edit-profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !inputValue) {
      const tagsCopy = [...tags];
      const lastTag = tagsCopy.pop();
      setTags(tagsCopy);
      const updatedProfile = {
        ...profile,
        interests: profile.interests.filter(
          (interest: string) => interest !== lastTag
        ),
      };
      localStorage.setItem('edit-profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
    }
  };
  const handleTagRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));

    const updatedProfile = {
      ...profile,
      interests: profile.interests.filter(
        (_, index: number) => index !== indexToRemove
      ),
    };
    localStorage.setItem('edit-profile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  };

  return (
    <div
      className="flex items-center flex-wrap p-6 rounded-lg bg-white/10"
      onClick={() => inputRef?.current?.focus()}>
      {' '}
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-white/10 text-white rounded-lg p-4 capitalize text-sm mr-2 mb-2 flex items-center">
          {' '}
          {tag}{' '}
          <button
            className="ml-2 text-white text-xl rounded-full w-4 h-4 flex items-center justify-center"
            onClick={() => handleTagRemove(index)}>
            {' '}
            &times;{' '}
          </button>{' '}
        </div>
      ))}{' '}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="outline-none flex-grow bg-transparent w-fit text-white"
      />{' '}
    </div>
  );
};
