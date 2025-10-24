<template>
  <section id="apartments" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="flex items-end justify-between gap-6">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">Apartments</h2>
        <p class="mt-2 muted">Four thoughtfully designed apartments for up to 4 guests.</p>
      </div>
      <a href="https://www.casa-bamboo.com/apartments" target="_blank" rel="noopener" class="hidden px-4 py-2 text-sm text-white md:inline-flex btn-primary">See availability</a>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(apt,idx) in apartments" :key="apt.title" class="group overflow-hidden card shadow-sm transition hover:shadow-md">
        <AptCarousel :images="apt.images" @open="(start)=>openLightbox(apt.images, start)" />
        <div class="p-4">
          <p class="font-medium">{{ apt.title }}</p>
          <p class="mt-1 text-sm muted">1 bedroom • up to 4 guests</p>
        </div>
      </div>
    </div>

    <div class="mt-6 md:hidden">
      <a href="https://www.casa-bamboo.com/apartments" target="_blank" rel="noopener" class="inline-flex px-4 py-2 text-sm text-white btn-primary">See availability</a>
    </div>

    <ImageLightbox :images="lightboxImages" v-model="lightboxOpen" :start="lightboxIndex" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AptCarousel from '@/components/AptCarousel.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'

type Apt = { title: string, images: string[] }
const apartments = ref<Apt[]>([
  { title: 'Apartment 1', images: [] },
  { title: 'Apartment 2', images: [] },
  { title: 'Apartment 3', images: [] },
  { title: 'Apartment 4', images: [] },
])

onMounted(async () => {
  try {
    const data: any = await $fetch('/apartment-images.json').catch(() => null)
    const urls: string[] = Array.isArray(data?.images) ? data.images : (Array.isArray(data) ? data : [])
    const dedup = Array.from(new Set(urls))
    // filter out tiny icons (e.g., 23x23)
    const clean = dedup.filter(u => !/\/w_\d{1,3},h_\d{1,3}\b/i.test(u) || /w_\d{3},h_\d{3}/i.test(u))
    // distribute across apartments for now
    const groups: string[][] = [[], [], [], []]
    clean.forEach((u, i) => groups[i % 4].push(u))
    const placeholders = [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop'
    ]
    apartments.value.forEach((a, idx) => { a.images = groups[idx]?.length ? groups[idx] : placeholders })
  } catch {}
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxImages = ref<string[]>([])
const lightboxIndex = ref(0)
function openLightbox(imgs: string[], startIdx = 0){
  if (!imgs || !imgs.length) return
  lightboxImages.value = imgs
  lightboxIndex.value = startIdx
  lightboxOpen.value = true
}
</script>

