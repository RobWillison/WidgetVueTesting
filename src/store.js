import { reactive } from 'vue'

export const store = reactive({
  citations: [
  ],
  all_image_urls: [
  ],
  image_popup_open: false
})


fetch('http://127.0.0.1:5000/data')
  .then(response => response.json())
  .then(response => {
      store.citations = response.citations
      store.all_image_urls = response.all_image_urls
  });