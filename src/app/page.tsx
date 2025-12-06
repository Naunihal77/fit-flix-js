"use client";

import React, { useState, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CallbackForm from "@/components/CallbackForm";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const prefillLocation = useMemo(() => {
    const loc = searchParams.get("location");
    return loc ? decodeURIComponent(loc) : undefined;
  }, [searchParams]);

  const gymId = useMemo(() => {
    const id = searchParams.get("gymId");
    return id ? Number(id) : undefined;
  }, [searchParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-4">
          FitFlix – Request Callback
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Request Callback
        </button>

        <CallbackForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          prefillLocation={prefillLocation}
          gymId={gymId}
        />
      </div>
    </main>
  );
}
