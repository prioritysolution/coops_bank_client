"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const InvestmentClose = () => {
  const form = useForm();
  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Investment Close</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 justify-between"
              autoComplete="off"
            >
              <div className="w-full flex items-center justify-center border border-primary rounded-lg p-5 gap-5">
                <FormField
                  control={form.control}
                  name="accountNo"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/3">
                      <FormLabel>Account No.</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account no." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* {accountTypeData &&
                            accountTypeData.length > 0 &&
                            accountTypeData.map(({ Id, Option_Value }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Option_Value}
                              </SelectItem>
                            ))} */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                <h3 className="w-full text-center text-xl font-semibold">
                  Basic Info Block
                </h3>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                  <FormField
                    control={form.control}
                    name="openDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Open Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter open date"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        {<FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="investmestAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investmest Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter investmest amount"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rateOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Of Interest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter rate of interest"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maturityDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maturity Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter maturity date"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        {<FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maturityAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maturity Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter maturity amount"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                <h3 className="w-full text-center text-xl font-semibold">
                  Renewal Info Block
                </h3>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                  <FormField
                    control={form.control}
                    name="newInvestmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter investment amount"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closingInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Interest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter closing interest"
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
                    name="tdsAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TDS Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tds amount"
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
                    name="chargeAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Charge Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter charge amount"
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
                    name="transMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col md:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full h-fit self-end">
                        <FormLabel>Select transanction mode</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 gap-x-5"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="bank" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bank
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 
                {true && (
                  <div className="w-full h-full flex flex-col md:col-span-2 gap-5 p-2 md:p-5 rounded-md border border-primary">
                    <h3 className="text-center font-semibold text-xl mb-5">
                      Cash Table
                    </h3>
                    <CashDenomTable
                    // notes={notes}
                    // denominators={inDenominators}
                    // totalAmount={cashInTransactionTotal}
                    // cashTransactionGrandTotal={
                    //   cashInTransactionGrandTotal
                    // }
                    // handleDenominatorChange={handleInDenominatorChange}
                    // amountTobePaid={Number(
                    //   form.getValues("totalAmount")
                    // )}
                    // outTable={false}
                    />
                  </div>
                )} */}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full sm:w-1/5 self-end"
                // disabled={
                //   Number(cashInTransactionGrandTotal) -
                //     Number(cashOutTransactionGrandTotal) !==
                //   Number(form.getValues("refundAmt"))
                // }
              >
                Add
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  );
};
export default InvestmentClose;
