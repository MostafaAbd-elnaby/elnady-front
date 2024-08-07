<template>
  <div class="container text-center">
    <h3>Add Student</h3>
    <form @submit.prevent="addStudent">
      <div class="row mb-3">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            v-model="student.first_name"
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            v-model="student.last_name"
            required
          />
        </div>
        <div class="col">
          <select
            v-model="student.level_id"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Select Level</option>
            <option v-for="level in levels" :key="level" :value="level.id">
              {{ level.name }} {{ level.number }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <input
            class="form-control"
            type="email"
            id="email"
            v-model="student.email"
            placeholder="Email"
            required
          />
        </div>
        <div class="col">
          <input
            class="form-control"
            type="text"
            id="code"
            v-model="student.code"
            placeholder="Code"
            required
          />
        </div>
        <div class="col">
          <input
            class="form-control"
            type="date"
            id="code"
            v-model="student.date_of_birth"
            placeholder="Birth Of Date"
            required
          />
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-around">
        <button type="submit" class="btn btn-info">Add</button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="cancelForm"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "AddStudent",
  data() {
    return {
      student: {
        first_name: "",
        last_name: "",
        email: "",
        code: "",
        date_of_birth: "",
        level_id: "",
      },
      levels: {},
    };
  },
  methods: {
    async getLevels() {
      await fetch("http://127.0.0.1:8000/api/levels")
        .then((response) => response.json())
        .then((data) => {
          this.levels = data.levels;
        });
    },
    addStudent() {
      this.$emit("addStudent", {
        ...this.student,
      });
      this.student.first_name = "";
      this.student.last_name = "";
      this.student.email = "";
      this.student.code = "";
      this.student.date_of_birth = "";
      this.student.level = "";
    },
    cancelForm() {
      this.student.first_name = "";
      this.student.last_name = "";
      this.student.email = "";
      this.student.code = "";
      this.student.date_of_birth = "";
      this.student.level = "";
      this.$emit("cancelForm");
    },
  },
  mounted() {
    this.getLevels();
  },
};
</script>
