<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-40 backdrop-blur transition-transform duration-300" :class="[hiddenHeader ? '-translate-y-full' : 'translate-y-0']" :style="{ background: 'var(--color-bg)' }">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" class="flex items-center gap-2 group">
          <span class="inline-block h-2 w-2 transition" :style="{ background: 'var(--color-accent)' }"></span>
          <span class="text-lg font-semibold tracking-tight font-cinzel">Casa Bamboo</span>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#apartments" class="transition hover:text-[var(--link-hover)]">Apartments</a>
          <a href="#amenities" class="transition hover:text-[var(--link-hover)]">Amenities</a>
          <a href="#location" class="transition hover:text-[var(--link-hover)]">Location</a>
          <a href="#contact" class="transition hover:text-[var(--link-hover)]">Contact</a>
          <a href="https://www.casa-bamboo.com/apartments" target="_blank" rel="noopener" class="px-4 py-2 text-sm btn-primary transition">Book</a>
          <button class="ml-2 inline-flex items-center border px-3 py-1.5 text-sm btn-outline" @click="toggleTheme" :aria-label="`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`">
            <span v-if="theme === 'dark'">🌞</span>
            <span v-else>🌙</span>
          </button>
        </nav>
        <button class="md:hidden inline-flex items-center border px-3 py-2 text-sm" :class="['border-[var(--border-color)]']" @click="open = !open">
          <span>Menu</span>
        </button>
      </div>
      <div v-if="open" class="md:hidden">
        <nav class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 bg-transparent">
          <a href="#apartments" class="py-2">Apartments</a>
          <a href="#amenities" class="py-2">Amenities</a>
          <a href="#location" class="py-2">Location</a>
          <a href="#contact" class="py-2">Contact</a>
          <a href="https://www.casa-bamboo.com/apartments" target="_blank" rel="noopener" class="py-2">Book</a>
          <div class="mt-2">
            <button class="inline-flex items-center border px-3 py-1.5 text-sm btn-outline" @click="toggleTheme" :aria-label="`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`">
              <span v-if="theme === 'dark'">🌞 Light</span>
              <span v-else>🌙 Dark</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--color-text-secondary)] sm:flex-row sm:px-6 lg:px-8" :style="{ background: 'var(--color-bg)' }">
        <p>© {{ year }} Casa Bamboo — Istria, Croatia</p>
        <div class="flex items-center gap-4">
          <a href="#contact" class="hover:text-[var(--link-hover)]">Contact</a>
          <a href="https://www.casa-bamboo.com/" target="_blank" rel="noopener" class="hover:text-[var(--link-hover)]">Official Site</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const open = ref(false)
const year = new Date().getFullYear()
const theme = ref<'light'|'dark'>('dark')
const hiddenHeader = ref(false)
let lastY = 0
let ticking = false

function applyTheme(next: 'light'|'dark') {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', next)
  }
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const stored = localStorage.getItem('theme') as 'light'|'dark'|null
  if (stored) theme.value = stored
  applyTheme(theme.value)
  const onScroll = () => {
    const y = window.scrollY || 0
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (y > lastY && y > 64) hiddenHeader.value = true
        else hiddenHeader.value = false
        lastY = y
        ticking = false
      })
      ticking = true
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  // store cleanup
  cleanup = () => window.removeEventListener('scroll', onScroll)
})

watch(theme, (v) => {
  applyTheme(v)
  if (typeof localStorage !== 'undefined') localStorage.setItem('theme', v)
})

let cleanup: null | (() => void) = null
onBeforeUnmount(() => { if (cleanup) cleanup() })
</script>
