import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { CalendarDays, X } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as z from "zod";

const formSchema = z.object({
  dateTaken: z.date({ error: "Date taken is required" }),
  itemName: z.string().trim().min(1, { message: "Item name is required" }),
  quantity: z
    .string()
    .trim()
    .min(1, { message: "Quantity is required" })
    .superRefine((value, context) => {
      if (value === "") return;

      const quantity = Number(value);
      if (!Number.isFinite(quantity)) {
        context.addIssue({
          code: "custom",
          message: "Quantity must be a valid number",
        });
      } else if (quantity <= 0) {
        context.addIssue({
          code: "custom",
          message: "Quantity must be greater than 0",
        });
      }
    })
    .transform(Number),
  price: z
    .string()
    .trim()
    .min(1, { message: "Price is required" })
    .superRefine((value, context) => {
      if (value === "") return;

      const price = Number(value);
      if (!Number.isFinite(price)) {
        context.addIssue({
          code: "custom",
          message: "Price must be a valid number",
        });
      } else if (price <= 0) {
        context.addIssue({
          code: "custom",
          message: "Price must be greater than 0",
        });
      }
    })
    .transform(Number),
});

function AddDebt({ onClose }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateTaken: null,
      itemName: "",
      quantity: "",
      price: "",
    },
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-surface-secondary/10 backdrop-blur-xs">
      <Card className="flex w-1/2 flex-col bg-surface-default justify-center overflow-auto border-border-default px-space-component-padding-sm py-space-component-padding-md drop-shadow-xl/50 ring-0 max-sm:w-3/4">
        <CardHeader className="min-w-64 whitespace-nowrap">
          <CardTitle>Add debt</CardTitle>
          <CardDescription>Add new debt for John Ngugi</CardDescription>
          <CardAction>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={onClose}
              className="cursor-pointer text-icon-action hover:[&_svg]:text-icon-action-hover"
            >
              <X size="16" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="min-w-64 whitespace-nowrap">
          <form id="addDebt-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="dateTaken"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="mb-4" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="dateTaken">Date taken</FieldLabel>
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        id="dateTaken"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        showIcon
                        toggleCalendarOnIconClick
                        icon={<CalendarDays aria-hidden="true" />}
                        calendarIconClassName="left-0 top-1/2 -translate-y-1/2 cursor-pointer text-icon-placeholder"
                        wrapperClassName="w-full"
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                        customInput={
                          <Input
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            className={`focus:border-2 focus:ring-0 focus-visible:border-2 focus-visible:ring-0 ${
                              fieldState.invalid
                                ? "aria-invalid:border-border-error aria-invalid:ring-0 aria-invalid:focus:border-border-error aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:ring-0"
                                : "border-border-input-ring-default focus:border-border-input-ring-focus focus-visible:border-border-input-ring-focus"
                            }`}
                          />
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-sm text-text-error"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="itemName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="itemName"
                      >
                        Item Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="itemName"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        placeholder="e.g. maize flour 2kg"
                        className={`focus:border-2 focus:ring-0 focus-visible:border-2 focus-visible:ring-0 ${
                          fieldState.invalid
                            ? "aria-invalid:border-border-error aria-invalid:ring-0 aria-invalid:focus:border-border-error aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:ring-0"
                            : "border-border-input-ring-default focus:border-border-input-ring-focus focus-visible:border-border-input-ring-focus"
                        }`}
                      ></Input>
                      {fieldState.invalid && (
                        <FieldError
                          className="text-sm text-text-error"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <div className="flex gap-2">
                  <Controller
                    name="quantity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                        <Input
                          {...field}
                          id="quantity"
                          type="number"
                          step="any"
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          placeholder="e.g. 2"
                          className={`focus:border-2 focus:ring-0 focus-visible:border-2 focus-visible:ring-0 ${
                            fieldState.invalid
                              ? "aria-invalid:border-border-error aria-invalid:ring-0 aria-invalid:focus:border-border-error aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:ring-0"
                              : "border-border-input-ring-default focus:border-border-input-ring-focus focus-visible:border-border-input-ring-focus"
                          }`}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            className="text-sm text-text-error"
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="price">Price (Ksh)</FieldLabel>
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          step="any"
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          placeholder="e.g. 200"
                          className={`focus:border-2 focus:ring-0 focus-visible:border-2 focus-visible:ring-0 ${
                            fieldState.invalid
                              ? "aria-invalid:border-border-error aria-invalid:ring-0 aria-invalid:focus:border-border-error aria-invalid:focus-visible:border-border-error aria-invalid:focus-visible:ring-0"
                              : "border-border-input-ring-default focus:border-border-input-ring-focus focus-visible:border-border-input-ring-focus"
                          }`}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            className="text-sm text-text-error"
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex min-w-64 items-center justify-center">
          <div className="flex items-center justify-center gap-16 whitespace-nowrap max-sm:gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-card-debtor border border-border-default bg-surface-default px-space-component-padding-md hover:border-border-divider-default hover:bg-surface-default-hover-button max-[240px]:px-2"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              form="addDebt-form"
              type="submit"
              className="cursor-pointer rounded-card-debtor bg-surface-action px-space-component-padding-md text-text-on-action hover:bg-surface-action-hover max-[240px]:px-2"
            >
              Create debt
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddDebt;
