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

const StateForm = ({ loading, form, handleSubmit, editData }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 py-5"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter state name" {...field} />
              </FormControl>
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
export default StateForm;
