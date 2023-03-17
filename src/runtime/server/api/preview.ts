import { eventHandler } from 'h3';
import { getPreviewTokenIfEnabled } from '../get-preview-token-if-enabled';

export default eventHandler(async (event) => {
  return getPreviewTokenIfEnabled(event);
});
