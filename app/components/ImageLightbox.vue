<template>
  <div v-if="open" class="fixed inset-0 z-[100] bg-black/80 text-white">
    <div class="absolute inset-0" @click="close" />
    <div class="absolute inset-0 flex items-center justify-center px-2">
      <img :src="images[current]" :alt="`Image ${current+1}`" class="max-h-[90vh] max-w-[92vw] object-contain" />
    </div>
    <button @click.stop="prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 hover:bg-white/20">‹</button>
    <button @click.stop="next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 hover:bg-white/20">›</button>
    <button @click="close" class="absolute right-4 top-4 bg-white/10 px-3 py-1 hover:bg-white/20">Close</button>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <span v-for="(img,i) in images" :key="'dot-'+i" class="h-1.5 w-3" :class="i===current?'bg-white':'bg-white/50'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ images: string[]; modelValue: boolean; start?: number }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean):void }>()
const open = ref(props.modelValue)
const current = ref(props.start ?? 0)

watch(() => props.modelValue, v => { open.value = v })
watch(open, v => emit('update:modelValue', v))
watch(() => props.start, s => { if (typeof s === 'number') current.value = s })

function next(){ if(!props.images?.length) return; current.value = (current.value+1)%props.images.length }
function prev(){ if(!props.images?.length) return; current.value = (current.value-1+props.images.length)%props.images.length }
function close(){ open.value = false }

// keyboard
function onKey(e: KeyboardEvent){
  if(!open.value) return
  if(e.key === 'Escape') close()
  if(e.key === 'ArrowRight') next()
  if(e.key === 'ArrowLeft') prev()
}
onMounted(() => { window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey) })

// touch swipe
let sx = 0
function onTouchStart(ev: TouchEvent){ sx = ev.touches[0].clientX }
function onTouchEnd(ev: TouchEvent){
  const dx = ev.changedTouches[0].clientX - sx
  if(Math.abs(dx) > 40){ dx < 0 ? next() : prev() }
}
</script>

<style scoped>
.fixed.inset-0 { touch-action: pan-y; }
.fixed.inset-0 img { user-select: none; }
</style>

