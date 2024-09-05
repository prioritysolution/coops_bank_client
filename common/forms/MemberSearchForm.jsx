"use client";
import { useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import MemberSearchTable from "../tables/MemberSearchTable";

const MemberSearchForm = ({ handleSubmit }) => {
  const [dialougeOpen, setDialougeOpen] = useState(false);

  const orgId = getSessionStorageData("orgId");

  const { getMemberDataByNameApiCall } = useIssueMembership();

  const formSchema = yup.object({
    memberNo: yup.string().matches(/^\d{1,5}$/, "Enter a valid member no."),
    dialougeMemberName: yup.string(),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      memberNo: "",
      dialougeMemberName: "",
    },
  });

  const handleSearchMember = () => {
    if (form.getValues("dialougeMemberName"))
      getMemberDataByNameApiCall(orgId, form.getValues("dialougeMemberName"));
    else toast.error("Please enter name");
  };

  const handleSelectClick = (data) => {
    form.setValue("memberNo", data.CIF_No);
    setDialougeOpen(false);
  };

  const memberDataByName = useSelector(
    (state) => state?.issueMembership?.memberDataByName
  );

  return (
    <div className="w-full border border-primary rounded-lg p-2 sm:p-5 lg:px-20">
      <Form {...form}>
        <form
          autoComplete="off"
          className="w-full flex items-center justify-center"
        >
          <Dialog open={dialougeOpen} onOpenChange={setDialougeOpen}>
            <FormField
              control={form.control}
              name="memberNo"
              render={({ field }) => (
                <FormItem className="w-1/2 flex flex-col lg:flex-row text-center items-center justify-center">
                  <div className="w-[200px]">
                    <p className="inline-block text-lg">Member No.</p>
                  </div>
                  <FormControl>
                    <div className="flex flex-col lg:flex-row items-center gap-x-10 gap-2 w-full">
                      <div className=" w-full h-full">
                        <div className=" w-full relative ">
                          <Input
                            placeholder="Enter member no."
                            className="w-full"
                            type="number"
                            onInput={(e) => {
                              if (e.target.value.length > 5) {
                                e.target.value = e.target.value.slice(0, 5);
                              }
                            }}
                            {...field}
                          />
                          <div className="absolute right-0 top-0 py-3 px-3">
                            <DialogTrigger
                              asChild
                              className="cursor-pointer text-lg"
                            >
                              <IoSearch />
                            </DialogTrigger>
                          </div>
                        </div>
                        <FormMessage />
                      </div>

                      <Button
                        type=""
                        className="px-5 "
                        onClick={form.handleSubmit(handleSubmit)}
                      >
                        Next
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Search Members</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <div className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 ">
                  <FormField
                    control={form.control}
                    name="dialougeMemberName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Member Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Search by enter member name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="px-10" onClick={handleSearchMember}>
                    Search
                  </Button>
                </div>
                <div className="w-full ">
                  <MemberSearchTable
                    data={memberDataByName}
                    handleSelectData={handleSelectClick}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};
export default MemberSearchForm;
