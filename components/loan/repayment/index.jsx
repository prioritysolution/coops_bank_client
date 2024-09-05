"use client";

import AccountSearchForm from "@/common/forms/AccountSearchForm";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const Repayment = () => {
  const form = useForm();
  const visibleBlock = true;
  const successMessage = "";
  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Loan Repayment</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <div className="w-full h-full mb-10">
            <AccountSearchForm handleSubmit={() => {}} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col gap-10 justify-between"
              autoComplete="off"
            >
              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Basic Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="accountNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter account no."
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
                  </div>
                </div>
              )}

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Deposit Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter account type"
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
                      name="disburseDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disburse Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter disburse date"
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
                      name="disburseAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disburse Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter disburse amount"
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
                      name="finalRepayDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Final Repay Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter final repay date"
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
                      name="repayMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repay Mode</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter repay mode"
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
                      name="installmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Installment Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter installment amount"
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
                      name="lastRepayDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Repay Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last repay date"
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
                      name="lastRepayPrincipal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Repay Principal</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last repay principal"
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
                      name="LastRepayInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Repay Interest</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last repay interest"
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
                      name="currentBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Balance</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter current balance"
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
                    Deposit Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="currentDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Days</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter current days"
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
                      name="overdueDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overdue Days</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter overdue days"
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
                      name="currentInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Interest</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter current interest"
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
                      name="overdueInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overdue Interest</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter overdue interest"
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
                    Deposit Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="repaymentDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel>Repayment Date</FormLabel>
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
                                    <span>Pick repayment date</span>
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
                      name="principalAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Principal Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter principal amount"
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
                          Cash Out Table
                        </h3>
                        <CashDenomTable
                        // notes={notes}
                        // denominators={inDenominators}
                        // totalAmount={cashInTransactionTotal}
                        // cashTransactionGrandTotal={
                        //   cashInTransactionGrandTotal
                        // }
                        // handleDenominatorChange={handleInDenominatorChange}
                        // amountTobePaid={Number(form.getValues("refundAmt"))}
                        // outTable={false}
                        />
                      </div>
                      <div className="w-full ">
                        <h3 className="text-center font-semibold text-xl mb-5">
                          Cash In Table
                        </h3>
                        <CashDenomTable
                        // notes={notes}
                        // denominators={outDenominators}
                        // totalAmount={cashOutTransactionTotal}
                        // cashTransactionGrandTotal={
                        //   cashOutTransactionGrandTotal
                        // }
                        // handleDenominatorChange={handleOutDenominatorChange}
                        // amountTobePaid={
                        //   Number(cashInTransactionGrandTotal) -
                        //   Number(form.getValues("refundAmt"))
                        // }
                        // outTable={true}
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
                    //   Number(form.getValues("refundAmt"))
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

export default Repayment;
