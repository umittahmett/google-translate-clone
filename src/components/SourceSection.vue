<template>
  <div class="w-full">
    <!-- Header -->
    <div class="flex items-center px-2">
      <button @click="() => onLanguageSelect('')"
        :class="clsx('px-3 py-3 font-medium duration-200 text-sm text-zinc-600 border-b', !selectedLanguage ? ' border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        Detect language
      </button>
      <button v-for="(lang, index) in defaultLanguages" :key="index" @click="() => onLanguageSelect(lang.code)"
        :class="clsx('px-3 py-3 font-medium duration-200 text-sm text-zinc-600 border-b', selectedLanguage == lang.code ? 'border-blue-600 text-blue-500 hover:bg-blue-50' : 'border-transparent hover:bg-zinc-100 hover:text-zinc-800')">
        {{ lang.name }}
      </button>
    </div>

    <!-- Text Area -->
    <div>
      <textarea :value="text" @change="() => onTextChange"
        class="resize-none rounded-lg text-xl outline-none border border-zinc-200 px-4 py-3 shadow-sm w-full"
        name="source-input" id="source-input" cols="30" rows="5" placeholder="Enter text here..." spellcheck="false">
        {{ text }}
      </textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defaultLanguages } from '@/data';
import type { SourceSectionProps } from '@/types';
import clsx from 'clsx';

defineProps<SourceSectionProps>()
</script>