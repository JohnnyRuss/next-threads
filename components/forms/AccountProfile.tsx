"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/utils/validations/user";

import { UserInfoT } from "@/types";
interface AccountProfileT {
  user: UserInfoT;
  btnTitle: string;
}

const AccountProfile: React.FC<AccountProfileT> = ({ user, btnTitle }) => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user.image || "",
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });

  function onImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChangeEvent: (value: string) => void
  ) {
    e.preventDefault();

    if (!Array.isArray(e.target.files) || !e.target.files[0]) return;

    const file: File = e.target.files[0];
    if (!file.type.includes("image")) return;

    setFiles(Array.from(e.target.files));

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async (e) => {
      const imageURL = e.target?.result?.toString() || "";

      fieldChangeEvent(imageURL);
    };
  }

  function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          name="profile_photo"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="object-contain rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => onImageChange(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="name"
                  className="account-form_input no-focus py-4"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="username"
                  className="account-form_input no-focus py-4"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="about you ..."
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">{btnTitle}</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
