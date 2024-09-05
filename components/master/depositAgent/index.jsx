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
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";

const DepositAgent = ({ loading, handleSubmit, form }) => {
  const paymentTypeData = useSelector(
    (state) => state?.depositAgent?.paymentTypeData
  );

  return (
    <div className="w-full h-full flex justify-between p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold">Deposit Agent</h3>
        <div className="w-full h-full px-20 overflow-y-scroll py-5 flex  items-start justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 items-end overflow-scroll"
              autoComplete="off"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 gap-x-5 xl:gap-x-20 gap-y-3 w-full p-5  lg:p-10  rounded-md border border-primary">
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter agent name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter address"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter mobile no."
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="depositAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter deposit amount"
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
                  name="maximumDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Days</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter maximum days"
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
                  name="maximumDeposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Deposit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter maximum deposit"
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
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentTypeData &&
                            paymentTypeData.length > 0 &&
                            paymentTypeData.map(({ Id, Option_Value }) => (
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
                  name="payoutAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payout Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter payout amount"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-end ">
                <Button type="submit" className="w-1/3">
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
export default DepositAgent;
