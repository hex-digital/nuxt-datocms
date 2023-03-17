/**
 * This file is originally based off of the DatoCMS Nuxt example. Permalink is here (check repo for updates):
 * https://github.com/datocms/nuxtjs-demo/blob/39dd69e1ecf5356fd1855a8cf8250e649cdc159b/composables/useGraphqlQuery.ts
 */

import { ref } from 'vue';
import { fetchPublished, subscribeToContentUpdates } from '../helpers/data-fetching';
import { useAsyncData, useNuxtApp, useRuntimeConfig } from '#app';
import type { AsyncDataOptions } from '#app';

interface UseDatoCmsParams {
  query: any
  variables?: Record<string, any>
  subscribe?: boolean | 'preview'
}

export async function useAsyncDatoCms({ query, variables = {}, subscribe = true }: UseDatoCmsParams, uniqueKey?: string, useAsyncOptions: AsyncDataOptions<any> = {}) {
  return useDatoQuery({ query, variables, subscribe }, true, uniqueKey, useAsyncOptions);
}

export async function useDatoCms({ query, variables = {}, subscribe = true }: UseDatoCmsParams) {
  return useDatoQuery({ query, variables, subscribe }, false);
}

async function useDatoQuery({ query, variables = {}, subscribe = true }: UseDatoCmsParams, asyncData = true, uniqueKey?: string, useAsyncOptions: AsyncDataOptions<any> = {}) {
  const { $datoCms } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();

  const endpoint = runtimeConfig.public.datocms.endpoint;
  const environment = runtimeConfig.public.datocms.environment;

  const { preview, token } = $datoCms.state.value;

  $datoCms.logger.debug('useDatoCms', variables, endpoint, environment);

  if (!token) {
    // If we had trouble initialising the plugin we might not have a token
    return { data: ref<any>(null) };
  }

  let response;
  const fetchOptions = {
    endpoint,
    environment,
    token,
    query,
    variables,
    preview,
  };

  if (asyncData) {
    if (!uniqueKey) {
      uniqueKey = `${JSON.stringify(query).split('{')[0]}${JSON.stringify(variables)}`;
    }
    response = await useAsyncData(
      uniqueKey,
      async () => {
        try {
          $datoCms.logger.info(`Running async query: ${uniqueKey}`);
          const { data } = await fetchPublished(fetchOptions);
          $datoCms.logger.trace(JSON.stringify(data.value, null, 2));
          $datoCms.logger.info(`Async query complete: ${uniqueKey}`);
          return data.value;
        } catch (err) {
          $datoCms.logger.error(uniqueKey, err);
          throw (err);
        }
      },
      useAsyncOptions,
    );

    if (response.error.value) {
      return response;
    }
  } else {
    $datoCms.logger.info(`Running query: ${uniqueKey}`);
    response = await fetchPublished(fetchOptions);
    $datoCms.logger.success(`Query complete: ${uniqueKey}`);
  }

  if (process.client) {
    if (subscribe === true || (subscribe === 'preview' && preview)) {
      return subscribeToContentUpdates({
        environment,
        token,
        query,
        variables,
        includeDrafts: preview,
        initialData: response.data.value,
      });
    }
  }

  return response;
}
