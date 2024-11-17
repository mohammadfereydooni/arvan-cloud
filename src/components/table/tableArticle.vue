<template>
  <div class="card">
    <DataTable :value="articles" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <Column field="title" header="Title" style="width: 20%"></Column>
      <Column field="author.username" header="Author" style="width: 20%"></Column>
      <Column header="Tags" style="width: 20%">
        <template #body="slotProps">
          <ul>
            <li v-for="tag in slotProps.data.tagList" :key="tag">{{ tag }}</li>
          </ul>
        </template>
      </Column>
      <Column field="slug" header="Body" style="width: 20%"></Column>
      <Column header="Created At" style="width: 20%">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}

        </template>
      </Column>

      <Column header="Actions" style="width: 10%">
        <template #body="slotProps">
          <drop-downs :articleSlug="slotProps.data.slug"/>
        </template>
      </Column>

      <template #footer> In total there are {{ articles ? articles.length : 0 }} products. </template>
    </DataTable>
  </div>
</template>

<script>
import { getArticles } from "@/services/apiService"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DropDowns from "@/layouts/dropDowns.vue";
import notificationService from "@/services/notificationService";

export default {
  components: {
    DropDowns,
    DataTable,
    Column,
  },
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        this.articles = await getArticles();
      } catch (error) {
        notificationService.error(error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  },
};
</script>
