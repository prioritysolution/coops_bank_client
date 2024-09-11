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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSelector } from "react-redux";

const InterestPayout = ({
  loading,
  notes,
  inDenominators,
  outDenominators,
  cashInTransactionTotal,
  cashOutTransactionTotal,
  cashInTransactionGrandTotal,
  cashOutTransactionGrandTotal,
  handleInDenominatorChange,
  handleOutDenominatorChange,
  form,
  handleSubmit,
  handleBulkAccountSubmit,
  handleAccountFormSubmit,
  visibleBlock,
  successMessage,
  optionForm,
  handleOptionFormSubmit,
  showSearchAccountForm,
  showBulkAccountTable,
  disablePayoutTypeForm,
  transMode,
  postingType,
}) => {
  const singleAccountData = useSelector(
    (state) => state?.interestPayout?.singleAccountData
  );

  const bulkAccountData = useSelector(
    (state) => state?.interestPayout?.bulkAccountData
  );

  const bankAccountData = useSelector(
    (state) => state?.bankDeposit?.bankAccountData
  );

  const savingsAccountData = useSelector(
    (state) => state?.openDepositAccount?.ecsAccountData
  );

  const monthList = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Interest Payout</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
          <Form {...optionForm}>
            <form
              onSubmit={optionForm.handleSubmit(handleOptionFormSubmit)}
              className="w-full flex items-center justify-center mb-10"
              autoComplete="off"
            >
              <div className="w-full border border-primary rounded-lg p-5 gap-5">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
                  <FormField
                    control={optionForm.control}
                    name="payoutOn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col lg:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full">
                        <FormLabel>Select payout on</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={disablePayoutTypeForm}
                            className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 gap-x-5"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                On fixed Deposit
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mis" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                On MIS Deposit
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={optionForm.control}
                    name="postingType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col lg:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full">
                        <FormLabel>Select posting type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={disablePayoutTypeForm}
                            className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 gap-x-5"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="single" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Single Account
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="bulk" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bulk Account
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {postingType !== "single" && (
                    <FormField
                      control={optionForm.control}
                      name="payoutDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel>Payout Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  disabled={disablePayoutTypeForm}
                                  className={cn(
                                    "w-full pl-3 text-left ",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd-MM-yyyy")
                                  ) : (
                                    <span>Pick payout date</span>
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
                  )}

                  <FormField
                    control={optionForm.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {monthList &&
                              monthList.length > 0 &&
                              monthList.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={optionForm.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter year"
                            type="number"
                            min={1900}
                            max={2100}
                            {...field}
                          />
                        </FormControl>
                        {<FormMessage />}
                      </FormItem>
                    )}
                  />

                  <div
                    className={cn(`w-full flex items-end justify-end`, {
                      "xl:col-span-2": postingType === "single",
                    })}
                  >
                    <Button
                      type="submit"
                      className="w-full sm:w-1/3"
                      disabled={disablePayoutTypeForm}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          {showBulkAccountTable && (
            <div className="w-full h-full flex flex-col border border-primary rounded-lg py-5 gap-5">
              <h3 className="w-full text-center text-xl font-semibold">
                Interest Details
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Serial No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Account No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bulkAccountData.length > 0 ? (
                    bulkAccountData.map((data, index) => (
                      <TableRow key={data.Id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.Full_Name}</TableCell>
                        <TableCell>{data.Account_No}</TableCell>
                        <TableCell>
                          {format(data.Due_Date, "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>{data.Ins_Amount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {showSearchAccountForm && (
            <>
              <div className="w-full h-full mb-10">
                <AccountSearchForm handleSubmit={handleAccountFormSubmit} />
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="w-full h-full flex flex-col gap-10 justify-between"
                  autoComplete="off"
                >
                  {visibleBlock && (
                    <div className="w-full h-full flex flex-col border border-primary rounded-lg py-5 gap-5">
                      <h3 className="w-full text-center text-xl font-semibold">
                        Interest Details
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              Serial No.
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Account No.</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {singleAccountData.length > 0 ? (
                            singleAccountData.map((data, index) => (
                              <TableRow key={data.Id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.Full_Name}</TableCell>
                                <TableCell>{data.Account_No}</TableCell>
                                <TableCell>
                                  {format(data.Due_Date, "dd-MM-yyyy")}
                                </TableCell>
                                <TableCell>{data.Ins_Amount}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className=" text-center">
                                No results.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {visibleBlock && (
                    <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                      <h3 className="w-full text-center text-xl font-semibold">
                        Payout Info Block
                      </h3>
                      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                        <FormField
                          control={form.control}
                          name="paidDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col justify-end">
                              <FormLabel>Paid Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      disabled
                                      className={cn(
                                        "w-full pl-3 text-left ",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd-MM-yyyy")
                                      ) : (
                                        <span>Pick paid date</span>
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
                          name="interestAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interest Amount</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter interest amount"
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
                    <div className="w-full h-full flex flex-col border border-primary rounded-lg p-2 sm:p-5 gap-5">
                      <h3 className="w-full text-center text-xl font-semibold">
                        Transanction Block
                      </h3>
                      <div className="w-full border border-primary rounded-md p-5 mb-5">
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
                      {transMode === "cash" ? (
                        <div className="w-full flex flex-col lg:flex-row gap-10">
                          <div className="w-full ">
                            <h3 className="text-center font-semibold text-xl mb-5">
                              Cash In Table
                            </h3>
                            <CashDenomTable
                              notes={notes}
                              denominators={inDenominators}
                              totalAmount={cashInTransactionTotal}
                              cashTransactionGrandTotal={
                                cashInTransactionGrandTotal
                              }
                              handleDenominatorChange={
                                handleInDenominatorChange
                              }
                              amountTobePaid={Number(
                                form.getValues("interestAmount")
                              )}
                              outTable={false}
                            />
                          </div>
                          <div className="w-full ">
                            <h3 className="text-center font-semibold text-xl mb-5">
                              Cash Out Table
                            </h3>
                            <CashDenomTable
                              notes={notes}
                              denominators={outDenominators}
                              totalAmount={cashOutTransactionTotal}
                              cashTransactionGrandTotal={
                                cashOutTransactionGrandTotal
                              }
                              handleDenominatorChange={
                                handleOutDenominatorChange
                              }
                              amountTobePaid={
                                Number(cashInTransactionGrandTotal) -
                                Number(form.getValues("interestAmount"))
                              }
                              outTable={true}
                            />
                          </div>
                        </div>
                      ) : transMode === "bank" ? (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="bank"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select bank" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {bankAccountData &&
                                      bankAccountData.length > 0 &&
                                      bankAccountData.map(
                                        ({ Id, Bank_Name }) => (
                                          <SelectItem key={Id} value={`${Id}`}>
                                            {Bank_Name}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ) : (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="savings"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Savings</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select savings" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {savingsAccountData &&
                                      savingsAccountData.length > 0 &&
                                      savingsAccountData.map(
                                        ({ Id, Account_No }) => (
                                          <SelectItem key={Id} value={`${Id}`}>
                                            {Account_No}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {visibleBlock && (
                    <div className="w-full flex flex-col sm:flex-row text-center sm:text-start items-center justify-between gap-y-5">
                      <div>
                        {successMessage && (
                          <p className="text-green-600 text-lg">
                            {successMessage}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full sm:w-1/5"
                        disabled={
                          transMode === "cash" &&
                          Number(cashInTransactionGrandTotal) -
                            Number(cashOutTransactionGrandTotal) !==
                            Number(form.getValues("interestAmount"))
                        }
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </>
          )}

          {showBulkAccountTable && (
            <div className="w-full flex flex-col sm:flex-row text-center sm:text-start items-center justify-between gap-y-5 mt-10">
              <div>
                {successMessage && (
                  <p className="text-green-600 text-lg">{successMessage}</p>
                )}
              </div>
              <Button
                onClick={handleBulkAccountSubmit}
                className="w-full sm:w-1/5"
              >
                Add
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
export default InterestPayout;
