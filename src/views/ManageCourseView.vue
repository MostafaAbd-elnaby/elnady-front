<template>
  <div class="container">
    <div class="d-flex my-3 justify-content-between">
      <h1>{{ courseName }}</h1>
      <div>
        <select class="form-select" v-model="selectedStudent">
          <option
            v-for="student in allStudents"
            :key="student.id"
            :value="student.id"
          >
            {{ student.full_name }}
          </option>
        </select>
      </div>
      <button @click="assignStudent" class="btn btn-success">
        Add Student
      </button>
    </div>
    <table class="table table-hover table-striped-columns">
      <thead>
        <th>Student Full Name</th>
        <th>Student Code</th>
        <th class="text-capitalize" v-for="exam in exams" :key="exam.id">
          {{ exam.name }}
          <p class="font-small font-weight-light">Max: {{ exam.max_degree }}</p>
        </th>
        <th>Total</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="student in courseStudents" :key="student.student_id">
          <td>{{ student.student_name }}</td>
          <td>{{ student.student_code }}</td>
          <td v-for="exam in exams" :key="exam.id" class="text-center">
            <div v-for="grade in student.grades" :key="grade.id">
              {{ grade.grade_item_id == exam.id ? grade.score : "" }}
            </div>
          </td>
          <td>{{ student.total }}</td>
          <td>
            <button
              @click="removeStudent(student.student_id)"
              class="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "ManageCourseView",
  data() {
    return {
      courseStudents: {},
      allStudents: {},
      exams: {},
      selectedStudent: "",
      courseName: "",
    };
  },
  methods: {
    async getCourse(id) {
      await fetch("http://127.0.0.1:8000/api/courses/" + id)
        .then((response) => response.json())
        .then((data) => {
          this.courseStudents = data.data;
          this.allStudents = data.allStudents;
          this.courseName = data.course_name;
        });
    },
    async getGradeItems() {
      await fetch("http://127.0.0.1:8000/api/courses/gradeItems")
        .then((response) => response.json())
        .then((data) => {
          this.exams = data.gradeItems;
        });
    },
    async assignStudent() {
      await fetch(
        `http://127.0.0.1:8000/api/courses/assign/${this.selectedStudent}/${this.$route.params.courseId}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getCourse(this.$route.params.courseId);
        });
    },
    async removeStudent(id) {
      await fetch(
        `http://127.0.0.1:8000/api/courses/remove/${this.$route.params.courseId}/${id}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getCourse(this.$route.params.courseId);
        });
    },
  },
  mounted() {
    this.getCourse(this.$route.params.courseId);
    this.getGradeItems();
  },
};
</script>
