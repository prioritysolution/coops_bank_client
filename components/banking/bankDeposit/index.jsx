"use client";
import CashDenomTable from "@/common/tables/CashDenomTable";
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
import { useSelector } from "react-redux";

const BankDeposit = ({
  loading,
  notes,
  denominators,
  cashTransactionTotal,
  cashTransactionGrandTotal,
  handleDenominatorChange,
  form,
  handleSubmit,
  successMessage,
}) => {
  const bankAccountData = useSelector(
    (state) => state?.bankDeposit?.bankAccountData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Bank Deposit</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 justify-between items-center"
              autoComplete="off"
            >
              <div className="w-full xl:w-1/2 h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                <FormField
                  control={form.control}
                  name="bankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bankAccountData &&
                            bankAccountData.length > 0 &&
                            bankAccountData.map(({ Id, Bank_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Bank_Name}
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
                  name="depositDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel>Deposit Date</FormLabel>
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
                                <span>Pick deposit date</span>
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
                  name="availableBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Balance</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter available balance"
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
                  name="transMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full">
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
                            <FormLabel className="font-normal">Cash</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full p-3 border border-input rounded-md">
                  <h3 className="text-center font-semibold text-xl mb-5">
                    Cash Table
                  </h3>
                  <CashDenomTable
                    notes={notes}
                    denominators={denominators}
                    totalAmount={cashTransactionTotal}
                    cashTransactionGrandTotal={cashTransactionGrandTotal}
                    handleDenominatorChange={handleDenominatorChange}
                    amountTobePaid={Number(form.getValues("depositAmount"))}
                    outTable={false}
                  />
                </div>

                <div className="w-full flex flex-col sm:flex-row text-center sm:text-start items-center justify-between gap-x-5 gap-y-5">
                  <div>
                    {successMessage && (
                      <p className="text-green-600 text-lg">{successMessage}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-1/5"
                    disabled={
                      !Number(form.getValues("depositAmount")) ||
                      Number(cashTransactionGrandTotal) !==
                        Number(form.getValues("depositAmount"))
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  );
};
export default BankDeposit;
