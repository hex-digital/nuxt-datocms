import type { RuntimeConfig } from '@nuxt/schema';

import { useQuerySubscription } from 'vue-datocms';
import { PREVIEW_MODE_COOKIE_NAME, isEnabledPreview } from './preview';
import type { Preview } from './preview';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useCookie } from '#app';

export async function fetchPublished({
  endpoint,
  token,
  preview,
  query,
  variables,
  environment,
}: {
  endpoint: string
  token: string
  preview: boolean
  query: any
  variables: Record<string, any>
  environment?: string
}) {
  const data: Ref = ref(null);

  let fullEndpoint = endpoint;

  if (environment) {
    fullEndpoint = `${fullEndpoint}/environments/${environment}`;
  }

  if (preview) {
    fullEndpoint = `${fullEndpoint}/preview`;
  }

  // @TODO: Should this be changed to `$fetch`?
  const fetchedData = await fetch(
    fullEndpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  ).then(response => response.json());

  if ('errors' in fetchedData) {
    throw JSON.stringify(fetchedData.errors);
  }

  if ('data' in fetchedData) {
    data.value = fetchedData.data;
  }

  return { data };
}

export function subscribeToContentUpdates({
  query,
  variables = {},
  token,
  initialData,
  environment,
  includeDrafts = false,
}: {
  query: any
  variables?: Record<string, any>
  token: string
  initialData: any
  environment?: string
  includeDrafts?: boolean
}) {
  return useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    environment,
    includeDrafts,
  });
}

/**
 * Retrieve an object containing a boolean for preview mode, and a string for the token to use for this request.
 * The token retrieved is dependent on if preview mode is active or not. If it's active (a preview-cookie is found)
 * then it will attempt to retrieve a preview-enabled token from the server to make the request with.
 * If it cannot be retrieved, this function will error.
 */
export async function previewAndToken(runtimeConfig: RuntimeConfig) {
  let preview = isPreviewEnabled(runtimeConfig); // If User has turned on preview mode
  let token: string | undefined;

  if (preview) {
    token = await draftEnabledToken(runtimeConfig);
  }

  // If token comes back undefined, then User's cookie does not have the correct hash,
  // so we can't give them preview mode
  if (!token) {
    preview = false;
    token = await publicReadOnlyToken(runtimeConfig);
  }

  return {
    preview,
    token,
  };
}

/**
 * Checks if preview mode is enabled.
 * Currently this is just the presence of a cookie with a specific name.
 */
function isPreviewEnabled(_runtimeConfig: RuntimeConfig): boolean {
  const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME);

  return !!cookie.value;
}

/**
 * Get a token that can be used in preview mode to view drafts
 * For security, we do not bundle this in the client distributable. So, from the client, we must use
 * retrieve it from a serverless function, where we can access the private token from env.
 */
export async function draftEnabledToken(runtimeConfig: RuntimeConfig) {
  if (process.server) {
    return runtimeConfig.datocms.privateDraftEnabledToken;
  }

  if (process.client) {
    const preview = await $fetch<Preview>('/api/preview');

    if (isEnabledPreview(preview)) {
      return preview.token;
    }
  }

  return undefined;
}

/**
 * Get the read-only, non-draft token for regular use of the CMS.
 */
export async function publicReadOnlyToken(runtimeConfig: RuntimeConfig): Promise<string> {
  return runtimeConfig.public.datocms.publicReadOnlyToken;
}
