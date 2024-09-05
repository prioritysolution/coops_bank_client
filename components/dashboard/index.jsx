"use client";
import DashboardCard from "@/common/cards/DashboardCard";
import DoubleBarChart from "@/common/charts/DoubleBarChart";

const Dashboard = () => {
  return (
    <div className="w-full  h-full flex flex-col justify-between gap-5 p-5 bg-[#fefefe]  rounded-lg overflow-y-scroll ">
      <div className=" w-full flex justify-center xl:justify-between  flex-wrap xl:flex-nowrap items-center gap-5 h-full xl:py-10">
        <DashboardCard
          label="Hello World"
          count="100+"
          classname="bg-green-500"
        />
        <DashboardCard
          label="Hello World"
          count="100+"
          classname="bg-yellow-500"
        />
        <DashboardCard
          label="Hello World"
          count="100+"
          classname="bg-blue-500"
        />
        <DashboardCard
          label="Hello World"
          count="100+"
          classname="bg-red-500"
        />
      </div>
      <div className=" h-[500px] 2xl:h-[600px]  flex items-center justify-center border-primary rounded-lg border-[2px] p-5 w-full">
        <DoubleBarChart className="w-full h-full" />
      </div>
    </div>
  );
};

export default Dashboard;
