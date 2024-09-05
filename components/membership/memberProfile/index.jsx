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

const MemberProfile = ({
  form,
  handleSubmit,
  successMessage,
  handleDeleteSuccessMessage,
  memberNo,
}) => {
  const relationTypeData = useSelector(
    (state) => state?.memberProfile?.relationTypeData
  );

  const genderData = useSelector((state) => state?.memberProfile?.genderData);

  const casteData = useSelector((state) => state?.memberProfile?.casteData);

  const religionData = useSelector(
    (state) => state?.memberProfile?.religionData
  );

  const stateData = useSelector((state) => state?.operationalArea?.stateData);

  const districtData = useSelector(
    (state) => state?.operationalArea?.districtUnderStateData
  );

  const blockData = useSelector(
    (state) => state?.operationalArea?.blockUnderDistrict
  );

  const villageData = useSelector(
    (state) => state?.operationalArea?.villageUnderBlockData
  );

  const policeStationData = useSelector(
    (state) => state?.operationalArea?.policeStationUnderDistrict
  );

  const postOfficeData = useSelector(
    (state) => state?.operationalArea?.postOfficeUnderDistrict
  );

  const unitData = useSelector((state) => state?.operationalArea?.unitData);

  return (
    <div className="w-full h-full flex justify-between p-2 lg:p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col justify-start items-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 overflow-hidden">
        <h3 className="text-2xl font-semibold ">Add Member</h3>
        <div className="w-full h-full px-2 sm:px-10 2xl:px-20 overflow-y-scroll py-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full h-full flex flex-col justify-between gap-5"
              autoComplete="off"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-5 gap-y-3">
                <FormField
                  control={form.control}
                  name="memberNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter member no."
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter middle name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter relation name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation Type</FormLabel>
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
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col  justify-end">
                      <FormLabel>Date of Birth</FormLabel>
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
                                <span>Pick dob</span>
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderData &&
                            genderData.length > 0 &&
                            genderData.map(({ Id, Option_Value }) => (
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
                  name="caste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caste</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select caste" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {casteData &&
                            casteData.length > 0 &&
                            casteData.map(({ Id, Option_Value }) => (
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
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religion</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select religion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {religionData &&
                            religionData.length > 0 &&
                            religionData.map(({ Id, Option_Value }) => (
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
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No.</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mobile no." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email"
                          type="email"
                          {...field}
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
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateData &&
                            stateData.length > 0 &&
                            stateData.map(({ Id, State_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {State_Name}
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
                  name="districtId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !districtData ||
                          !(districtData.length > 0) ||
                          !(form.getValues("stateId").length > 0)
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districtData &&
                            districtData.length > 0 &&
                            districtData.map(({ Id, Dist_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Dist_Name}
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
                  name="blockId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Block</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !blockData ||
                          !(blockData.length > 0) ||
                          !(form.getValues("districtId").length > 0)
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select block" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {blockData &&
                            blockData.length > 0 &&
                            blockData.map(({ Id, Block_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Block_Name}
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
                  name="villageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !villageData ||
                          !(villageData.length > 0) ||
                          !(form.getValues("blockId").length > 0)
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select village" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {villageData &&
                            villageData.length > 0 &&
                            villageData.map(({ Id, Vill_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Vill_Name}
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
                  name="policeStationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Police Station</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !policeStationData ||
                          !(policeStationData.length > 0) ||
                          !(form.getValues("districtId").length > 0)
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select police station" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {policeStationData &&
                            policeStationData.length > 0 &&
                            policeStationData.map(({ Id, STation_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {STation_Name}
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
                  name="postOfficeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Office</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={
                          !postOfficeData ||
                          !(postOfficeData.length > 0) ||
                          !(form.getValues("districtId").length > 0)
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select post office" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {postOfficeData &&
                            postOfficeData.length > 0 &&
                            postOfficeData.map(({ Id, Post_Off_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Post_Off_Name}
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
                  name="unitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitData &&
                            unitData.length > 0 &&
                            unitData.map(({ Id, Unit_Name }) => (
                              <SelectItem key={Id} value={`${Id}`}>
                                {Unit_Name}
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
                  name="aadhaarNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar No.</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter aadhaar no" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voter Id</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter voter id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rationNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ration No.</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ration no." {...field} />
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
                        <Input placeholder="Enter pan no." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  {successMessage.length > 0 && (
                    <div>
                      <p>{successMessage}</p>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-1/5">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default MemberProfile;
