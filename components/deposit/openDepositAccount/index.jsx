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
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { cn } from "@/lib/utils";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const OpenDepositAccount = ({
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
  handleJointAccountAdd,
  handleJointAccountDelete,
  checkDepositAmountDisable,
  checkDepositAmountMessage,
  checkDepositDurationDisable,
  checkDepositDurationMessage,
}) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const { getMemberDataByNameApiCall } = useIssueMembership();

  const orgId = getSessionStorageData("orgId");

  const accountTypeData = useSelector(
    (state) => state?.openDepositAccount?.depositAccountTypeData
  );

  const productData = useSelector(
    (state) => state?.openDepositAccount?.depositProductData
  );

  const durationTypeData = useSelector(
    (state) => state?.openDepositAccount?.durationTypeData
  );

  const relationTypeData = useSelector(
    (state) => state?.memberProfile?.relationTypeData
  );

  const maturityInstructionData = useSelector(
    (state) => state?.openDepositAccount?.maturityInstructionData
  );

  const operationModeData = useSelector(
    (state) => state?.openDepositAccount?.operationModeData
  );

  const memberDataByName = useSelector(
    (state) => state?.issueMembership?.memberDataByName
  ).filter((item) => item.Member_No !== form.getValues("memberNo"));

  const payoutModeData = useSelector(
    (state) => state?.openDepositAccount?.payoutModeData
  );

  const agentData = useSelector(
    (state) => state?.openDepositAccount?.depositAgentData
  );

  const handleSearchMember = () => {
    if (form.getValues("dialougeMemberName"))
      getMemberDataByNameApiCall(orgId, form.getValues("dialougeMemberName"));
    else toast.error("Please enter name");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!form.getValues("memberNo")) {
      setPhotoPreview(null);
      setSignaturePreview(null);
    }
  }, [form.getValues("memberNo")]);

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-2 lg:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Open Deposit Account</h3>

        <ScrollArea className="w-full h-full px-2 sm:px-10 2xl:px-20">
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
                    KYC Details Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="voterId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voter ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter voter id"
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
                      name="aadhaarNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhaar No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter aadhaar no."
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
                    Account Info Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accountTypeData &&
                                accountTypeData.length > 0 &&
                                accountTypeData.map(({ Id, Option_Value }) => (
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
                      name="depositProduct"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deposit Product</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={
                              !productData || !form.getValues("accountType")
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select deposit product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productData &&
                                productData.length > 0 &&
                                productData.map(({ Id, Prd_SH_Name }) => (
                                  <SelectItem key={Id} value={`${Id}`}>
                                    {Prd_SH_Name}
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
                      name="openingDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel>Opening Date</FormLabel>
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
                                    <span>Pick opening date</span>
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
                      name="accountNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manual Account No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account no." {...field} />
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
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="openingAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {productData.filter(
                              (item) =>
                                item.Id ===
                                Number(form.getValues("depositProduct"))
                            )[0]?.Deposit_Type &&
                            productData.filter(
                              (item) =>
                                item.Id ===
                                Number(form.getValues("depositProduct"))
                            )[0].Deposit_Type === 65
                              ? "Installment"
                              : "Opening"}{" "}
                            Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Enter ${
                                productData.filter(
                                  (item) =>
                                    item.Id ===
                                    Number(form.getValues("depositProduct"))
                                )[0]?.Deposit_Type &&
                                productData.filter(
                                  (item) =>
                                    item.Id ===
                                    Number(form.getValues("depositProduct"))
                                )[0].Deposit_Type === 65
                                  ? "Installment"
                                  : "Opening"
                              } amount`}
                              disabled={!form.getValues("depositProduct")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          {checkDepositAmountMessage && (
                            <p className="text-destructive text-sm">
                              {checkDepositAmountMessage}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    {form.getValues("accountType") &&
                      form.getValues("accountType") === "2" && (
                        <>
                          <FormField
                            control={form.control}
                            name="durationUnit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration Unit</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={checkDepositAmountDisable}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select duration unit" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {durationTypeData &&
                                      durationTypeData.length > 0 &&
                                      durationTypeData.map(
                                        ({ Id, Option_Value }) => (
                                          <SelectItem key={Id} value={`${Id}`}>
                                            {Option_Value}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter duration"
                                    disabled={
                                      checkDepositAmountDisable ||
                                      !form.getValues("durationUnit")
                                    }
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                                {checkDepositDurationMessage && (
                                  <p className="text-destructive text-sm">
                                    {checkDepositDurationMessage}
                                  </p>
                                )}
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
                                    placeholder="Enter rate of intrest"
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
                            name="maturityInstruction"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maturity Instruction</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={checkDepositAmountDisable}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select maturity instruction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {maturityInstructionData &&
                                      maturityInstructionData.length > 0 &&
                                      maturityInstructionData.map(
                                        ({ Id, Option_Value }) => (
                                          <SelectItem key={Id} value={`${Id}`}>
                                            {Option_Value}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isAvailEcs"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Is Avail ECS
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={checkDepositAmountDisable}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ecsAccount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ECS Account</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={!form.getValues("isAvailEcs")}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select ecs account" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {/* {operationModeData &&
                                operationModeData.length > 0 &&
                                operationModeData.map(
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
                          {!productData.filter(
                            (item) =>
                              item.Id ===
                              Number(form.getValues("depositProduct"))
                          )[0]?.Deposit_Type ||
                          productData.filter(
                            (item) =>
                              item.Id ===
                              Number(form.getValues("depositProduct"))
                          )[0]?.Deposit_Type === 7 ? (
                            <></>
                          ) : (
                            <>
                              <FormField
                                control={form.control}
                                name="isPayoutInterest"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">
                                        Is Payout Interest
                                      </FormLabel>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={checkDepositAmountDisable}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="payoutMode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Payout Mode</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      disabled={
                                        !form.getValues("isPayoutInterest")
                                      }
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select payout mode" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {payoutModeData &&
                                          payoutModeData.length > 0 &&
                                          payoutModeData.map(
                                            ({ Id, Option_Value }) => (
                                              <SelectItem
                                                key={Id}
                                                value={`${Id}`}
                                              >
                                                {Option_Value}
                                              </SelectItem>
                                            )
                                          )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="payoutAmount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Payout Amount</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter payout amount"
                                        disabled
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />{" "}
                            </>
                          )}
                        </>
                      )}

                    <FormField
                      control={form.control}
                      name="agentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={checkDepositAmountDisable}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select agent" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {agentData &&
                                agentData.length > 0 &&
                                agentData.map(({ Id, Agent_Name }) => (
                                  <SelectItem key={Id} value={`${Id}`}>
                                    {Agent_Name}
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
                      name="operationMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operation Mode</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={checkDepositAmountDisable}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select operation mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {operationModeData &&
                                operationModeData.length > 0 &&
                                operationModeData.map(
                                  ({ Id, Option_Value }) => (
                                    <SelectItem key={Id} value={`${Id}`}>
                                      {Option_Value}
                                    </SelectItem>
                                  )
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.getValues("jointHolderDetails").length > 0 &&
                      form.getValues("jointHolderDetails").map((item, id) => (
                        <div key={id} className="self-end">
                          <FormLabel>Joint Member {id + 1}</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-3  w-full">
                              <Input
                                placeholder={`Enter joint member ${id + 1}`}
                                disabled
                                value={item.Full_Name}
                              />

                              <Dialog>
                                <DialogTrigger asChild>
                                  <IoCloseCircleOutline className="text-destructive text-2xl" />
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[425px]">
                                  <div className="w-full flex flex-col gap-10 p-5">
                                    <p className="text-lg text-center">
                                      Are you sure to delete this member ?
                                    </p>

                                    <Button
                                      variant="destructive"
                                      className="w-full"
                                      onClick={() =>
                                        handleJointAccountDelete(item.Id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </FormControl>
                        </div>
                      ))}

                    {form.getValues("operationMode") &&
                      form.getValues("operationMode") !== "70" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex flex-col gap-2 w-full self-end">
                              <div className="bg-primary text-white rounded-md px-3 py-2 text-center cursor-pointer h-fit ">
                                Add Joint Member Details
                              </div>
                              {form.getValues("jointHolderDetails").length ===
                                0 && (
                                <p className={`text-destructive text-sm `}>
                                  {
                                    form?.formState?.errors?.jointHolderDetails
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                          </DialogTrigger>

                          <DialogContent className="">
                            <DialogHeader>
                              <DialogTitle>Search Members</DialogTitle>
                            </DialogHeader>
                            <div className="w-full">
                              <div className="w-full flex flex-col sm:flex-row items-end gap-2 gap-x-10 ">
                                <FormField
                                  control={form.control}
                                  name="dialougeMemberName"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Member Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          autoComplete="off"
                                          placeholder="Search by enter member name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <Button
                                  className="px-10"
                                  onClick={handleSearchMember}
                                >
                                  Search
                                </Button>
                              </div>
                              <div className="w-full ">
                                <MemberSearchTable
                                  data={memberDataByName}
                                  handleSelectData={handleJointAccountAdd}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
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
                <div className="w-full h-full flex flex-col border border-primary rounded-lg p-5 gap-5">
                  <h3 className="w-full text-center text-xl font-semibold">
                    Specimen Block
                  </h3>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:gap-20 gap-x-10 gap-y-3 ">
                    <FormField
                      control={form.control}
                      name="photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Photo</FormLabel>
                          <div className="w-[200px] h-[200px] border border-primary mx-auto relative">
                            {photoPreview && (
                              <Image
                                src={photoPreview}
                                alt="Photo Preview"
                                fill
                              />
                            )}
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Upload photo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handlePhotoChange(e);
                                field.onChange(e.target.files[0]);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="signature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Signature</FormLabel>
                          <div className="w-[200px] h-[200px] border border-primary mx-auto relative">
                            {signaturePreview && (
                              <Image
                                src={signaturePreview}
                                alt="Signature Preview"
                                className=""
                                fill
                              />
                            )}
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Upload signature"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handleSignatureChange(e);
                                field.onChange(e.target.files[0]);
                              }}
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
                          amountTobePaid={Number(
                            form.getValues("openingAmount")
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
                          handleDenominatorChange={handleOutDenominatorChange}
                          amountTobePaid={
                            Number(cashInTransactionGrandTotal) -
                            Number(form.getValues("openingAmount"))
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
                      Number(cashInTransactionGrandTotal) -
                        Number(cashOutTransactionGrandTotal) !==
                        Number(form.getValues("openingAmount")) ||
                      checkDepositAmountDisable ||
                      checkDepositDurationDisable
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
export default OpenDepositAccount;
