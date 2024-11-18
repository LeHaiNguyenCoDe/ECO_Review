import React, { Suspense } from "react";

import PageLoading from "@/components/skeleton/PageLoading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Suspense fallback={<PageLoading />}>
        <div>{children}</div>
      </Suspense>
    </section>
  );
}
