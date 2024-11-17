export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full justify-start md:justify-center items-center min-h-screen min-w-screen">
      {children}
    </section>
  );
}
