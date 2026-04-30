import { reactive } from 'vue'

export const store = reactive({
  citations: [
  ],
  allImageUrls: [
  ],
  imagePopupOpen: false,
  carousel: {
    imageUrls: [],
    total: 100,
    nextUrl: 'aaa'
  },
  filters: {
    key: 'ebb27dbb-a3c2-467a-b490-138e1c1f25a3'
  },
  setFilter(filter) {
    store.filters = {...store.filters, ...filter};
    console.log(store.filters);
    fetchData();
  }
});

// const fetchData = async () => {
//   const params = new URLSearchParams(store.filters);
//   const res = await fetch(`http://127.0.0.1:5000/data?${params.toString() || ''}`);
//   const data = await res.json();
//   store.citations = data.citations;
//   store.allImageUrls = data.allImageUrls;
// }
const fetchData = async () => {
  const params = new URLSearchParams(store.filters);
  const res = await fetch(`https://www.citeab.test/api/graph_metrics?${params.toString() || ''}`);
  const data = await res.json();
  store.graphData = data.results;
  store.citations = data.citations;
  store.allImageUrls = data.allImageUrls;
}

fetchData();