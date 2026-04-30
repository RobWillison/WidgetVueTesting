import { reactive } from 'vue'

export const store = reactive({
  imagePopupOpen: false,
  carousel: {
    imageUrls: [],
    total: 100,
    nextUrl: 'aaa'
  },

  clientConfig: {
    reagentIds: [575390],
    perPage: 5,
  },
  api: {
    endpoint: 'https://www.citeab.test/api/v1',
    key: 'ebb27dbb-a3c2-467a-b490-138e1c1f25a3', // beta: '389b9dc1-5b1f-45db-82e9-e0dae917adc6',
    top_n: 10,
    filters: {
      // applications: [1, 2]
    }
  },

  setFilter(filter) {
    store.api.filters = {...store.api.filters, ...filter};
    store.fetchCitations();
    store.fetchGraphData();
  },

  fetchGraphData: async () => {
    if (store.clientConfig.reagentIds.length != 1) return; // Only support fetching graph data for a single reagent

    const res = await fetch(`${store.api.endpoint}/graph_metrics`, {
      method: "POST",
      body: JSON.stringify({
        key: store.api.key,
        top_n: store.api.top_n,
        reagent_id: store.clientConfig.reagentIds[0],
        filters: store.api.filters
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const data = await res.json();
    store.graphData = data.results;
  },

  fetchCitations: async () => {
    const res = await fetch(`${store.api.endpoint}/citations`, {
      method: "POST",
      body: JSON.stringify({
        key: store.api.key,
        per_page: store.clientConfig.perPage,
        filters: store.api.filters
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const data = await res.json();
    store.citations = data.results;
  }
});

store.fetchCitations();
store.fetchGraphData();
