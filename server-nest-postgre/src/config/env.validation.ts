import * as Joi from 'joi';

/**
 * Validates process.env at boot. NestJS ConfigModule runs this and refuses to
 * start if a required variable is missing — failing fast beats discovering a
 * missing secret on the first request.
 */
export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  CORS_ORIGINS: Joi.string().default('http://localhost:5173'),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(16).required(),

  IMAGEKIT_PUBLIC_KEY: Joi.string().allow('').default(''),
  IMAGEKIT_PRIVATE_KEY: Joi.string().allow('').default(''),
  IMAGEKIT_URL_ENDPOINT: Joi.string().allow('').default(''),

  STRIPE_SECRET_KEY: Joi.string().allow('').default(''),
  CLIENT_DOMAIN: Joi.string().default('http://localhost:5173'),
});
