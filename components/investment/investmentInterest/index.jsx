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
import { useSelector } from "react-redux";

const InvestmentInterest = ({}) => {
  const form = useForm();
  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Investment Interest</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 justify-between items-center"
              autoComplete="off"
            >
              <div className="w-full xl:w-1/2 flex flex-col gap-5 border border-primary rounded-lg p-5">
                <FormField
                  control={form.control}
                  name="accountNo"
                  render={({ field }) => (
                    <FormItem>
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

                <FormField
                  control={form.control}
                  name="interestAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter interest amount"
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
                  name="interestDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="">
                        <p className="inline-block text-lg">Interest Date</p>
                      </div>
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
                                <span>Pick interest date</span>
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
                              date > new Date() || date < new Date("1900-01-01")
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
                  name="transMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col md:flex-row md:col-span-2 items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full">
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
                            <FormLabel className="font-normal">Bank</FormLabel>
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

                <Button type="submit" className=" w-full">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  );
};
export default InvestmentInterest;
