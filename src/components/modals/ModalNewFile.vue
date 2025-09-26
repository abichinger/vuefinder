<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="vuefinder__new-file-modal__content">
        <div class="vuefinder__new-file-modal__form">
          <p class="vuefinder__new-file-modal__description">{{ t('Create a new file') }}</p>
          <input v-model="name" @keyup.enter="createFile"
                 class="vuefinder__new-file-modal__input" :placeholder="t('File Name')" type="text" />
          
          <div v-if="filetypes.length > 1" class="vuefinder__new-file-modal__filetype ">
            <div class="vuefinder__new-file-modal__filetype-input">
              <label for="mimetype" class="vuefinder__new-file-modal__label">
                {{ t('Filetype') }}
              </label>
            </div>
            <div class="vuefinder__new-file-modal__filetype-label">
              <select id="mimetype" v-model="mimetype"
                      class="vuefinder__new-file-modal__select">
                <optgroup :label="t('Filetype')">
                  <option v-for="{name, mimetype} in filetypes" :value="mimetype">{{ name }}</option>
                </optgroup>
              </select>
            </div>
          </div>

          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="createFile" :disabled="loading" class="vf-btn vf-btn-primary">{{ t('Create') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';
import ModalHeader from "./ModalHeader.vue";
import NewFileSVG from "../icons/new_file.svg";
import { useVfFetch } from '../../composables/useVfFetch';

const app = inject('ServiceContainer');
const {t} = app.i18n;

const name = ref('');
const message = ref('');

/**
 * @returns {string | undefined}
 */
function getFilesystem() {
  const storageInfo = app.fs.data.storage_info ?? {}
  return storageInfo[app.fs.adapter]?.filesystem
}

const filetypes = [
  {
    name: t("Plain text"),
    mimetype: ''
  },
]

const isGoogleDriveFS = (getFilesystem() ?? "").includes("GoogleDriveFS")
if (isGoogleDriveFS) {
  filetypes.push(
    {
      name: t("Google Doc"),
      mimetype: "application/vnd.google-apps.document"
    },
    {
      name: t("Google Sheet"),
      mimetype: "application/vnd.google-apps.spreadsheet"
    },
    {
      name: t("Google Slide"),
      mimetype: "application/vnd.google-apps.presentation"
    },
  )
}

const mimetype = ref(filetypes[0]?.mimetype ?? '')
const { loading, vfFetch } = useVfFetch(app)

const createFile = async () => {
  if (name.value == '') {
    return
  }

  try {
    await vfFetch({
      params: {
        q: 'newfile',
        m: 'post',
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
        ...(mimetype.value ? {mimetype: mimetype.value} : {}),
      },
      body: {
        name: name.value
      },
    })
    app.emitter.emit('vf-toast-push', {label: t('%s is created.', name.value)});
  } catch(e) {
    message.value = t(e.message);
  }  
};

</script>
