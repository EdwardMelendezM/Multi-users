import HeaderDasboard from "@/components/dashboard/header-dashboard";

export default async function Layout(
  { children }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="h-screen w-screen">
      <HeaderDasboard />
      {children}
    </div>
  );
}
