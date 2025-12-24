"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProviderHeader, Footer } from "@/components/common";
import { useAuth } from "@/context";

export default function ProviderOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/provider/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProviderHeader />
      <main className="flex-1 bg-muted/30">{children}</main>
      <Footer />
    </div>
  );
}
