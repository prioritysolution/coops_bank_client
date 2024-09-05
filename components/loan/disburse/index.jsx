"use client";
import MemberSearchForm from "@/common/forms/MemberSearchForm";
import CashDenomTable from "@/common/tables/CashDenomTable";
import MemberSearchTable from "@/common/tables/MemberSearchTable";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const Disburse = ({}) => {
  const form = useForm();
  const visibleBlock = true;
  const successMessage = "";
  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Loan Disburse</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 justify-between"
              autoComplete="off"
            >
              <div className="w-full h-full flex flex-col items-center border border-primary rounded-lg p-5 gap-5">
                <div className="w-1/3 ">
                  <FormField
                    control={form.control}
                    name="application"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select application" />
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
              </div>

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Application Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="applicationNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter application no."
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
                      name="applicationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter application date"
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
                      name="memberName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Member Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter member name"
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
                      name="gurdianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gurdian Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter gurdian name"
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter address"
                              {...field}
                              className="resize-none"
                              disabled
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
                      name="panNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pan No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter pan no."
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
              )}

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Amount Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="applicationAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter application amount"
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shareBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Share Balance</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter share balance"
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="depositBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deposit Balance</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter deposit balance"
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Disburse Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="disburseDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel>Disburse Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  // disabled={admissionDisable}
                                  className={cn(
                                    "w-full pl-3 text-left ",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd-MM-yyyy")
                                  ) : (
                                    <span>Pick disburse date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-full p-0"
                              align="center"
                            >
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
                      name="disburseAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disburse Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter disburse amount"
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
                      name="shareAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Share Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter share amount"
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
                      name="depositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deposit Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter deposit amount"
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
                      name="miscCharge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Misc Charge</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter misc charge"
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
                      name="disburseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disburse Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select disburse type" />
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
                </div>
              )}

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-2 sm:p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Transanction Block
                  </h3>
                  <div className="w-full border border-primary rounded-md p-2 sm:p-5 mb-5">
                    <FormField
                      control={form.control}
                      name="transMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-col lg:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full lg:w-fit">
                          <FormLabel>Select transanction mode</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 gap-x-5"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cash" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Cash
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="bank" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Bank
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="savings" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Savings
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {true && (
                    <div className="w-full flex flex-col lg:flex-row gap-10">
                      <div className="w-full ">
                        <h3 className="text-center font-semibold text-xl mb-5">
                          Cash In Table
                        </h3>
                        <CashDenomTable
                        //   notes={notes}
                        //   denominators={inDenominators}
                        //   totalAmount={cashInTransactionTotal}
                        //   cashTransactionGrandTotal={
                        //     cashInTransactionGrandTotal
                        //   }
                        //   handleDenominatorChange={handleInDenominatorChange}
                        //   amountTobePaid={Number(
                        //     form.getValues("openingAmount")
                        //   )}
                        //   outTable={false}
                        />
                      </div>
                      <div className="w-full ">
                        <h3 className="text-center font-semibold text-xl mb-5">
                          Cash Out Table
                        </h3>
                        <CashDenomTable
                        //   notes={notes}
                        //   denominators={outDenominators}
                        //   totalAmount={cashOutTransactionTotal}
                        //   cashTransactionGrandTotal={
                        //     cashOutTransactionGrandTotal
                        //   }
                        //   handleDenominatorChange={handleOutDenominatorChange}
                        //   amountTobePaid={
                        //     Number(cashInTransactionGrandTotal) -
                        //     Number(form.getValues("openingAmount"))
                        //   }
                        //   outTable={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {visibleBlock && (
                <div className="w-full flex flex-col sm:flex-row text-center sm:text-start items-center justify-between gap-y-5">
                  <div>
                    {successMessage && (
                      <p className="text-green-600 text-lg">{successMessage}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-1/5"
                    // disabled={
                    //   Number(cashInTransactionGrandTotal) -
                    //     Number(cashOutTransactionGrandTotal) !==
                    //   Number(form.getValues("openingAmount"))
                    // }
                  >
                    Add
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Disburse;
