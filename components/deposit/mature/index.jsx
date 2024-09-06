"use client";

import AccountSearchForm from "@/common/forms/AccountSearchForm";
import AccountSearchTable from "@/common/tables/AccountSearchTable";
import CashDenomTable from "@/common/tables/CashDenomTable";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

const Mature = ({
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
  handleAccountFormSubmit,
  visibleBlock,
  successMessage,
  showLedger,
  handleSeeSpecimen,
  photoLink,
  signatureLink,
  optionForm,
  handleOptionFormSubmit,
  showSearchAccountForm,
  disableOperationTypeForm,
  transMode,
  handleSearchAccountListByMemberNo,
  handleSearchAccountListByName,
  handleSelectClick,
  dialougeOpen,
  setDialougeOpen,
  handleFetchData,
  savingsAccountFullName,
  savingsAccountBalance,
  showMatureDialog,
  setShowMatureDialog,
  handleCancelPremature,
  getDepositMaturityInterestApiCall,
  getDepositMaturityBonusInterestApiCall,
  showBonusDialog,
  setShowBonusDialog,
}) => {
  const [bonusInterest, setBonusInterest] = useState("");

  const bankAccountData = useSelector(
    (state) => state?.bankDeposit?.bankAccountData
  );

  const accountListData = useSelector(
    (state) => state?.deposit?.searchAccountData
  );

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Close / Mature</h3>

        <Form {...optionForm}>
          <form
            onSubmit={optionForm.handleSubmit(handleOptionFormSubmit)}
            className="w-full flex items-center justify-center px-2 sm:px-10 2xl:px-20"
            autoComplete="off"
          >
            <div className="w-full border border-primary rounded-lg p-5 gap-5">
              <div className="w-full flex items-center justify-center gap-10">
                <FormField
                  control={optionForm.control}
                  name="operationType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:flex-row items-center space-y-0 gap-x-10 gap-y-5   border border-input rounded-md px-3 pr-10 py-3 w-full">
                      <FormLabel>Operation Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={disableOperationTypeForm}
                          className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 gap-x-5"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="close" />
                            </FormControl>
                            <FormLabel className="font-normal">Close</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mature" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Mature
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full sm:w-1/5"
                  disabled={disableOperationTypeForm}
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {showSearchAccountForm && (
          <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
            <div className="w-full h-full mb-10">
              <AccountSearchForm
                handleSubmit={handleAccountFormSubmit}
                showLedger={showLedger}
              />
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
                        name="memberNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Member No.</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter member no."
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
                        name="cifNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CIF No.</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter cif no."
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

                      {optionForm.getValues("operationType") !== "close" && (
                        <>
                          <FormField
                            control={form.control}
                            name="maturityDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-end">
                                <FormLabel>Maturity Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        disabled
                                        className={cn(
                                          "w-full pl-3 text-left ",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd-MM-yyyy")
                                        ) : (
                                          <span>Pick maturity date</span>
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
                        </>
                      )}

                      <FormField
                        control={form.control}
                        name="availableBalance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Balance</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter available balance"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={handleSeeSpecimen}
                            className="self-end"
                          >
                            See Specimen
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[925px]">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                            <div className="flex flex-col items-center gap-2 text-center font-semibold">
                              <h3>Photo</h3>
                              <div className=" w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] xl:w-[400px] xl:h-[400px] border border-primary mx-auto relative">
                                {photoLink && (
                                  <Image fill alt="" src={photoLink} />
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center font-semibold">
                              <h3>Signature</h3>
                              <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] xl:w-[400px] xl:h-[400px] border border-primary mx-auto relative">
                                {signatureLink && (
                                  <Image fill alt="" src={signatureLink} />
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}

                {visibleBlock && (
                  <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                    <h3 className="w-full text-center text-xl font-semibold">
                      Close Info Block
                    </h3>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 items-end">
                      <FormField
                        control={form.control}
                        name="closeDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-end">
                            <FormLabel>Close Date</FormLabel>
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
                                      <span>Pick close date</span>
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
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Princpal Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter amount"
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
                        name="interest"
                        className=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Interest</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter interest"
                                className=""
                                {...field}
                                // disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bonusInterest"
                        className=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Bonus Interest</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter bonus interest"
                                className=""
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
                        name="totalAmount"
                        className=""
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter total amount"
                                className=""
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div
                        className="text-nowrap px-3 py-2 rounded-md cursor-pointer bg-primary text-white h-fit text-center"
                        onClick={getDepositMaturityInterestApiCall}
                      >
                        <p>Calculate Interest</p>
                      </div>
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
                                value={field.value}
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
                            Cash Out Table
                          </h3>
                          <CashDenomTable
                            notes={notes}
                            denominators={inDenominators}
                            totalAmount={cashInTransactionTotal}
                            cashTransactionGrandTotal={
                              cashInTransactionGrandTotal
                            }
                            handleDenominatorChange={handleInDenominatorChange}
                            amountTobePaid={Number(form.getValues("totalAmt"))}
                            outTable={false}
                          />
                        </div>
                        <div className="w-full ">
                          <h3 className="text-center font-semibold text-xl mb-5">
                            Cash In Table
                          </h3>
                          <CashDenomTable
                            notes={notes}
                            denominators={outDenominators}
                            totalAmount={cashOutTransactionTotal}
                            cashTransactionGrandTotal={
                              cashOutTransactionGrandTotal
                            }
                            handleDenominatorChange={handleOutDenominatorChange}
                            amountTobePaid={
                              Number(cashInTransactionGrandTotal) -
                              Number(form.getValues("totalAmt"))
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
                      </div>
                    ) : (
                      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-end">
                        <Dialog
                          open={dialougeOpen}
                          onOpenChange={setDialougeOpen}
                        >
                          <FormField
                            control={form.control}
                            name="savingsAccountNo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account No.</FormLabel>

                                <FormControl>
                                  <div className="flex flex-col sm:flex-row items-end gap-5">
                                    <div className="w-full">
                                      <div className="relative w-full">
                                        <Input
                                          placeholder="Enter account no."
                                          className="w-full "
                                          type="number"
                                          // onInput={(e) => {
                                          //   if (e.target.value.length > 5) {
                                          //     e.target.value = e.target.value.slice(0, 5);
                                          //   }
                                          // }}
                                          {...field}
                                        />

                                        <div className="absolute right-0 top-0 py-3 px-3">
                                          <DialogTrigger
                                            asChild
                                            className="cursor-pointer text-lg"
                                          >
                                            <IoSearch />
                                          </DialogTrigger>
                                        </div>
                                      </div>
                                      <FormMessage />
                                    </div>
                                    <div
                                      onClick={handleFetchData}
                                      className="px-5 py-2 bg-primary rounded-md text-white font-medium text-nowrap"
                                    >
                                      Fetch Data
                                    </div>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <DialogContent className="">
                            <DialogHeader
                              className={`w-full flex items-center justify-center`}
                            >
                              <DialogTitle>Search Account</DialogTitle>
                            </DialogHeader>
                            <div className="w-full">
                              <div className="w-full ">
                                <Tabs
                                  defaultValue="account"
                                  className="w-full flex items-center justify-center flex-col"
                                >
                                  <TabsList className="w-[70%]">
                                    <TabsTrigger
                                      value="memberNo"
                                      className="w-full"
                                    >
                                      By Member No.
                                    </TabsTrigger>
                                    <TabsTrigger
                                      value="name"
                                      className="w-full"
                                    >
                                      By Name
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent
                                    value="memberNo"
                                    className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 "
                                  >
                                    <FormField
                                      control={form.control}
                                      name="dialougeMemberNo"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Member No.</FormLabel>
                                          <FormControl>
                                            <Input
                                              autoComplete="off"
                                              placeholder="Search by enter member no."
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      className="px-10"
                                      onClick={
                                        handleSearchAccountListByMemberNo
                                      }
                                    >
                                      Search
                                    </Button>
                                  </TabsContent>
                                  <TabsContent
                                    value="name"
                                    className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 "
                                  >
                                    <FormField
                                      control={form.control}
                                      name="dialougeAccountName"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              autoComplete="off"
                                              placeholder="Search by enter name"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      className="px-10"
                                      onClick={handleSearchAccountListByName}
                                    >
                                      Search
                                    </Button>
                                  </TabsContent>
                                </Tabs>
                              </div>
                              <div className="w-full ">
                                <AccountSearchTable
                                  data={accountListData}
                                  handleSelectData={handleSelectClick}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {savingsAccountFullName && (
                          <FormField
                            control={form.control}
                            name="savingsAccountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter name"
                                    value={savingsAccountFullName}
                                    // {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {savingsAccountBalance && (
                          <FormField
                            control={form.control}
                            name="savingsAccountBalance"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Balance</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter balance"
                                    value={savingsAccountBalance}
                                    // {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
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
                        optionForm.getValues("operationType") === "close"
                          ? Number(cashInTransactionGrandTotal) -
                              Number(cashOutTransactionGrandTotal) !==
                            Number(form.getValues("amount"))
                          : Number(cashInTransactionGrandTotal) -
                              Number(cashOutTransactionGrandTotal) !==
                            Number(form.getValues("totalAmount"))
                      }
                    >
                      Add
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </ScrollArea>
        )}
      </div>
      <Dialog open={showMatureDialog} onOpenChange={setShowMatureDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="w-full text-center">
            Mature Date Exceeds
          </DialogTitle>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <p className="w-full text-center">
              Your maturity date is{" "}
              <span className="font-semibold">
                {form.getValues("maturityDate") &&
                  format(form.getValues("maturityDate"), "dd-MM-yyyy")}
                .
              </span>{" "}
              Do you want to pre-mature this account ?
            </p>
            <div className="w-full flex items-center justify-between gap-2 ">
              <Button
                className="px-6 bg-destructive hover:bg-destructive/90"
                onClick={handleCancelPremature}
              >
                No
              </Button>
              <Button
                className="px-6"
                onClick={() => setShowMatureDialog(false)}
              >
                Yes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBonusDialog} onOpenChange={setShowBonusDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="w-full text-center">
            Bonus Interest
          </DialogTitle>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <p className="w-full text-center">
              Your maturity date is{" "}
              <span className="font-semibold">
                {form.getValues("maturityDate") &&
                  format(form.getValues("maturityDate"), "dd-MM-yyyy")}
                .
              </span>{" "}
              Do you want bonus interest to this account ?
            </p>

            <Input
              placeholder="Enter bonus interest"
              type="number"
              value={bonusInterest}
              onChange={(e) => setBonusInterest(e.target.value)}
            />

            <div className="w-full flex items-center justify-between gap-2 ">
              <Button
                className="px-6 bg-destructive hover:bg-destructive/90"
                onClick={() => setShowBonusDialog(false)}
              >
                No
              </Button>
              <Button
                className="px-6"
                onClick={() =>
                  getDepositMaturityBonusInterestApiCall(bonusInterest)
                }
              >
                Yes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Mature;
