<template>
  <div class="container mt-5">
    <h2>New Article</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
            type="text"
            id="title"
            v-model="formData.title"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
        />
        <div v-if="errors.title" class="invalid-feedback">
          {{ errors.title }}
        </div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            id="description"
            v-model="formData.description"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
        ></textarea>

        <div v-if="errors.description" class="invalid-feedback">
          {{ errors.description }}
        </div>
      </div>

      <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <textarea
            id="body"
            v-model="formData.body"
            class="form-control"
            :class="{ 'is-invalid': errors.body }"
        ></textarea>
        <div v-if="errors.body" class="invalid-feedback">
          {{ errors.body }}
        </div>
      </div>

      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <div>
          <div v-for="tag in tags" :key="tag" class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                :id="tag"
                :value="tag"
                v-model="formData.tagList"
            />
            <label class="form-check-label" :for="tag">{{ tag }}</label>
          </div>
          <input
              type="text"
              class="form-control mt-2"
              placeholder="New tag"
              v-model="newTag"
          />
          <button type="button" class="btn btn-secondary mt-2" @click="addTag">
            Add Tag
          </button>
        </div>
      </div>

      <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import {addArticle, getArticleBySlug, getTags, updateArticle} from "@/services/apiService";
import notificationService from "@/services/notificationService";

export default {
  data() {
    return {
      formData: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      slug: "",
      tags: [],
      newTag: "",
      isSubmitting: false,
      errors: {},
    };
  },
  created() {
    this.getTags();
    if (this.$route.params.slug) {
      this.fetchArticle(this.$route.params.slug);
      this.slug = this.$route.params.slug;
    }
  },
  methods: {
    async fetchArticle(slug) {
      try {
        const response = await getArticleBySlug(slug);
        this.formData = {
          title: response.article.title || '',
          description: response.article.description || '',
          body: response.article.body || '',
          tagList: response.article.tagList || [],
        };
      } catch (error) {
        notificationService.error(error);
      }
    },
    addTag() {
      if (this.newTag.trim() && !this.tags.includes(this.newTag)) {
        this.tags.push(this.newTag);
        this.formData.tagList.push(this.newTag);
        this.newTag = "";
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      this.errors = {};


      const payload = {
        article: {
          title: this.formData.title,
          description: this.formData.description,
          body: this.formData.body,
          tagList: this.formData.tagList,
        },
      };

      try {

        if (this.$route.params.slug) {
          const response = await updateArticle(this.$route.params.slug, payload);
          if (response.error && response.error.data && response.error.data.errors) {
            const serverErrors = response.error.data.errors;
            for (const key in serverErrors) {
              this.errors[key] = serverErrors[key][0];
            }
          }else if(response.article){
            notificationService.success("Article added successfully!");
          }

        } else {
          await addArticle(payload);
          notificationService.success("Article added successfully!");
        }


        this.formData = {
          title: "",
          description: "",
          body: "",
          tagList: [],
        };
      } catch (error) {

        if (error.response && error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          for (const key in serverErrors) {
            this.errors[key] = serverErrors[key][0];
          }
        } else {
          notificationService.error("Something went wrong!");
        }
      }

      this.isSubmitting = false;
    },


    async getTags(){
      try {
        const response = await getTags();
        this.tags = response.tags.map(tag => (tag));
      } catch (error) {
        notificationService.error("Something went wrong!");
      }
    }
  },
};
</script>

<style>
.container {
  max-width: 600px;
}
</style>
