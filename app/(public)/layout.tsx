import React from "react";
import Navbar from "@/app/(public)/_components/navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
