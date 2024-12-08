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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  prefecture: z
    .string()
    .trim()
    .min(1, { message: "住所を入力してください" })
    .max(50),
  address: z
    .string()
    .trim()
    .min(1, { message: "住所を入力してください" })
    .max(50),
});

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

export default function RequestForm() {
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      // fullName: "",
      // nameKana: "",
      // email: "",
      postalCode: undefined,
      prefecture: "",
      address: "",
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-1/2">
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
                        if (!response.ok) {
                          form.setError("postalCode", {
                            type: "manual",
                            message: "郵便番号を確認してください。",
                          });
                          return; // エラーが発生した場合は処理を中断
                        }
                        const data = await response.json();
                        // 取得した住所をフォームに設定する処理を追加
                        const address =
                          data.addresses[0].ja.prefecture +
                          data.addresses[0].ja.address1 +
                          data.addresses[0].ja.address2;
                        console.log(address);
                        form.setValue("address", address); // 住所フィールドに設定
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
          <FormField
            control={form.control}
            name="prefecture"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>
                  都道府県&emsp;
                  <span>※任意</span>
                </FormLabel>
                <FormDescription>選択してください</FormDescription>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((prefecture) => (
                        <SelectItem key={prefecture} value={prefecture}>
                          {prefecture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                住所&emsp;
                <span>※任意</span>
              </FormLabel>
              <FormDescription>例：</FormDescription>
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
