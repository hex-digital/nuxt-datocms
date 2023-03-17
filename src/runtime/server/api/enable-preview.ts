import { eventHandler } from 'h3';
import { enablePreview } from '../enable-preview';

export default eventHandler(async (event) => {
  return enablePreview(event);
});
