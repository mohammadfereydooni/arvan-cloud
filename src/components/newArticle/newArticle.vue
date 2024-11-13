<template>
  <div class="container mt-4">
    <h2>New Article</h2>
    <form @submit.prevent="handleSubmit" class="row">
      <!-- Title -->
      <div class="col-8 mb-3">
        <label for="title" class="form-label text-start">Title</label>
        <InputText
            v-model="title"
            id="title"
            placeholder="Title"
            class="w-100"
            :class="{ 'p-invalid': titleError }"
            required
        />
        <small v-if="titleError" class="p-error">Required field</small>
      </div>

      <!-- Tags -->
      <div class="col-4 mb-3">
        <label for="newTag" class="form-label">Tags</label>
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-3">
            <div v-for="tag in tags" :key="tag.name" class="flex align-items-center">
              <Checkbox v-model="selectedTags" :inputId="tag.name" name="tag" :value="tag.name" />
              <label :for="tag.name">{{ tag.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="col-8 mb-3">
        <label for="description" class="form-label">Description</label>
        <InputText v-model="description" id="description" placeholder="Description" class="w-100" />
      </div>

      <!-- Body -->
      <div class="col-8 mb-3">
        <label for="body" class="form-label">Body</label>
        <Textarea v-model="body" id="body" rows="5" class="w-100" placeholder="Body"></Textarea>
      </div>

      <!-- Submit Button -->
      <div class="col-8 mt-3">
        <Button type="submit" label="Submit" class="w-100" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { getTags, addArticle } from '@/services/apiService';

export default {
  components: {
    InputText,
    Textarea,
    Button,
    Checkbox,
  },
  setup() {
    const title = ref('');
    const titleError = ref(false);
    const description = ref('');
    const body = ref('');
    const newTag = ref('');
    const tags = ref([]);
    const selectedTags = ref([]);

    // دریافت تگ‌ها از API
    const getArticleTags = async () => {
      try {
        const response = await getTags();
        tags.value = response.tags.map(tag => ({ name: tag }));
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    // هنگام ارسال فرم
    const handleSubmit = async () => {
      titleError.value = !title.value.trim();
      if (!titleError.value) {
        const payload = {
          article: {
            title: title.value,
            description: description.value,
            body: body.value,
            tagList: selectedTags.value,
          },
        };

        console.log(payload)

        try {
          const response = await addArticle(payload);
          console.log('Article added successfully:', response);
        } catch (error) {
          console.error('Error submitting article:', error);
        }
      }
    };

    // وقتی کامپوننت ساخته شد تگ‌ها را دریافت کن
    onMounted(() => {
      getArticleTags();
    });

    return {
      title,
      titleError,
      description,
      body,
      newTag,
      tags,
      selectedTags,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.p-invalid {
  border-color: #dc3545;
}

.p-error {
  color: #dc3545;
  font-size: 0.875rem;
}
</style>
