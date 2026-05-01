import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  if (!token) redirect("/login");
  return <>{children}</>;
}
