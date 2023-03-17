import type { H3Event } from 'h3';
import { PREVIEW_MODE_COOKIE_NAME } from '../helpers/preview';
import { deleteCookie, sendRedirect } from 'h3';

export async function disablePreview(event: H3Event) {
  deleteCookie(event, PREVIEW_MODE_COOKIE_NAME);

  const redirectUrl = '/';

  sendRedirect(event, redirectUrl);

  event.node.res.end();
}
