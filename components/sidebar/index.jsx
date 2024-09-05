"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import { MdLogout, MdOutlineClose } from "react-icons/md";

import { links } from "@/lib/sidebarLinks";
import { useModalOpen } from "@/utils/ContextProvider";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import IconDisplay from "@/common/IconDisplay";

const Sidebar = () => {
  const { modalOpen, handleClose } = useModalOpen();
  const [expandedLink, setExpandedLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const sidebarData = useSelector((state) => state.sidebar.sidebarData);

  const handleExpandedLink = (title) => {
    if (expandedLink !== title) setExpandedLink(title);
    else setExpandedLink("");
  };

  return (
    <div
      className={cn(
        " w-[300px] h-[calc(100vh-62px)] py-5 flex-col justify-between absolute md:relative bg-primary -translate-x-[300px] md:translate-x-0 flex transition-all ease-in duration-200 delay-75 z-[10]",
        { "translate-x-0": modalOpen }
      )}
    >
      <ScrollArea className=" h-full">
        <div className="flex text-white justify-end pr-5">
          <MdOutlineClose
            className="text-3xl font-bold md:hidden"
            onClick={handleClose}
          />
        </div>
        <ul className=" space-y-4">
          {sidebarData.map((link, id) => (
            <li
              key={id}
              className={cn("px-4", {
                "flex items-center justify-between  ": !(
                  link.childLinks.length > 0
                ),
              })}
            >
              <p
                className={cn(
                  "flex items-center justify-between p-2 px-4 font-[500] border border-secondary rounded-lg w-full cursor-pointer",
                  {
                    "bg-secondary text-black":
                      link.path === pathname ||
                      link.childLinks.filter(
                        (item) => item.Page_Allies === pathname
                      ).length > 0,
                  }
                )}
                onClick={() => {
                  link.childLinks.length > 0
                    ? handleExpandedLink(link.title)
                    : handleExpandedLink("");
                  !(link.childLinks.length > 0) &&
                    link.path &&
                    router.replace(link.path);
                }}
              >
                <span className="flex items-center justify-center gap-5">
                  <IconDisplay
                    iconName={link.Icon && link.Icon}
                    iconSet={link.Icon && link.Icon.slice(0, 2).toLowerCase()}
                    className="text-2xl  "
                  />

                  {link.title}
                </span>
                {link.childLinks.length > 0 &&
                  (link.title === expandedLink ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </p>
              <ul
              // className={
              //   link.childLinks &&
              //   ` rounded-md flex justify-start items-center`
              // }
              >
                {link.childLinks &&
                  link.title === expandedLink &&
                  link.childLinks.map((item, id) => (
                    <div
                      className="flex items-center justify-between pl-6"
                      key={id}
                    >
                      <div className="flex items-center justify-start">
                        <div className={`h-[40px] w-[2px] bg-secondary`} />
                        <li
                          className={`flex items-center justify-start gap-2 py-2 rounded-md cursor-pointer`}
                          onClick={() =>
                            item.Page_Allies && router.push(item.Page_Allies)
                          }
                        >
                          <div className="h-[2px] w-[10px] bg-secondary" />
                          {item.Menue_Name}
                        </li>
                      </div>
                      <div
                        className={cn(
                          "border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[10px] border-r-[hsl(210,_55%,_90%)] hidden",
                          { block: item.Page_Allies === pathname }
                        )}
                      />
                    </div>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {/* <div className="flex flex-col items-center gap-2 border-t-[2px] border-secondary p-5 bottom-0 left-0 w-full z-[5] mb-10 h-[100px]">
        <div className="flex items-center gap-2 w-full font-[500] cursor-pointer">
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
