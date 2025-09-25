import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().optional().default(3000),
  SECRET_KEY: z.string(),
  AWS_SECRET_BUCKET_NAME: z.string(),
  AWS_SECRET_BUCKET_REGION: z.string(),
  AWS_BUCKET_URL: z.string(),
  AWS_SECRET_BUCKET_PROFILE: z.string()
})

export type Env = z.infer<typeof envSchema>