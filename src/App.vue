<template>
  <div class="grid-container">
    <NavComponent />
    <AsideComponent />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavComponent from "@/components/NavComponent.vue";
import AsideComponent from "@/components/AsideComponent.vue";
export default {
  name: "App",
  components: {
    NavComponent,
    AsideComponent,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6b9278;
}
</style>
