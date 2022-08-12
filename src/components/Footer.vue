<template>
    <v-footer
    color="grey darken-4  "
    padless
    absolute
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="py-2 text-center white--text"
        cols="12"
      >
        <!-- <strong>2022</strong> -->
        <v-btn :href="'https://github.com/Angelica221b'" target="_blank" icon>
        <v-icon color="white">
          mdi-github
        </v-icon>  
      </v-btn>
          
      </v-col>
    </v-row>
  </v-footer>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Lista',
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
});

</script>