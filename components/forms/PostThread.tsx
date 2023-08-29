"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/utils/validations/thread";

import { createThread } from "@/database/actions/thread.actions";

import Field from "./FormField";

interface PostThreadT {
  userId: string;
}

const PostThread: React.FC<PostThreadT> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ThreadValidation>) {
    try {
      await createThread({
        author: userId,
        communityId: null,
        path: pathname,
        text: values.thread,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <Field
          formControl={form.control}
          name="thread"
          formControlClasses="no-focus border border-dark-4 bg-dark-3 text-light-1"
          label={() => "Content"}
          controlledField={(field) => (
            <Textarea rows={15} placeholder="share your thread..." {...field} />
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
