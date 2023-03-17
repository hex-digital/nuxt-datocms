import type { H3Event } from 'h3';
import { getCookie } from 'h3';
import { PREVIEW_MODE_COOKIE_NAME } from '../helpers/preview';
import { useRuntimeConfig } from '#imports';

/**
 * Can be added to a serverless function to get the preview token, if preview is enabled.
 * We check an encrypted cookie to determine if preview mode is enabled already or not.
 * It is enabled and disabled via separate endpoints.
 */
export async function getPreviewTokenIfEnabled(event: H3Event) {
  const runtimeConfig = useRuntimeConfig();

  const cookie = getCookie(event, PREVIEW_MODE_COOKIE_NAME);

  if (!cookie) {
    return { enabled: false };
  }

  const hash = runtimeConfig.datocms.previewModeEncryptionSecret;

  if (cookie === hash) {
    return {
      enabled: true,
      token: runtimeConfig.datocms.privateDraftEnabledToken,
    };
  }

  console.warn('User has preview cookie but hash does not match previewModeEncryptionSecret - disabling preview mode for this user');

  return { enabled: false };
}
