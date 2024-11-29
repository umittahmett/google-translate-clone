<template>
  <div class="w-full">
    <!-- Header -->
    <div class="flex items-center px-2">
      <button v-for="(lang, index) in defaultLanguages" :key="index" @click="() => onLanguageSelect(lang.code)"
        :class="clsx('px-3 py-3 duration-200 font-medium text-sm text-zinc-600 border-b', selectedLanguage == lang.code ? 'border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        {{ lang.name }}
      </button>
    </div>

    <!-- Text Area -->
    <div>
      <textarea readonly :value="translatedText"
        :class="clsx('resize-none rounded-lg text-xl outline-none border border-zinc-200 px-4 py-3 shadow-sm w-full', { 'cursor-not-allowed opacity-70 bg-zinc-200': !translatedText })"
        name="source-input" id="source-input" cols="30" rows="5" placeholder="Translation">
        {{ translatedText }}
      </textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defaultLanguages } from '@/data';
import type { TargetSectionProps } from '@/types';
import clsx from 'clsx';

defineProps<TargetSectionProps>()
</script>