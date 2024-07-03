// components/formSchema.ts
import { z } from "zod"

export const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})
