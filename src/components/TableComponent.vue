<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="key in keys" :key="key">{{ item[key] }}</td>
        <td>
          <button @click="$emit('edit', item)" class="btn btn-success btn-sm">
            Edit
          </button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', item)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "TableComponent",
  props: {
    items: Object,
    headers: Array,
    keys: Array,
  },
};
</script>
