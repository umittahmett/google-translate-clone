<template>
  <div ref="container" class="z-50 absolute min-h-44 top-[88px] left-0 default-container" v-if="open">
    <div class="border border-zinc-200 w-full overflow-hidden rounded-lg bg-white">
      <div class="relative border-b border-zinc-200">
        <input v-model="keyword" type="text" class="w-full px-4 pl-12 h-12 border-b border-zinc-200 outline-none"
          placeholder="Search languages" />

        <button @click="close"
          class="rounded-full absolute left-0 top-0 size-12 hover:bg-zinc-100 flex items-center justify-center">
          <ArrowLeft class="text-zinc-500 size-5" />
        </button>
      </div>

      <div class="grid grid-cols-5 p-2.5">
        <button v-if="languages == filteredLanguages" @click="() => {
          onLanguageSelect('')
          close()
        }" :class="clsx('flex items-center gap-2.5 justify-start px-3 py-3 font-medium duration-200 text-sm',
          !selectedLanguage ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
            : 'hover:bg-zinc-100 hover:text-zinc-800 text-zinc-600')">
          <Check v-if="!selectedLanguage" class="size-5 text-blue-500" />
          Detect language
        </button>

        <button v-for="(lang, index) in filteredLanguages" :key="index" @click="() => {
          onLanguageSelect(lang)
          close()
        }"
          :class="clsx('flex items-center gap-2.5 justify-start text-start px-3 py-3 font-medium duration-200 text-sm', selectedLanguage == lang.code ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'hover:bg-zinc-100 hover:text-zinc-800 text-zinc-600')">
          <Check v-if="selectedLanguage == lang.code" class="size-5 text-blue-500" />
          {{ lang.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Language, LanguageSelectProps } from '@/types';
import { onClickOutside } from '@vueuse/core';
import clsx from 'clsx';
import { ArrowLeft, Check } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';

const props = defineProps<LanguageSelectProps>()
const keyword = ref<string>('');
const container = ref();
const filteredLanguages = ref<Language[]>(props.languages);

onClickOutside(container, event => {
  props.close()
});

watchEffect(() => {
  filteredLanguages.value = props.languages.filter((lang) => lang.name.toLowerCase().includes(keyword.value.toLowerCase()));
});
</script>