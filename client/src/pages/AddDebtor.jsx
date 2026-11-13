import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input.jsx";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => {
        if (!value) return true;
        if (!/^\+?[0-9\s()-]+$/.test(value)) return false;
        const digitCount = value.replace(/\D/g, "").length;
        return digitCount >= 7 && digitCount <= 15;
      },
      {
        message: "Enter a valid phone number (7–15 digits)",
      },
    )
    .transform((value) => value || undefined),
});

function AddDebtor({ onClose }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-surface-secondary/10 backdrop-blur-xs">
      <Card className="flex w-1/2 flex-col bg-surface-default justify-center overflow-auto border-border-default px-space-component-padding-sm py-space-component-padding-md drop-shadow-xl/50 ring-0 max-sm:w-3/4">
        <CardHeader className="min-w-64 whitespace-nowrap">
          <CardTitle>Add debtor</CardTitle>
          <CardDescription>Add a new debtor</CardDescription>
          <CardAction>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={onClose}
              aria-label="Close add debtor form"
              className="cursor-pointer text-icon-action hover:[&_svg]:text-icon-action-hover"
            >
              <X size="16" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="min-w-64 whitespace-nowrap">
          <form id="addDebtor-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="debtor-name">Name</FieldLabel>
                      <Input
                        {...field}
                        id="debtor-name"
                        aria-invalid={fieldState.invalid}
                        autoComplete="name"
                        placeholder="e.g. John Ngugi"
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
                  name="phoneNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="debtor-phone">
                        Phone number (optional)
                      </FieldLabel>
                      <Input
                        {...field}
                        id="debtor-phone"
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        autoComplete="tel"
                        placeholder="e.g. 0797459821"
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
              form="addDebtor-form"
              type="submit"
              className="cursor-pointer rounded-card-debtor bg-surface-action px-space-component-padding-md text-text-on-action hover:bg-surface-action-hover max-[240px]:px-2"
            >
              Create debtor
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddDebtor;
