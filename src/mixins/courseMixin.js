import axios from "axios";
const courseMixin = {
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async searchCourses(searchQuery) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/courses?search=" + searchQuery
        );
        this.courses = response.data.courses;
      } catch (error) {
        console.error("Error searching courses:", error);
      }
    },
    async getCourses() {
      await fetch("http://127.0.0.1:8000/api/courses")
        .then((response) => response.json())
        .then((data) => {
          this.courses = data.courses;
        });
    },
  },
  async mounted() {
    await this.getCourses();
  },
};
export default courseMixin;
