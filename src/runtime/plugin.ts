import consola from 'consola'; // @TODO remove consola and pass it in using Nuxt Config or a plugin instead
import { previewAndToken } from './helpers/data-fetching';
import type { LoggerObject } from './helpers/logger';
import { disabledLogger } from './helpers/logger';
import type { DatoCmsState } from './types';
import { defineNuxtPlugin, useRuntimeConfig, useState } from '#app';

export const DATO_STATE_KEY = 'datocms';

let logger: LoggerObject = disabledLogger;

export default defineNuxtPlugin(async (_NuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  // Find out what mode the User is in and get appropriate token for further requests in the app
  const { preview, token } = await previewAndToken(runtimeConfig);

  // Any state our DatoCMS integration will require
  const state = useState<DatoCmsState>(DATO_STATE_KEY, () => ({ preview, token }));

  // @TODO remove this and pass it in using Nuxt Config or a plugin instead, so we can remove the consola dependency
  setLogger(consola.withScope('datoCms'));

  return {
    provide: {
      datoCms: {
        state,
        logger,
        setLogger,
      },
    },
  };
});

function setLogger(loggerObject: LoggerObject) {
  logger = loggerObject;
}
