<template>
  <div class="btn-group">
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      ...
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#" @click="goToEdit">Edit</a></li>
      <li><a class="dropdown-item" href="#" @click="openModal">Delete</a></li>
    </ul>
  </div>

  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Article</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure to delete Article?</p>
          <!-- فرم یا محتوای ویرایش مقاله -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary" @click="deleteArticle">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteArticle} from "@/services/apiService";
import notificationService from "@/services/notificationService";

export default {
  props: ['articleSlug'],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    goToEdit() {
      this.$router.push({ name: 'edit-article', params: { slug: this.articleSlug } });
    },
    async deleteArticle() {
      try {
        await deleteArticle(this.articleSlug);
        window.location.reload();
      }catch (error) {
        notificationService.error("Something went wrong!");
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  }
};
</script>