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
          <drop-downs/>
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
        console.log(this.articles)
      } catch (error) {
        console.error("Error fetching articles in component:", error);
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
<!--<template>-->

<!--  <table class="table">-->
<!--    <thead class="thead-light">-->
<!--    <tr>-->
<!--      <th scope="col">#</th>-->
<!--      <th scope="col">title</th>-->
<!--      <th scope="col">Author</th>-->
<!--      <th scope="col">Tags</th>-->
<!--      <th scope="col">excerpt</th>-->
<!--      <th scope="col">created</th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    <tr v-for="(article, index) in articles" :key="article.slug">-->
<!--      <th scope="row">{{ index + 1 }}</th>-->
<!--      <td>{{ article.title }}</td>-->
<!--      <td>{{ article.author.username }}</td>-->
<!--      <td>{{ article.tagList.join(', ') }}</td>-->
<!--      <td>{{ article.body.substring(0, 100) }}...</td>-->
<!--      <td>{{ new Date(article.createdAt).toLocaleDateString() }} <drop-downs/></td>-->
<!--    </tr>-->
<!--    </tbody>-->
<!--  </table>-->
<!--</template>-->
<!--<script>-->
<!--import { getArticles } from "@/services/apiService"-->
<!--import DropDowns from "@/layouts/dropDowns.vue";-->


<!--export default {-->
<!--  components:{-->
<!--    DropDowns-->
<!--  },-->
<!--  data(){-->
<!--    return{-->
<!--      articles: []-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchArticles();-->
<!--  },-->
<!--  methods: {-->
<!--    async fetchArticles() {-->
<!--      try {-->
<!--        this.articles = await getArticles();-->
<!--        console.log(this.articles)-->
<!--      } catch (error) {-->
<!--        console.error("Error fetching articles in component:", error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->