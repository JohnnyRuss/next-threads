import * as z from "zod";

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "min 3 characters" }),
});
