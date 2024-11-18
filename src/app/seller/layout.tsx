import React, { Suspense } from "react";
import PageLoading from "@/components/skeleton/PageLoading";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
      <Suspense fallback={<PageLoading />}>
        <div>{children}</div>
      </Suspense>
  );
}
