import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.url({ message: 'DATABASE_URL deve ser uma URL válida' }),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    VAPID_PRIVATE_KEY: z.string().min(1, { message: 'VAPID_PRIVATE_KEY é obrigatório' }),
    VAPID_SUBJECT: z.string().min(1, { message: 'VAPID_SUBJECT é obrigatório' }),
    JWT_SECRET: z.string().min(32, { message: 'JWT_SECRET deve ter pelo menos 32 caracteres' }),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_SUBJECT: process.env.VAPID_SUBJECT,
    JWT_SECRET: process.env.JWT_SECRET,
});
