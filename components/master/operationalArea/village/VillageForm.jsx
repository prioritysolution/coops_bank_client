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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VillageForm = ({
  loading,
  form,
  handleSubmit,
  editData,
  stateData,
  districtData,
  blockData,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 py-5"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter village name" {...field} />
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
              <FormLabel>Under State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormLabel>Under District</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
              <FormLabel>Under Block</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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

        <div className="w-full flex items-center justify-end">
          <Button type="submit">
            {editData && Object.keys(editData).length > 0 ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default VillageForm;
