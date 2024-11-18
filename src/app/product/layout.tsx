import React, { Suspense } from "react";

import PageLoading from "@/components/skeleton/PageLoading";
import CompanyPolicies from "@/components/footer/CompanyPolicies";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <Suspense fallback={<PageLoading />}>
        <div>{children}</div>
      </Suspense>
      <CompanyPolicies />
    </section>
  );
}
