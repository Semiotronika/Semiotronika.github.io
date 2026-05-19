<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  src: string
  title: string
}>()

const LAB_ENGINE_VERSION = '20260519-touch-zoom-quiet'
const versionedSrc = computed(() => {
  const joiner = props.src.includes('?') ? '&' : '?'
  return `${props.src}${joiner}v=${LAB_ENGINE_VERSION}`
})

const frame = ref<HTMLIFrameElement | null>(null)
const height = ref('760px')
const { isDark } = useData()

let timer: number | undefined
let iframeWindow: Window | null = null

function updateHeight() {
  const iframe = frame.value
  const doc = iframe?.contentDocument
  if (!doc) return

  const body = doc.body
  const html = doc.documentElement
  const visibleBottom = Array.from(body.children).reduce((bottom, child) => {
    const element = child as HTMLElement
    const style = doc.defaultView?.getComputedStyle(element)
    if (!style || style.display === 'none' || style.visibility === 'hidden') return bottom
    const rect = element.getBoundingClientRect()
    return Math.max(bottom, rect.bottom)
  }, 0)
  const next = Math.max(
    Math.ceil(visibleBottom),
    body?.offsetHeight || 0,
    html?.offsetHeight || 0,
    720,
  )
  height.value = `${next}px`
}

function scheduleHeightUpdate() {
  window.clearTimeout(timer)
  timer = window.setTimeout(updateHeight, 80)
}

function sendTheme() {
  iframeWindow?.postMessage({
    type: 'semiotronika-lab-theme',
    theme: isDark.value ? 'dark' : 'light',
  }, window.location.origin)
}

function handleLoad() {
  iframeWindow?.removeEventListener('resize', scheduleHeightUpdate)
  iframeWindow = frame.value?.contentWindow ?? null
  iframeWindow?.addEventListener('resize', scheduleHeightUpdate)
  sendTheme()
  nextTick(updateHeight)
  window.setTimeout(updateHeight, 350)
  window.setTimeout(updateHeight, 1200)
}

onMounted(() => {
  window.addEventListener('resize', scheduleHeightUpdate)
  nextTick(sendTheme)
})

watch(isDark, () => {
  sendTheme()
  scheduleHeightUpdate()
}, { flush: 'post' })

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  window.removeEventListener('resize', scheduleHeightUpdate)
  iframeWindow?.removeEventListener('resize', scheduleHeightUpdate)
  iframeWindow = null
})
</script>

<template>
  <iframe
    ref="frame"
    class="lab-frame"
    :src="versionedSrc"
    :title="title"
    :style="{ height }"
    scrolling="no"
    loading="eager"
    @load="handleLoad"
  />
</template>
