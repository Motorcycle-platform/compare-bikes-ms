import 'dotenv/config';

import * as joi from 'joi';

interface GlobalEnvVars {
  PORT: number;

  NATS_SERVERS: string[];

  JWT_SECRET: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),

  NATS_SERVERS: joi.array().items( joi.string() ).required(),
  JWT_SECRET: joi.string().required(),
})
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const globalEnvVars:GlobalEnvVars = value;


export const genvs = {
  port: globalEnvVars.PORT,

  natsServers: globalEnvVars.NATS_SERVERS,

  jwtSecret: globalEnvVars.JWT_SECRET,
};
