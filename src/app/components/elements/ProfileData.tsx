export default function ProfileData({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
