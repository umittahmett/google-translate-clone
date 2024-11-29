<template>
  <div class="flex items-center justify-center gap-2.5 py-10 default-container">
    <SourceSection :selectedLanguage="sourceLanguage" :onLanguageSelect="onSourceChange" :text="text"
      :onTextChange="() => onTextChange" />

    <TargetSection :selectedLanguage="targetLanguage" :onLanguageSelect="onTargetChange" :text="translatedText"
      :onTextChange="() => onTextChange" />
  </div>
</template>

<script setup lang="ts">
import SourceSection from '@/components/SourceSection.vue';
import TargetSection from '@/components/TargetSection.vue';
import { defaultLanguages } from '@/data';
import { ref } from 'vue';

const text = ref('');
const sourceLanguage = ref<string>('');
const targetLanguage = ref<string>('EN');
const translatedText = ref('');

const onSourceChange = (lang: any) => {
  sourceLanguage.value = lang;
  if (targetLanguage.value == sourceLanguage.value) {
    targetLanguage.value = defaultLanguages.find((lang) => lang.code != sourceLanguage.value)?.code || 'EN';
  }
}

const onTargetChange = (lang: any) => {
  targetLanguage.value = lang;
  if (targetLanguage.value == sourceLanguage.value) {
    sourceLanguage.value = defaultLanguages.find((lang) => lang.code != targetLanguage.value)?.code || 'EN';
  }
};

const onTextChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  text.value = target.value;
};
</script>