"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

const ShareProduct = ({ loading, form, handleSubmit }) => {
  const memberTypeData = useSelector(
    (state) => state?.shareProduct?.memberTypeData
  );

  return (
    <div className="w-full h-full flex justify-between p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold">Share Product</h3>
        <div className="w-full h-full px-20 overflow-y-scroll py-5 flex  items-start justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-[500px] h-full flex flex-col gap-10 justify-between p-5 rounded-md border border-primary "
              autoComplete="off"
            >
              <div className="grid grid-cols-1 gap-5 gap-y-5 w-full">
                <FormField
                  control={form.control}
                  name="memberType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {memberTypeData &&
                            memberTypeData.length > 0 &&
                            memberTypeData.map(({ Id, Option_Value }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Option_Value}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="admissionFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admission Fees</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter admission fees"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ratePerShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate Per Share</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter rate per share"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <Button type="submit" className="w-full">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ShareProduct;
