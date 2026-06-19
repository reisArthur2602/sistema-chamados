import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.url({ message: 'DATABASE_URL deve ser uma URL válida' }),
    DATABASE_USER: z.string().min(1, { message: 'DATABASE_USER é obrigatório' }),
    DATABASE_PASSWORD: z.string().min(1, { message: 'DATABASE_PASSWORD é obrigatório' }),
    DATABASE_NAME: z.string().min(1, { message: 'DATABASE_NAME é obrigatório' }),
    DATABASE_HOST: z.string().min(1, { message: 'DATABASE_HOST é obrigatório' }),
    DATABASE_PORT: z.coerce
        .number()
        .int()
        .positive({ message: 'DATABASE_PORT deve ser um número positivo' }),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VAPID_PRIVATE_KEY: z.string().min(1, { message: 'VAPID_PRIVATE_KEY é obrigatório' }),
    VAPID_SUBJECT: z.string().min(1, { message: 'VAPID_SUBJECT é obrigatório' }),
    JWT_SECRET: z.string().min(32, { message: 'JWT_SECRET deve ter pelo menos 32 caracteres' }),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    NODE_ENV: process.env.NODE_ENV,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_SUBJECT: process.env.VAPID_SUBJECT,
    JWT_SECRET: process.env.JWT_SECRET,
});
