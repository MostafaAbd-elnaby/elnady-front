<template>
  <div class="container text-center">
    <h3>Edit Student</h3>
    <form @submit.prevent="editStudent">
      <div class="row mb-3">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            v-model="studentEdit.first_name"
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            v-model="studentEdit.last_name"
            required
          />
        </div>
        <div class="col">
          <select
            v-model="studentEdit.level_id"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Select Level</option>
            <option
              v-for="level in levels"
              :key="level"
              :value="level.id"
              :selected="level.id === studentEdit.level_id"
            >
              {{ level.name }} {{ level.number }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            v-model="studentEdit.email"
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Code"
            aria-label="Code"
            v-model="studentEdit.code"
            required
          />
        </div>
        <div class="col">
          <input
            type="date"
            class="form-control"
            placeholder="Birth Of Date"
            aria-label="Birth Of Date"
            v-model="studentEdit.date_of_birth"
            required
          />
        </div>
      </div>
      <div class="mb-3 d-flex justify-content-around">
        <button class="btn btn-success" type="submit">Edit</button>
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
  name: "EditStudent",
  props: ["student"],
  data() {
    return {
      studentEdit: Object.assign({}, this.student),
      levels: {},
    };
  },
  methods: {
    editStudent() {
      this.$emit("editStudent", this.studentEdit);
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
    async getLevels() {
      await fetch("http://127.0.0.1:8000/api/levels")
        .then((response) => response.json())
        .then((data) => {
          this.levels = data.levels;
        });
    },
  },
  mounted() {
    this.getLevels();
  },
};
</script>
