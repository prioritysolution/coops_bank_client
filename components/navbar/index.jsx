"use client";

import {
  MdCall,
  MdNotifications,
  MdOutlineArrowForwardIos,
  MdMenu,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { useModalOpen } from "@/utils/ContextProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";

const Navbar = ({ handleLogout, orgName }) => {
  const [userName, setUserName] = useState("");
  const [branchName, setBranchName] = useState("");
  const pathname = usePathname();
  const { handleOpen } = useModalOpen();

  useEffect(() => {
    setUserName(getSessionStorageData("userName"));
    setBranchName(getSessionStorageData("userBranchName"));
  }, []);

  return (
    <div className="w-full py-5  flex items-center justify-between bg-primary h-[60px]">
      <div className="md:w-[350px] h-full px-5">
        <div className="block md:hidden cursor-pointer" onClick={handleOpen}>
          <MdMenu className="text-2xl" />
        </div>
      </div>
      <div className="w-full px-4 flex items-center justify-between h-full pr-2 md:pr-10 ">
        <p className="text-xs md:text-base">
          Organisation name : <span className="font-[500]">{orgName}</span>
        </p>

        <p className="text-xs md:text-base">
          Branch name : <span className="font-[500]">{branchName}</span>
        </p>

        <div className="flex items-center justify-center gap-5 sm:gap-10 text-2xl ">
          <div className="relative">
            <MdNotifications />
            <div className="p-[3px] rounded-full bg-red-500 absolute right-0 top-0 border-[2px] border-white" />
          </div>
          <div>
            <MdCall />
          </div>
          <div className="flex items-center justify-center  text-base">
            <DropdownMenu>
              <DropdownMenuTrigger className="  outline-none">
                <div className="flex gap-2 md:gap-5 items-center">
                  <div className="bg-secondary h-[30px] w-[30px] rounded-full sm:flex items-center justify-center text-black text-lg hidden">
                    <p>
                      {userName && userName.length > 0 && userName.charAt(0)}
                    </p>
                  </div>
                  <span className="text-sm md:text-base">{userName}</span>
                  <MdOutlineArrowForwardIos className="rotate-90 hidden md:block" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" border-2 border-primary w-[200px] pb-2">
                <DropdownMenuLabel className="text-primary">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary" />
                <DropdownMenuItem className="px-5 py-2 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-5 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
