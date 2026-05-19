<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LocaleSwitch from './components/LocaleSwitch.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <LocaleSwitch />
    </template>
    <template #nav-screen-content-after>
      <LocaleSwitch mobile />
    </template>
  </Layout>
</template>
