"use client";

import React, { Suspense } from "react";
import PageLoading from "@/components/skeleton/PageLoading";
import SideBar from "@/components/sidebar/SideBar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 
  const isAccountPage = pathname.startsWith("/account");

  return (
    <section className="flex">
      {/* Sidebar on the left */}
      <aside className="w-1/4 lg:w-1/2 xl:w-1/3 p-4 xl:px-2 md:hidden">
        <Suspense fallback={<PageLoading />}>
          <SideBar 
            isAccountPage={isAccountPage} 
            isSidebarOpen={true}
          />
        </Suspense>
      </aside>

      {/* Main content on the right */}
      <main className="w-full w-100">
        <Suspense fallback={<PageLoading />}>
          <div>{children}</div>
        </Suspense>
      </main>
    </section>
  );
}
