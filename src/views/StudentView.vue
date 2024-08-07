<template>
  <div class="heading">
    <h1>Students</h1>
    <div class="tool">
      <button class="btn btn-success" @click="showAdd = !showAdd">
        Add Student
      </button>
    </div>
  </div>
  <AddStudent
    v-if="showAdd"
    @addStudent="addNewStudent"
    @cancelForm="showAdd = false"
  />
  <EditStudent
    :student="student"
    v-if="showEdit"
    @editStudent="editStudent"
    @cancelForm="showEdit = false"
  />
  <div class="d-flex my-3 mx-3">
    <input
      class="form-control mx-3"
      type="text"
      v-model="searchQuery"
      placeholder="Student Search"
    />
    <button type="button" class="mx-3 btn btn-info" @click="search">
      Search
    </button>
  </div>
  <div class="table container">
    <TableComponent
      :items="students"
      :headers="headers"
      :keys="keys"
      @edit="edit"
      @delete="removeStudent"
    />
  </div>
</template>
<script>
import studentMixin from "@/mixins/studentMixin";
import TableComponent from "@/components/TableComponent.vue";
import AddStudent from "@/components/forms/AddStudent.vue";
import EditStudent from "@/components/forms/EditStudent.vue";
export default {
  name: "StudentView",
  mixins: [studentMixin],
  components: {
    TableComponent,
    AddStudent,
    EditStudent,
  },
  data() {
    return {
      headers: ["Name", "Email", "Code", "Birth Of Date", "Level"],
      keys: ["full_name", "email", "code", "date_of_birth", "level_id"],
      showAdd: false,
      showEdit: false,
      student: {},
      searchQuery: "",
    };
  },
  methods: {
    addNewStudent(student) {
      this.student = {};
      this.addStudent(student);
    },
    edit(student) {
      this.student = student;
      this.showEdit = true;
    },
    editStudent(updateData) {
      this.showEdit = false;
      this.updateStudent(updateData);
    },
    removeStudent(st) {
      this.deleteStudent(st.id);
    },
    search() {
      console.log(this.searchQuery);

      this.searchStudents(this.searchQuery);
    },
  },
};
</script>
