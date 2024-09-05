"use client";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const token = getSessionStorageData("userToken");

  useEffect(() => {
    if (token) router.push("/dashboard");
    else router.push("/login");
  }, [token, router]);

  return <main className="min-h-screen">Hello world</main>;
}
