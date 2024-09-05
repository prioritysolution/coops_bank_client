"use client";

import AccountSearchForm from "@/common/forms/AccountSearchForm";
import CashDenomTable from "@/common/tables/CashDenomTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import Image from "next/image";

const Withdrawn = ({
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
}) => {
  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Withdrawn</h3>

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
                      name="lastWithdrawnDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Withdrawn date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last withdrawn date"
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
                      name="lastWithdrawnAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Withdrawn Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter last withdrawn amount"
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

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={handleSeeSpecimen}>
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
                    Withdrawn Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="withdrawnDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Withdrawn Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter withdrawn date"
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
                      name="withdrawnAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Withdrawn Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter withdrawn amount"
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
                          amountTobePaid={Number(
                            form.getValues("withdrawnAmount")
                          )}
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
                            Number(form.getValues("withdrawnAmount"))
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
                      !Number(form.getValues("withdrawnAmount")) ||
                      Number(cashInTransactionGrandTotal) -
                        Number(cashOutTransactionGrandTotal) !==
                        Number(form.getValues("withdrawnAmount"))
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
export default Withdrawn;
