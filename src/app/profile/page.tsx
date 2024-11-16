'use client';

import Card from '../components/Card';
import { CiEdit } from 'react-icons/ci';
import { useGet } from '../hooks/useGet';
import { useEffect, useState } from 'react';
import EditForm from '../components/EditForm';
import {
  chineseZodiacConverter,
  horoscopeConverter,
} from '../helper/helperEdit';

export default function Page() {
  const data = JSON.parse(localStorage.getItem('edit-profile') || '{}');

  return (
    <section className="p-2 md:w-1/3 md:m-auto">
      <AboutCard data={data} />
    </section>
  );
}

function AboutCard({ data }: { data: any }) {
  const [openForm, setOpenForm] = useState(false);
  const [horoscope, setHoroscope] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e?.target as typeof e.target & {
      gender: { value: string };
    };

    const payload = {
      ...formData,
      horoscope,
      zodiac,
      gender: target?.gender.value,
    };
    if (!payload?.displayName || !payload?.birthday || !payload?.gender) {
      setError('All fields are required');
      setTimeout(() => setError(''), 3000);
    } else if (payload) {
      localStorage.setItem('edit-profile', JSON.stringify(payload));
      const existingProfile = JSON.parse(
        localStorage.getItem('edit-profile') || '{}'
      );
      const updateProfile = { ...existingProfile, ...payload };
      if (existingProfile) {
        localStorage.setItem('edit-profile', JSON.stringify(updateProfile));
      }
      return setOpenForm(false);
    }
  };

  useEffect(() => {
    const birthDate = new Date(formData?.birthday);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    if (formData?.birthday) {
      setHoroscope(horoscopeConverter(month, day));
      setZodiac(chineseZodiacConverter(birthDate));
    }
  }, [formData?.birthday]);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div
          className={`flex justify-between items-center ${
            openForm && 'hidden'
          }`}>
          <h1 className="font-bold text-md">About</h1>
          <button
            type="button"
            onClick={() => setOpenForm(true)}
            className="text-lg text-white hover:text-white/50 bg-transparent">
            <CiEdit />
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {openForm ? (
          <EditForm
            handleChange={handleChange}
            handleCreateProfile={handleCreateProfile}
            horoscope={horoscope}
            zodiac={zodiac}
          />
        ) : data?.displayName ? (
          <div className="flex flex-col gap-2">
            {Object?.keys(data).map((key) => {
              if (key === 'displayName' || key === 'gender') {
                return null;
              }

              return <ProfileData key={key} label={key} value={data[key]} />;
            })}
          </div>
        ) : (
          <p className="text-white/50 font-light text-sm">
            Add in your your to help others know you better
          </p>
        )}
      </div>
    </Card>
  );
}

function ProfileData({ label, value }: { label: string; value: string }) {
  const calculateAge = () => {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const year = new Date(value).getFullYear();
  const month = new Date(value).getMonth() + 1;
  const day = new Date(value).getDate();

  return (
    <p className="text-white font-light text-sm">
      <span className="text-white/50 font-light text-sm capitalize">
        {label}:
      </span>{' '}
      {label === 'birthday'
        ? `${day} / ${
            month < 10 ? `0${month}` : month
          } / ${year} (Age ${calculateAge()})`
        : label === 'weight'
        ? `${value} kg`
        : label === 'height'
        ? `${value} cm`
        : value}
    </p>
  );
}
