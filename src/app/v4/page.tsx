"use client";

import { useState } from "react";
import ProductHeader from "../components/ProductHeader";
import SpecTableV4 from "../components/SpecTableV4";
import Footer from "../components/Footer";

export default function V4() {
  const [activeTab, setActiveTab] = useState("key-specs");

  return (
    <main className="min-h-screen">
      <ProductHeader />
      <div className="mt-[64px]">
        <SpecTableV4 activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="mt-[64px]" />
      <Footer />
    </main>
  );
}
