"use client";
import MemberSearchForm from "@/common/forms/MemberSearchForm";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSelector } from "react-redux";

const IssueMembership = ({
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
  handleMemberFormSubmit,
  visibleBlock,
  admissionDisable,
  successMessage,
  transMode,
}) => {
  const memberTypeData = useSelector(
    (state) => state?.shareProduct?.memberTypeData
  );

  const relationTypeData = useSelector(
    (state) => state?.memberProfile?.relationTypeData
  );

  const bankAccountData = useSelector(
    (state) => state?.bankDeposit?.bankAccountData
  );

  const startDate = useSelector(
    (state) => state?.footer?.footerData?.Start_Date
  );

  const endDate = useSelector((state) => state?.footer?.footerData?.End_Date);

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Issue Membership</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20 ">
          <div className="w-full h-full mb-10">
            <MemberSearchForm handleSubmit={handleMemberFormSubmit} />
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
                  </div>
                </div>
              )}

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Admission Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="memberType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Member Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select member type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {memberTypeData &&
                                memberTypeData.length > 0 &&
                                memberTypeData.map(({ Id, Option_Value }) => (
                                  <SelectItem key={Id} value={`${Id}`}>
                                    {Option_Value}
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
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel>Admission Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  disabled={admissionDisable}
                                  className={cn(
                                    "w-full pl-3 text-left ",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd-MM-yyyy")
                                  ) : (
                                    <span>Pick admission date</span>
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
                                  date > new Date(endDate) ||
                                  date < new Date(startDate)
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
                      name="admissionNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admission No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter admission no."
                              disabled={admissionDisable}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ledgerFolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ledger Folio</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter ledger folio"
                              disabled={admissionDisable}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="admissionFees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admission Fees</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter admission no."
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
                      name="noOfShare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Share</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter number of share"
                              type="number"
                              disabled={admissionDisable}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ratePerShare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate Per Share</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter rate per share"
                              type="number"
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
                      name="totalAmt"
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

              {visibleBlock && (
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Nominee Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="nomineeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominee Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter nominee name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomineeRelation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominee Relation</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select relation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {relationTypeData &&
                                relationTypeData.length > 0 &&
                                relationTypeData.map(({ Id, Option_Value }) => (
                                  <SelectItem key={Id} value={`${Id}`}>
                                    {Option_Value}
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
                      name="nomineeAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominee Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter nominee address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomineeAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominee Age</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter nominee age"
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
                          handleDenominatorChange={handleInDenominatorChange}
                          amountTobePaid={Number(form.getValues("totalAmt"))}
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
                                {/* {relationTypeData &&
                                  relationTypeData.length > 0 &&
                                  relationTypeData.map(
                                    ({ Id, Option_Value }) => (
                                      <SelectItem key={Id} value={`${Id}`}>
                                        {Option_Value}
                                      </SelectItem>
                                    )
                                  )} */}
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
                      <p className="text-green-600 text-lg">{successMessage}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-1/5"
                    disabled={
                      admissionDisable ||
                      Number(cashInTransactionGrandTotal) -
                        Number(cashOutTransactionGrandTotal) !==
                        Number(form.getValues("totalAmt"))
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
export default IssueMembership;
