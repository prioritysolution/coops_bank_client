import { cn } from "@/lib/utils";

const DashboardCard = ({ classname, label, count }) => {
  return (
    <div
      className={cn(
        " w-[300px] h-[200px] xl:h-full px-8 py-5 bg-primary rounded-lg flex  items-center justify-between",
        classname
      )}
    >
      <div className="text-white flex flex-col gap-5 ">
        <h3 className="text-4xl font-semibold">{count}</h3>
        <p className="text-lg">{label}</p>
      </div>
      <div className="bg-gray-100 ">LOGO</div>
    </div>
  );
};
export default DashboardCard;
