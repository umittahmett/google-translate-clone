<template>
  <div class="w-full">
    <!-- Header -->
    <div class="flex items-center px-2">
      <button v-for="(lang, index) in defaultLanguages" :key="index" @click="() => onLanguageSelect(lang)"
        :class="clsx('px-3 py-3 duration-200 font-medium text-sm text-zinc-600 border-b', selectedLanguage == lang.code ? 'border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        {{ lang.name }}
      </button>

      <button @click="openSelector = !openSelector"
        class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <ChevronDown class="text-zinc-500 size-5" />
      </button>
    </div>

    <!-- Text Area -->
    <div class="relative">
      <textarea readonly :value="translatedText"
        :class="clsx('resize-none rounded-lg text-xl outline-none border border-zinc-200 px-4 py-3 shadow-sm w-full', { 'cursor-not-allowed opacity-70 bg-zinc-200': !translatedText })"
        name="source-input" id="source-input" cols="30" rows="5" placeholder="Translation">
        {{ translatedText }}
      </textarea>

    </div>
    <!-- Language Select -->
    <LanguageSelect :close="() => openSelector = false" :open="openSelector" :selectedLanguage="selectedLanguage"
      :onLanguageSelect="onLanguageSelect" :languages="targetLanguages" />
  </div>
</template>

<script setup lang="ts">
import { targetLanguages } from '@/data';
import type { TargetSectionProps } from '@/types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';
import LanguageSelect from './LanguageSelect.vue';

defineProps<TargetSectionProps>()

const openSelector = ref<boolean>(false);
</script>