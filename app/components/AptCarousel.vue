<template>
  <div class="relative overflow-hidden select-none" @click="emit('open', current)">
    <div class="relative h-48 w-full sm:h-56 lg:h-40 xl:h-48 2xl:h-56">
      <div v-for="(img, i) in images" :key="img" class="absolute inset-0 transition-opacity duration-500" :class="i === current ? 'opacity-100' : 'opacity-0'">
        <img :alt="`Apartment image ${i+1}`" :src="img" class="h-full w-full object-cover" />
      </div>
      <!-- arrows removed for minimal, touch/auto navigation -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      <span v-for="(img, i) in images" :key="'dot-'+i" class="h-1.5 w-3" :class="i===current ? 'bg-white' : 'bg-white/70'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{ images: string[]; interval?: number }>()
const emit = defineEmits<{ (e: 'open', index: number): void }>()
const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  if (!props.images?.length) return
  current.value = (current.value + 1) % props.images.length
}
function prev() {
  if (!props.images?.length) return
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

onMounted(() => {
  const ms = props.interval ?? 4000
  timer = setInterval(next, ms)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

watch(() => props.images, () => { current.value = 0 })
</script>
