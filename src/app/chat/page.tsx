'use client';

import { useState } from 'react';
import { useGet } from '../hooks/useGet';

export default function Page() {
  const { data } = useGet('chat/viewMessage');
  const [chatRoom, setChatRoom] = useState(null);

  return (
    <div className="p-2 md:w-1/3 md:m-auto flex flex-col gap-4 relative">
      <div className="w-full ">
        <h1 className="text-2xl font-bold italic text-[#62cdcb] tracking-wide">
          Messages
        </h1>
        <hr className="w-full h-[2px] my-2 bg-[#62cdcb]" />
      </div>

      <div className="bg-[#0E191F] h-full shadow-slate-600/40 shadow-[0px_0px_10px_2px] p-4 rounded-lg drop-shadow-sm">
        {data?.data?.length > 0 ? (
          data?.data?.map((item: any, index: any) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-[#62cdcb]/30`}>
              <img
                src={item?.image}
                alt={item?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item?.name}</h2>
                <p className="text-sm text-gray-400">{item?.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No message found</p>
        )}
      </div>
    </div>
  );
}
