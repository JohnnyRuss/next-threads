"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/utils/validations/user";

import { isBase64Image } from "@/utils";
import { useUploadThing } from "@/services/uploadthing";

import { updateUser } from "@/database/actions/user.actions";

import Field from "./FormField";
import FormFieldImageLabel from "./FormFieldImageLabel";

import { UserInfoT } from "@/types/user";
interface OnboardingFormT {
  user: UserInfoT;
  btnTitle: string;
}

const OnboardingForm: React.FC<OnboardingFormT> = ({ user, btnTitle }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  console.log(user);
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

    if (!e.target.files || !e.target.files[0]) return;

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

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);

    try {
      if (hasImageChanged) {
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) values.profile_photo = imgRes[0].url;
      }

      await updateUser({
        bio: values.bio,
        image: values.profile_photo,
        name: values.name,
        userId: user.id,
        username: values.username,
        path: pathname,
      });

      if (pathname === "/profile/edit") router.back();
      else router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <Field
          formControl={form.control}
          name="profile_photo"
          formItemClasses="flex items-center gap-4"
          formLabelClasses="account-form_image-label"
          label={(field) => <FormFieldImageLabel src={field.value} />}
          controlledField={(field) => (
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload a photo"
              className="account-form_image-input"
              onChange={(e) => onImageChange(e, field.onChange)}
            />
          )}
        />

        <Field
          formControl={form.control}
          name="name"
          label={() => "Name"}
          controlledField={(field) => (
            <Input
              type="text"
              placeholder="name"
              className="account-form_input no-focus py-4"
              {...field}
            />
          )}
        />

        <Field
          formControl={form.control}
          name="username"
          label={() => "Username"}
          controlledField={(field) => (
            <Input
              type="text"
              placeholder="username"
              className="account-form_input no-focus py-4"
              {...field}
            />
          )}
        />

        <Field
          formControl={form.control}
          name="bio"
          label={() => "Bio"}
          controlledField={(field) => (
            <Textarea
              rows={10}
              placeholder="about you ..."
              className="account-form_input no-focus"
              {...field}
            />
          )}
        />

        <Button type="submit">{btnTitle}</Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
