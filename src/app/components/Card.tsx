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
