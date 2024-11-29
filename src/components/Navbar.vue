<template>
  <div class="flex items-center justify-between border-b border-zinc-200 shadow-sm px-4 py-2">
    <div class="flex items-center gap-2.5">
      <button class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <MenuIcon class="text-zinc-600 size-6" />
      </button>

      <img class="h-7 w-auto" :src="GoogleTranslateImage" alt="Google Translate Logo">
    </div>

    <div class="flex items-center gap-2.5">
      <button class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <Settings class="text-zinc-600 size-6" />
      </button>

      <button class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <Grip class="text-zinc-600 size-6" />
      </button>

      <button class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <UserCircle2 class="text-blue-500 size-10 p-2 bg-zinc-50 rounded-full hover:text-zinc-700" />
      </button>
    </div>
  </div>
</template>



<script setup lang="ts">
import { Grip, MenuIcon, Settings, User, User2, UserCircle2 } from 'lucide-vue-next';
import GoogleTranslateImage from '@/assets/gtranslate-logo.png';
</script>