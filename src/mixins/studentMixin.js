import axios from "axios";
const studentMixin = {
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async searchStudents(searchQuery) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/students?search=" + searchQuery
        );
        this.students = response.data.students;
      } catch (error) {
        console.error("Error searching students:", error);
      }
    },
    async getStudents() {
      await fetch("http://127.0.0.1:8000/api/students")
        .then((response) => response.json())
        .then((data) => {
          this.students = data.students;
        });
    },
    async addStudent(newStudent) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/students",
          newStudent
        );
        this.students.push(response.data.student);
        this.getStudents();
      } catch (error) {
        console.error("Error adding student:", error);
        throw error;
      }
    },
    async updateStudent(updatedStudent) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/students/${updatedStudent.id}`,
          updatedStudent,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status !== 200) {
          throw new Error(`Error updating student: ${response.statusText}`);
        }
        const updatedData = response.data;
        const studentIndex = this.students.findIndex(
          (student) => student.id === updatedData.student.id
        );
        if (studentIndex !== -1) {
          this.students.splice(studentIndex, 1, updatedData.student);
        }
      } catch (error) {
        console.error("Error updating student:", error);
      }
    },
    async deleteStudent(id) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/students/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status !== 200) {
          throw new Error(`Error deleting student: ${response.statusText}`);
        }
        this.students = this.students.filter((student) => student.id !== id);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    },
  },
  async mounted() {
    await this.getStudents();
  },
};
export default studentMixin;
