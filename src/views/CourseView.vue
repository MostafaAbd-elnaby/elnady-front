<template>
  <div class="container">
    <div class="d-flex my-5">
      <input
        class="form-control mx-3"
        type="text"
        v-model="searchQuery"
        placeholder="Course Search"
      />
      <button type="button" class="mx-3 btn btn-info" @click="search">
        Search
      </button>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.code }}</td>
            <td>{{ course.description }}</td>
            <td>
              <router-link
                :to="`/courses/${course.id}`"
                class="btn btn-success"
              >
                Show
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import courseMixin from "@/mixins/courseMixin";
export default {
  name: "CourseView",
  mixins: [courseMixin],
  data() {
    return {
      headers: ["Name", "Code", "Description"],
      searchQuery: "",
    };
  },
  methods: {
    search() {
      this.searchCourses(this.searchQuery);
    },
  },
};
</script>
