import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/session";
import { DjNavigation } from "@/components/layout/dj-navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  if (!token) redirect("/login");

  return (
    <div className="min-h-screen" style={{ background: "#000" }}>
      <main className="pb-28">{children}</main>
      <DjNavigation />
    </div>
  );
}
