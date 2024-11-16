import { useState } from 'react';

export const usePost = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body = {}) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setData(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err?.message);
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
};
