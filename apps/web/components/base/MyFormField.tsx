"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormType {
  [key: string]: any;
}

function MyFormField({
  form,
  name,
  placeholder,
  label,
  readonly
}: Readonly<{ form: FormType; name: string; placeholder: string; label?: string,readonly?:boolean }>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="input-bordered"
              {...field}
              placeholder={placeholder}
              readOnly={readonly}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MyFormField;
