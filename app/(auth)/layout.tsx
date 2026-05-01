import { AuthCarousel } from "@/components/auth/auth-carousel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#000" }}>
      <div className="hidden md:block md:w-[55%] relative">
        <AuthCarousel />
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center px-8 py-12 overflow-y-auto"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.07 0.025 25) 0%, oklch(0 0 0) 60%)",
          borderLeft: "1px solid oklch(0.2 0.07 25)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
