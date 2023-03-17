import { eventHandler } from 'h3';
import { disablePreview } from '../disable-preview';

export default eventHandler(async (event) => {
  return disablePreview(event);
});
