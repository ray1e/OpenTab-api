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
import { Field, FieldGroup, FieldLabel, FieldSet, FieldError} from "@/components/ui/field";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { z } from "zod";


function AddDebt() {
  const onSubmit = (data) => {
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver,
    defaultValues: {
      itemName: "",
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-secondary/10 backdrop-blur-sm">
      <Card className="flex w-1/2 flex-col justify-center overflow-auto border-border-default px-space-component-padding-sm py-space-component-padding-md shadow-md ring-0 max-sm:w-3/4">
        <CardHeader className="min-w-64 whitespace-nowrap">
          <CardTitle>Add debt</CardTitle>
          <CardDescription>Add new debt for John Ngugi</CardDescription>
          <CardAction>
            <Button
              variant="ghost"
              size="icon-sm"
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
                  name="itemName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="">
                      <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
                      <Input
                        {...field}
                        id="itemName"
                        autoComplete="off"
                        placeholder="e.g. maize flour 2kg"
                        className="border-border-input-ring-default focus:border-2 focus:border-border-input-ring-focus focus:ring-0 focus-visible:border-2 focus-visible:border-border-input-ring-focus focus-visible:ring-0"
                      ></Input>
                      {fieldState.invalid && (
                        <FieldError>{[fieldState.error]}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <div className="flex gap-2">
                  <Field>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      id="quantity"
                      autoComplete="off"
                      className="border-border-input-ring-default focus:border-2 focus:border-border-input-ring-focus focus:ring-0 focus-visible:border-2 focus-visible:border-border-input-ring-focus focus-visible:ring-0"
                      placeholder="e.g. 2"
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="price">Price (Ksh)</FieldLabel>
                    <Input
                      id="price"
                      autoComplete="off"
                      className="border-border-input-ring-default focus:border-2 focus:border-border-input-ring-focus focus:ring-0 focus-visible:border-2 focus-visible:border-border-input-ring-focus focus-visible:ring-0"
                      placeholder="e.g. 200"
                    ></Input>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex min-w-64 items-center justify-center">
          <div className="flex items-center justify-center gap-16 whitespace-nowrap max-sm:gap-4">
            <Button
              variant="outline"
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
