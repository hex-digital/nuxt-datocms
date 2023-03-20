<template>
  <div>
    <pre><code v-html="JSON.stringify(data, null, 2)" /></pre>
  </div>
</template>

<script setup>
import { useAsyncDatoCms } from '#imports';

const footerSettings = `
  query FooterSettings {
    footerSettings: footerSettingsModel {
      servicePartnersTitle
      showServicePartnersSection
    }
  }
`;

const { data } = await useAsyncDatoCms({ query: footerSettings });
</script>
