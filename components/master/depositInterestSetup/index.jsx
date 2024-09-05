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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSelector } from "react-redux";

const DepositInterestSetup = ({
  loading,
  handleSubmit,
  handleAddTableData,
  form,
  tableData,
}) => {
  const depositInterestProductData = useSelector(
    (state) => state?.depositInterestSetup?.depositInterestProductData
  );

  const durationUnitData = useSelector(
    (state) => state?.openDepositAccount?.durationTypeData
  );

  return (
    <div className="w-full h-full flex justify-between p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col items-center border-primary rounded-lg border-[2px] sm:p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold">Deposit Interest Setup</h3>
        <ScrollArea className="w-full h-full">
          <div className="w-full h-full lg:px-20 px-5 py-5 flex flex-col gap-10 items-center justify-center ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddTableData)}
                className="w-full h-full "
                autoComplete="off"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 gap-x-5 xl:gap-x-20 gap-y-3 w-full p-5  lg:p-10  rounded-md border border-primary">
                  <FormField
                    control={form.control}
                    name="productId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={tableData && tableData.length > 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {depositInterestProductData &&
                              depositInterestProductData.length > 0 &&
                              depositInterestProductData.map(
                                ({ Id, Prd_SH_Name }) => (
                                  <SelectItem key={Id} value={`${Id}`}>
                                    {Prd_SH_Name}
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
                    name="effectFrom"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Effect From Date</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MM-yyyy")
                                ) : (
                                  <span>Pick effect from date</span>
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
                    name="effectUpto"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Effect Upto Date</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left ",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MM-yyyy")
                                ) : (
                                  <span>Pick effect upto date</span>
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
                    name="minimumDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter minimum duration"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maximumDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter maximum duration"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="durationUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {durationUnitData &&
                              durationUnitData.length > 0 &&
                              durationUnitData.map(({ Id, Option_Value }) => (
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
                    name="rateOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Of Interest</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter rate of interest"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex items-center justify-end lg:col-span-2">
                    <Button className="w-full  lg:w-1/3">Add</Button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="w-[300px] sm:w-full border border-primary rounded-md">
              <ScrollArea className="w-[300px] sm:w-full">
                <Table>
                  {tableData && tableData.length !== 0 && (
                    <TableCaption className="mb-5">
                      A list of your deposit interest of product.
                    </TableCaption>
                  )}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">
                        Product Name
                      </TableHead>
                      <TableHead className="text-center">Effect From</TableHead>
                      <TableHead className="text-center">Effect To</TableHead>
                      <TableHead className="text-center">
                        Rate Of Interest
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData && tableData.length !== 0 ? (
                      tableData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">
                            {data.productName}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.effect_frm}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.eff_to}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.roi}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-24 text-center text-gray-500"
                        >
                          No data found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button onClick={handleSubmit} className="w-full  lg:w-1/3">
                Submit
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default DepositInterestSetup;
