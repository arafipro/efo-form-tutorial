"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const requestFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "名前を入力してください" })
    .max(50)
    .regex(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー\s]+$/u, {
      message: "名前は漢字、ひらがな、カタカナで入力してください",
    }),
  nameKana: z
    .string()
    .trim()
    .min(1, { message: "よみがなを入力してください" })
    .max(50)
    .regex(/^[\p{Script=Hiragana}ー\s]+$/u, {
      message: "よみがなはひらがなで入力してください",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "メールアドレスを入力してください" })
    .max(50)
    .regex(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/u, {
      message: "メールアドレスを入力してください",
    }),
});

export default function RequestForm() {
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      fullName: "",
      nameKana: "",
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof requestFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名前&emsp;
                <span className="text-red-500">※必須</span>
              </FormLabel>
              <FormDescription>例：山田&emsp;太郎</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nameKana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名前（ひらがな）&emsp;
                <span className="text-red-500">※必須</span>
              </FormLabel>
              <FormDescription>例：やまだ&emsp;たろう</FormDescription>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>
                メールアドレス&emsp;
                <span className="text-red-500">※必須</span>
              </FormLabel>
              <FormDescription>例：yamada@gmail.com</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  );
}
