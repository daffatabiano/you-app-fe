export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full justify-center items-center min-h-screen min-w-screen">
      {children}
    </div>
  );
}
