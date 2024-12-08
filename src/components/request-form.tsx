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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const requestFormSchema = z.object({
  // fullName: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "名前を入力してください" })
  //   .max(50)
  //   .regex(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー\s]+$/u, {
  //     message: "名前は漢字、ひらがな、カタカナで入力してください",
  //   }),
  // nameKana: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "よみがなを入力してください" })
  //   .max(50)
  //   .regex(/^[\p{Script=Hiragana}ー\s]+$/u, {
  //     message: "よみがなはひらがなで入力してください",
  //   }),
  // email: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "メールアドレスを入力してください" })
  //   .max(50)
  //   .regex(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/u, {
  //     message: "メールアドレスを入力してください",
  //   }),
  postalCode: z
    .string()
    .min(7, { message: "郵便番号を入力してください" })
    .regex(/^\d{7}$/u, {
      message: "郵便番号を入力してください",
    })
    .optional(),
});

export default function RequestForm() {
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      // fullName: "",
      // nameKana: "",
      // email: "",
      postalCode: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof requestFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                郵便番号&emsp;
                <span>※任意</span>
              </FormLabel>
              <FormDescription>例：000-0000</FormDescription>
              <FormControl>
                <InputOTP
                  maxLength={7}
                  {...field}
                  inputMode="numeric"
                  onChange={async (value) => {
                    field.onChange(value); // フィールドの値を更新
                    const postalCode = value.replace(/-/g, ""); // ハイフンを削除
                    if (postalCode.length === 7) {
                      // 住所取得APIを呼び出す
                      const response = await fetch(
                        `https://jp-postal-code-api.ttskch.com/api/v1/${postalCode}.json`
                      );
                      const data = await response.json();
                      // 取得した住所をフォームに設定する処理を追加
                      // 例: setValue('address', data.address);
                      console.log(
                        `${data.addresses[0].ja.prefecture}${data.addresses[0].ja.address1}${data.addresses[0].ja.address2}`
                      );
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot className="bg-white" index={0} />
                    <InputOTPSlot className="bg-white" index={1} />
                    <InputOTPSlot className="bg-white" index={2} />
                  </InputOTPGroup>
                  <span className="flex items-center justify-center">ー</span>
                  <InputOTPGroup>
                    <InputOTPSlot className="bg-white" index={3} />
                    <InputOTPSlot className="bg-white" index={4} />
                    <InputOTPSlot className="bg-white" index={5} />
                    <InputOTPSlot className="bg-white" index={6} />
                  </InputOTPGroup>
                </InputOTP>
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
