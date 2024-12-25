<template>
  <div class="flex items-center justify-center gap-2.5 py-10 default-container relative">
    <SourceSection :defaultLanguages="defaultSourceLangs" :selectedLanguage="sourceLanguage"
      :onLanguageSelect="(lang) => onSourceChange(lang as Language)" :text="text" :onTextChange="onTextChange" />

    <TargetSection :defaultLanguages="defaultTargetLangs" :selectedLanguage="targetLanguage"
      :onLanguageSelect="(lang) => onTargetChange(lang as Language)" :translatedText="translatedText" />
  </div>
</template>

<script setup lang="ts">
import SourceSection from '@/components/SourceSection.vue';
import TargetSection from '@/components/TargetSection.vue';
import { defaultLanguages } from '@/data';
import type { Language } from '@/types';
import { useDebounceFn } from '@vueuse/core';
import axios from 'axios';
import { ref, watchEffect } from 'vue';

const text = ref('');
const sourceLanguage = ref<string>('');
const targetLanguage = ref<string>('EN');
const translatedText = ref<string>('');
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

const translateText = () => {
  if (text.value) {
    if (text.value) {
      axios.post('/api/v2/translate', {
        text: [text.value],
        source_lang: sourceLanguage.value || null,
        target_lang: targetLanguage.value
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`
        }
      })
        .then((response) => {
          translatedText.value = response.data.translations[0].text;
        })
        .catch((error) => {
          console.error('Çeviri başarısız oldu:', error);
          translatedText.value = 'Çeviri yapılamadı.';
        });
    } else {
      translatedText.value = '';
    }
  }
}

const onTextChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  text.value = target.value;

  translateText();
}, 500);

watchEffect(() => {
  translateText();
});
</script>