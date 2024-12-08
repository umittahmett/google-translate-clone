<template>
  <div class="w-full">
    <!-- Header -->
    <div class="flex items-center px-2">
      <button @click="() => onLanguageSelect('')"
        :class="clsx('px-3 py-3 font-medium duration-200 text-sm text-zinc-600 border-b', !selectedLanguage ? ' border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        Detect language
      </button>

      <button v-for="(lang, index) in defaultLanguages" :key="index" @click="() => onLanguageSelect(lang)"
        :class="clsx('px-3 py-3 font-medium duration-200 text-sm text-zinc-600 border-b', selectedLanguage == lang.code ? 'border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        {{ lang.name }}
      </button>

      <button @click="openSelector = !openSelector"
        class="rounded-full size-12 hover:bg-zinc-100 flex items-center justify-center">
        <ChevronDown class="text-zinc-500 size-5" />
      </button>
    </div>

    <!-- Text Area -->
    <div class="relative">
      <textarea :value="text" @input="onTextChange"
        class="resize-none rounded-lg text-xl outline-none border border-zinc-200 px-4 py-3 shadow-sm w-full"
        name="source-input" id="source-input" cols="30" rows="5" placeholder="Enter text here..." spellcheck="false">
      </textarea>
    </div>

    <!-- Language Select -->
    <LanguageSelect :close="() => openSelector = false" :open="openSelector" :selectedLanguage="selectedLanguage"
      :onLanguageSelect="onLanguageSelect" :languages="sourceLanguages" />
  </div>
</template>

<script setup lang="ts">
import { sourceLanguages } from '@/data';
import type { SourceSectionProps } from '@/types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';
import LanguageSelect from './LanguageSelect.vue';
defineProps<SourceSectionProps>()

const openSelector = ref<boolean>(false);
</script>