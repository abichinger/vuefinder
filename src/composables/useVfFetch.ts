import { ref } from "vue";
import type { App } from "../types";

export function useVfFetch(app: App) {
    const loading = ref(false)
  
    function vfFetch({params, body}) {
      loading.value = true
      return new Promise((resolve, reject) => {
        app.emitter.emit('vf-fetch', {
          params: params,
          body: body,
          onSuccess: (data) => {
            loading.value = false
            resolve(data)
          },
          onError: (e) => {
            loading.value = false
            reject(e)
          }
        });
      })
    }
  
    return {vfFetch, loading}
  }