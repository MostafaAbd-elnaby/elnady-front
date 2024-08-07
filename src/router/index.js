import { createRouter, createWebHistory } from "vue-router";
import StudentView from "@/views/StudentView.vue";
import CourseView from "@/views/CourseView.vue";
import ManageCourseView from "@/views/ManageCourseView.vue";

const routes = [
  {
    path: "/",
    name: "students",
    component: StudentView,
  },
  {
    path: "/courses",
    name: "courses",
    component: CourseView,
  },
  {
    path: "/courses/:courseId",
    name: "course",
    component: ManageCourseView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
