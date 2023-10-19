<template>
  <v-app>
    <v-app-bar
        color="black"
        density="compact"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Каталогизатор</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi:mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
    >
      <v-list density="compact" nav="">
        <v-list-item prepend-icon="mdi:mdi-home-city" title="Home" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi:mdi-file-cabinet" title="Files" value="files" to="/files"></v-list-item>
        <v-list-item prepend-icon="mdi:mdi-cog" title="Settings" value="settings" to="/settings"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
              variant="text"
              :icon="rail? 'mdi:mdi-chevron-right' : 'mdi:mdi-chevron-left'"
              @click.stop="rail = !rail"
          ></v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>

<style lang="scss">

</style>
