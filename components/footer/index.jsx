import { useSelector } from "react-redux";

const Footer = () => {
  const currentDate = new Date();

  const startDate = useSelector(
    (state) => state?.footer?.footerData?.Start_Date
  );

  const endDate = useSelector((state) => state?.footer?.footerData?.End_Date);

  return (
    <div className="w-full h-[60px] bg-primary flex items-center justify-between gap-1 px-2 text-xs sm:text-base lg:text-lg">
      <div>
        <p className="">
          Design and developed by{" "}
          <span className="font-semibold">Priority Solution</span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-1 sm:gap-5 md:gap-20 xl:gap-40">
        <p>
          Financial year : {startDate?.slice(0, 4)} - {endDate?.slice(0, 4)}
        </p>
        <p>
          Date :{" "}
          <span>{currentDate.toString().slice(0, 15).replace(/ /g, ", ")}</span>
        </p>
      </div>
      {/* <div></div> */}
      <div>Version 1.0.1</div>
    </div>
  );
};

export default Footer;
