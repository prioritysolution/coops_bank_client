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

const InvestmentRenewal = () => {
  const form = useForm();
  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Investment Renewal</h3>

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
                    name="renewalDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-end">
                        <FormLabel>Renewal Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MM-yyyy")
                                ) : (
                                  <span>Pick renewal date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter duration"
                            // disabled={admissionDisable}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="durationUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration unit" />
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

                  <FormField
                    control={form.control}
                    name="newRateOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Of Interest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter rate of interest"
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
                    name="matureDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-end">
                        <FormLabel>Mature Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MM-yyyy")
                                ) : (
                                  <span>Pick mature date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="matureAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mature Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter mature amount"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
export default InvestmentRenewal;
