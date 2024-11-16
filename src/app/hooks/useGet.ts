import { useEffect, useState } from 'react';

export const useGet = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') || '',
          },
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

    getData();
  }, [url]);

  return { data, loading, error };
};
