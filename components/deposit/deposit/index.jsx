"use client";

import AccountSearchForm from "@/common/forms/AccountSearchForm";
import CashDenomTable from "@/common/tables/CashDenomTable";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

const Deposit = ({
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
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Deposit</h3>

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
                      name="lastDepositDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last deposit date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last deposit date"
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
                      name="lastDepositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Deposit Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last deposit amount"
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
                      name="installmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Installment Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter installment amount"
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
                              placeholder="Enter maturity Amount"
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

                    <FormField
                      control={form.control}
                      name="rateOfInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate Of Interest</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter rate of interest"
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
                      name="depositDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deposit Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter deposit date"
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
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fineAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fine Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter fine amount"
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
                      name="totalAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter total amount"
                              type="number"
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

              {(form.getValues("joint1") || form.getValues("joint2")) && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Joint Holders Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    {form.getValues("joint1") && (
                      <FormField
                        control={form.control}
                        name="joint1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joint 1</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter joint 1"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {form.getValues("joint2") && (
                      <FormField
                        control={form.control}
                        name="joint2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joint 2</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter joint 2"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
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
                          notes={notes}
                          denominators={inDenominators}
                          totalAmount={cashInTransactionTotal}
                          cashTransactionGrandTotal={
                            cashInTransactionGrandTotal
                          }
                          handleDenominatorChange={handleInDenominatorChange}
                          amountTobePaid={Number(form.getValues("totalAmount"))}
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
                          handleDenominatorChange={handleOutDenominatorChange}
                          amountTobePaid={
                            Number(cashInTransactionGrandTotal) -
                            Number(form.getValues("totalAmount"))
                          }
                          outTable={true}
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
                    disabled={
                      !Number(form.getValues("totalAmount")) ||
                      Number(cashInTransactionGrandTotal) -
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
      </div>
    </div>
  );
};
export default Deposit;
