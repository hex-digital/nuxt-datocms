export default defineNuxtConfig({
  modules: ['../src/module'],
  datocms: {
    publicReadOnlyToken: process.env.DATOCMS_API_PUBLIC_READ_ONLY_TOKEN,
    privateDraftEnabledToken: process.env.DATOCMS_API_DRAFT_ENABLED_TOKEN,
    privatePreviewModePassword: process.env.DATOCMS_PREVIEW_MODE_PASSWORD,
    privatePreviewModeEncryptionSecret: process.env.DATOCMS_PREVIEW_MODE_ENCRYPTION_SECRET,
  },
});
