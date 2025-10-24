<template>
  <section class="relative w-full">
    <div class="relative h-[68vh] w-full overflow-hidden sm:h-[78vh]">
      <div v-for="(img, i) in heroImages" :key="img" class="absolute inset-0 transition-opacity duration-700" :class="i === currentHero ? 'opacity-100' : 'opacity-0'">
        <img :src="img" alt="Casa Bamboo banner" class="h-full w-full object-cover" />
        <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.35))"></div>
      </div>
      <div class="absolute inset-0">
        <div class="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] space-y-5 sm:space-y-6">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl leading-snug">
              <span class="block">Casa Bamboo Apartments</span>
              <span class="mt-2 block font-cinzel">A cozy retreat in southern Istria</span>
            </h1>
            <p class="text-base leading-relaxed text-white/90 sm:text-lg">
              Casa Bamboo Apartments are in the southern part of Istria, just 500 m from the sea. Enjoy the pool, garden, and barbecue in a peaceful setting. Four modern apartments for up to 4 guests blend tradition with contemporary design — perfect for relaxation.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a href="#apartments" class="inline-flex items-center justify-center px-5 py-2.5 text-white shadow-sm transition btn-primary">View Apartments</a>
              <a href="https://www.casa-bamboo.com/apartments" target="_blank" rel="noopener" class="inline-flex items-center justify-center px-5 py-2.5 transition btn-outline border-white/70 text-white hover:border-white">Book Now</a>
            </div>
          </div>
        </div>
      </div>

      <button @click="prevHero" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 text-white hover:bg-black/40" aria-label="Previous">‹</button>
      <button @click="nextHero" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 text-white hover:bg-black/40" aria-label="Next">›</button>
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span v-for="(img, i) in heroImages" :key="'dot-'+i" class="h-2 w-2" :class="i===currentHero ? 'bg-white' : 'bg-white/50'"></span>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-4 text-sm text-white/90 sm:grid-cols-4">
        <div class="bg-black/25 p-4"><p class="font-semibold text-white">Pool</p><p>Outdoor pool on site</p></div>
        <div class="bg-black/25 p-4"><p class="font-semibold text-white">Garden & BBQ</p><p>Private garden & grill</p></div>
        <div class="bg-black/25 p-4"><p class="font-semibold text-white">Near Sea</p><p>500 m from the coast</p></div>
        <div class="bg-black/25 p-4"><p class="font-semibold text-white">4 Guests</p><p>Modern 1BR apartments</p></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const heroImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1920&auto=format&fit=crop',
]
const currentHero = ref(0)
let heroTimer: ReturnType<typeof setInterval> | null = null
function nextHero() { currentHero.value = (currentHero.value + 1) % heroImages.length }
function prevHero() { currentHero.value = (currentHero.value - 1 + heroImages.length) % heroImages.length }
onMounted(() => { heroTimer = setInterval(nextHero, 5000) })
onBeforeUnmount(() => { if (heroTimer) clearInterval(heroTimer) })
</script>

