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
import { useSelector } from "react-redux";

const Transfer = ({
  loading,
  form,
  handleSubmit,
  successMessage,
  sendersAvailableBalance,
}) => {
  const bankAccountData = useSelector(
    (state) => state?.bankDeposit?.bankAccountData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Bank Transfer</h3>

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
                  name="transferDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel>Transfer Date</FormLabel>
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
                                <span>Pick transfer date</span>
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
                  name="senderBankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Bank Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sender bank account" />
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

                {sendersAvailableBalance !== null && (
                  <div>
                    <p>Available Balance : {sendersAvailableBalance}</p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="receiverBankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Bank Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.getValues("senderBankAccount")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select receiver bank account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bankAccountData &&
                            bankAccountData.length > 0 &&
                            bankAccountData
                              .filter(
                                ({ Id }) =>
                                  Id.toString() !==
                                  form.getValues("senderBankAccount")
                              )
                              .map(({ Id, Bank_Name }) => (
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
                  name="transferAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          type="number"
                          disabled={!form.getValues("senderBankAccount")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-col text-start items-center justify-between gap-y-5">
                  {successMessage && (
                    <div>
                      <p className="text-green-600 text-lg">{successMessage}</p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    // disabled={
                    //   Number(cashInTransactionGrandTotal) -
                    //     Number(cashOutTransactionGrandTotal) !==
                    //   Number(form.getValues("openingAmount"))
                    // }
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
export default Transfer;
