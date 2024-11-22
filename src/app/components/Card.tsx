import { useEffect, useState } from 'react';
import {
  chineseZodiacConverter,
  horoscopeConverter,
} from '../helper/helperEdit';
import EditForm from './EditForm';
import { CiEdit } from 'react-icons/ci';
import ProfileData from './elements/ProfileData';
import Link from 'next/link';
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from 'react-icons/tb';
import {
  GiGoat,
  GiHorseHead,
  GiMonkey,
  GiPig,
  GiRabbit,
  GiRooster,
  GiSeatedMouse,
  GiSittingDog,
  GiSnake,
  GiTigerHead,
} from 'react-icons/gi';
import { FaFirefox } from 'react-icons/fa';
import { SiDungeonsanddragons } from 'react-icons/si';
import { usePost } from '../hooks/usePost';
import { usePut } from '../hooks/usePut';
import { useGet } from '../hooks/useGet';

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-full rounded-lg bg-[#0E191F] py-2 px-4 drop-shadow-sm text-white ${className}`}>
      {children}
    </div>
  );
}

export function AboutCard({ data }: { data: any }) {
  const [openForm, setOpenForm] = useState(false);
  const [horoscope, setHoroscope] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');
  const { data: response, loading, postData } = usePost('createProfile');
  const { putData } = usePut('updateProfile');

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
    if (payload && typeof window !== 'undefined') {
      localStorage.setItem('edit-profile', JSON.stringify(payload));
      const existingProfile = JSON.parse(
        localStorage.getItem('edit-profile') || '{}'
      );
      if(payload?.gender === 'default') {
        setError('Please select your gender');
      }
      if(!existingProfile){
        postData({
          ...payload,
          name: payload?.displayName,
          birthday: payload?.birthday,
          height: Number(payload?.height),
          weight: Number(payload?.weight),
          interest: payload?.interest,
        });
      }
      const updateProfile = { ...existingProfile, ...payload };
      if (existingProfile) {
        putData({
          ...updateProfile,
          name: updateProfile?.displayName,
          birthday: updateProfile?.birthday,
          height: Number(updateProfile?.height),
          weight: Number(updateProfile?.weight),
          interest: updateProfile?.interest,
        });
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
        ) : data?.data?.name ? (
          <div className="flex flex-col gap-2 pb-4">
            {Object?.keys(data?.data).map((key) => {
              const value = data?.data[key];
              if (
                key === 'username' ||
                key === 'gender' ||
                key === 'interests' ||
                key === 'email'
              ) {
                return null;
              }

              return <ProfileData key={key} label={key} value={value} />;
            })}
          </div>
        ) : (
          <p className="text-white/50 font-light text-sm py-4">
            Add in your your to help others know you better
          </p>
        )}
      </div>
    </Card>
  );
}

export function InterestCard() {
  const [interests, setInterests] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem('edit-profile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        if (profile.interests) {
          setInterests(profile.interests);
        }
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className={`flex justify-between items-center`}>
          <h1 className="font-bold text-md">Interest</h1>
          <Link
            href={'/interests'}
            className="text-lg text-white hover:text-white/50 bg-transparent">
            <CiEdit />
          </Link>
        </div>
        {interests.length > 0 ? (
          <ul className="text-white/50 font-light text-sm py-4 flex gap-2 flex-wrap">
            {' '}
            {interests.map((interest, index) => (
              <li
                key={index}
                className="py-2 px-4 rounded-full bg-white/5 text-white">
                {interest}
              </li>
            ))}{' '}
          </ul>
        ) : (
          <p className="text-white/50 font-light text-sm py-4">
            {' '}
            Add in your interest to find a better match{' '}
          </p>
        )}
      </Card>
    </div>
  );
}

export function ImageCard() {
  const [storedProfile,setStoredProfile] = useState<any>(null);
  useEffect(() => {
    if(typeof window !== 'undefined'){
      setStoredProfile(localStorage.getItem('edit-profile'))
    }
  },[])
  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};
  const profile = parsedProfile || {};
  const {data} = useGet('getProfile')

  const zodiacIcons: { [key: string]: React.ReactNode } = {
    Aries: <TbZodiacAries />,
    Taurus: <TbZodiacTaurus />,
    Gemini: <TbZodiacGemini />,
    Cancer: <TbZodiacCancer />,
    Leo: <TbZodiacLeo />,
    Virgo: <TbZodiacVirgo />,
    Libra: <TbZodiacLibra />,
    Scorpio: <TbZodiacScorpio />,
    Sagittarius: <TbZodiacSagittarius />,
    Capricorn: <TbZodiacCapricorn />,
    Aquarius: <TbZodiacAquarius />,
    Pisces: <TbZodiacPisces />,
  };

  const chineseZodiac: { [key: string]: React.ReactNode } = {
    Rat: <GiSeatedMouse />,
    Ox: <FaFirefox />,
    Tiger: <GiTigerHead />,
    Rabbit: <GiRabbit />,
    Dragon: <SiDungeonsanddragons />,
    Snake: <GiSnake />,
    Horse: <GiHorseHead />,
    Goat: <GiGoat />,
    Monkey: <GiMonkey />,
    Rooster: <GiRooster />,
    Dog: <GiSittingDog />,
    Pig: <GiPig />,
  };

  return (
    <div className="w-full h-56">
      <div className="h-full flex rounded-lg overflow-hidden relative shadow-[inset_0px_-50px_40px_-2px_rgba(0,_0,_0,_0.7)]">
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <h1 className="text-white font-bold text-2xl capitalize ">
            {data?.data?.name}
          </h1>
          <p className="text-white capitalize">{profile.gender}</p>
          <div className="flex gap-2">
            <p className="p-2 px-4 rounded-full flex items-center gap-2 text-white bg-[#0e191f] ">
              <span className="text-2xl">{zodiacIcons[data?.data?.horoscope]}</span>
              {data?.data?.horoscope}
            </p>
            <p className="p-2 px-4 rounded-full flex items-center gap-2 text-white bg-[#0e191f] ">
              <span className="text-2xl">{chineseZodiac[data?.data?.zodiac]}</span>
              {data?.data?.zodiac}
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
          className=" w-full h-full object-cover object-center"
        />
      </div>
      {/* <Card>
      </Card> */}
    </div>
  );
}
