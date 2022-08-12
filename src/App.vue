<template >
  <v-app>
    <v-container fluid fill-height class="black">
      <v-app-bar
        elevation="4"
        dark
        absolute>
        <v-toolbar-title><strong>Listado de canciones</strong></v-toolbar-title>
      </v-app-bar>

      <v-row class="mt-3">
        <v-col>
          <Lista/>
        </v-col>
      </v-row>
      <v-row>
        <Footer/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Lista from './components/Lista.vue';
import Footer from './components/Footer.vue';

export default Vue.extend({
    name: "App",
    data: () => ({
      
    }),
    components: {
    Lista, Footer
    },
});
</script>
