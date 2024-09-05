"use client";
import NavbarContainer from "@/container/navbar";
import SidebarContainer from "@/container/sidebar";
import FooterContainer from "@/container/footer";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const token = getSessionStorageData("userToken");
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  return (
    <>
      <main className=" flex flex-col min-h-screen bg-secondary overflow-hidden gap-[2px] text-white ">
        <NavbarContainer />
        <div className="w-full h-[calc(100vh-62px)] flex gap-[2px]">
          <SidebarContainer />
          <div className="h-full w-full md:w-[calc(100%-300px)] flex flex-col justify-between bg-secondary">
            <div className="flex-1 text-black p-[2px] pr-[5px] h-[calc(100vh-120px)]">
              {children}
            </div>
            <FooterContainer />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
