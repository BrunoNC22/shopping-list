import dotenv from "dotenv";

dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  GOOGLE_PRIVATE_API_KEY: z
    .string()
    .min(1, "GOOGLE_PRIVATE_API_KEY não pode estar vazia"),

  GOOGLE_PUBLIC_API_KEY: z
    .string()
    .min(1, "GOOGLE_PUBLIC_API_KEY não pode estar vazia"),

  DATABASE_URL: z
    .string()
    .url("DATABASE_URL deve ser uma URL válida"),

  JWT_SECRET: z
    .string()
    .min(10, "JWT_SECRET deve ter pelo menos 10 caracteres"),

  JWT_EXPIRATES_IN: z
    .coerce
    .number()
    .int("JWT_EXPIRATES_IN deve ser um número inteiro")
    .positive("JWT_EXPIRATES_IN deve ser positivo"),

  FRONTEND_URL: z
    .string()
    .url("FRONTEND_URL deve ser uma URL válida"),

  PORT: z
    .coerce
    .number()
    .int("PORT deve ser um número inteiro")
    .positive("PORT deve ser positivo")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:");

  parsed.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  process.exit(1);
}

export const env = parsed.data;

