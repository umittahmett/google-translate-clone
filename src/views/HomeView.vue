<template>
  <div class="flex items-center justify-center gap-2.5 py-10 default-container relative">
    <SourceSection :defaultLanguages="defaultSourceLangs" :selectedLanguage="sourceLanguage"
      :onLanguageSelect="onSourceChange" :text="text" :onTextChange="() => onTextChange" />

    <TargetSection :defaultLanguages="defaultTargetLangs" :selectedLanguage="targetLanguage"
      :onLanguageSelect="onTargetChange" :text="translatedText" :onTextChange="() => onTextChange" />
  </div>
</template>

<script setup lang="ts">
import SourceSection from '@/components/SourceSection.vue';
import TargetSection from '@/components/TargetSection.vue';
import { defaultLanguages } from '@/data';
import type { Language } from '@/types';
import { ref } from 'vue';

const text = ref('');
const sourceLanguage = ref<string>('');
const targetLanguage = ref<string>('EN');
const translatedText = ref('');

const defaultSourceLangs = ref([{ code: 'EN', name: 'English' }, { code: 'RU', name: 'Russian' }, { code: 'TR', name: 'Turkish' }]);
const defaultTargetLangs = ref([{ code: 'EN', name: 'English' }, { code: 'RU', name: 'Russian' }, { code: 'TR', name: 'Turkish' }]);

const onSourceChange = (lang: Language) => {
  sourceLanguage.value = lang.code;
  if (targetLanguage.value == sourceLanguage.value) {
    targetLanguage.value = defaultLanguages.find((lang) => lang.code != sourceLanguage.value)?.code || 'EN';
  }
  const isInSourceLangs = defaultSourceLangs.value.some((item) => item.code === lang.code);
  if (!isInSourceLangs) {
    defaultSourceLangs.value[defaultSourceLangs.value.length - 1] = lang;
  }
}

const onTargetChange = (lang: Language) => {
  targetLanguage.value = lang.code;
  if (targetLanguage.value == sourceLanguage.value) {
    sourceLanguage.value = defaultLanguages.find((lang) => lang.code != targetLanguage.value)?.code || 'EN';
  }

  const isInTargetLangs = defaultTargetLangs.value.some((item) => item.code === lang.code);
  if (!isInTargetLangs) {
    defaultTargetLangs.value[defaultTargetLangs.value.length - 1] = lang;
  }
};

const onTextChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  text.value = target.value;
};
</script>