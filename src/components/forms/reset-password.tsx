import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { Password } from "~/components/ui/custom/password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { resetPasswordZ } from "~/zod/authZ";

const Resetpassword: FunctionComponent<{
  token: string;
  className?: string;
}> = ({ className, token }) => {
  const router = useRouter();

  const resetPassword = api.auth.resetPassword.useMutation();

  const formSchema = resetPasswordZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: token,
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Resetting password...");
    resetPassword.mutate(
      {
        token: values.token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.success("Password reset successful!");
          void router.push("/login");
        },
        onError: ({ message }) => {
          toast.dismiss(toastId);
          toast.error(message);
          void router.push("/login");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8 ")}
      >
        <FormMessage className="flex justify-center text-center text-3xl text-white ">
          Reset password
        </FormMessage>

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="bg-[#494949] ">
                <Password placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl className="bg-[#494949] ">
                <Password placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className="bg-yellow-300 hover:bg-yellow-300" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Resetpassword;
