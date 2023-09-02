"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Field from "./FormField";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/utils/validations/commentValidation";

import { addComment } from "@/database/actions/thread.actions";

interface CommentFormT {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

const CommentForm: React.FC<CommentFormT> = ({
  currentUserId,
  currentUserImage,
  threadId,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    try {
      await addComment({
        threadId,
        commentText: values.thread,
        userId: currentUserId,
        path: pathname,
      });

      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <Field
            formControl={form.control}
            name="thread"
            formItemClasses="flex items-center gap-3 w-full"
            formControlClasses="bg-transparent border-none"
            label={() => (
              <>
                <figure className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={currentUserImage}
                    fill
                    alt="profile image"
                    className="object-cover"
                  />
                </figure>
              </>
            )}
            controlledField={(field) => (
              <Input
                type="text"
                placeholder="comment..."
                {...field}
                className="text-white"
              />
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
