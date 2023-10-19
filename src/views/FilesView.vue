<template>
  <div>
    <FilesExplorerComponent />
  </div>
</template>

<script>
import FilesExplorerComponent from "@/domains/files/components/files_explorer/FilesExplorerComponent.vue";

export default {
  components: {
    FilesExplorerComponent,
  },
  data() {
    return {
      loading: false,
      files: null,
    }
  },

}
</script>

<style scoped lang="scss">

</style>
