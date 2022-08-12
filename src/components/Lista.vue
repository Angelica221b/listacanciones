<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar">
      {{ alertText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col md="4">
        <v-card class="mx-auto" max-width="400" elevation="4" dark>
          <v-img height="200"
            src="../assets/photo.jpg">
          </v-img>
          <v-divider></v-divider>

          <v-card-title class="pb-2 pt-2">Agregar canción</v-card-title>

          <v-divider></v-divider>

          <v-card-text class="mt-0 mb-0 pb-0 pt-0">

            <v-row class="ml-1 mr-1 mt-0 mb-0">
              <v-col md="12" sm="12" class="mt-0 mb-0 pt-0 pb-0">
                <v-text-field v-model="infoCancion.titulo" label="Titulo" color="light-blue darken-4"></v-text-field>
              </v-col>
            </v-row>

            <v-row class="ml-1 mr-1 mt-0 mb-0 pt-0 pb-0">
              <v-col md="12" sm="12" class="mt-0 mb-0 pt-0 pb-0">
                <v-text-field v-model="infoCancion.grupo" label="Grupo" color="light-blue darken-4"></v-text-field>
              </v-col>
            </v-row>

            <v-row class="ml-1 mr-1 mt-0 mb-0">
              <v-col md="8" sm="12" class="mt-0 mb-0 pt-0 pb-0">
                <v-text-field v-model="infoCancion.genero" label="Genero" color="light-blue darken-4"></v-text-field>
              </v-col>
              <v-col md="4" sm="12" class="mt-0 mb-0 pt-0 pb-0">
                <v-text-field v-model="infoCancion.year" label="Año" color="light-blue darken-4"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="disableBtn" color="light-blue darken-4 white--text" @click="guardarCancion()">Agregar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col md="8">
        <v-card class="elevation-1" dark>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details color="light-blue darken-4">
            </v-text-field>
          </v-card-title>

          <v-data-table dense :headers="headers" :items="canciones" item-key="name" sort-by="titulo" :search="search"
            class="">
            <template v-slot:item.actions="{ item }">
              <v-icon color="light-blue darken-4" @click="eliminarCancion(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import Vue from 'vue'
import { db } from '../main';

export default Vue.extend({
  name: 'Lista',
  data: () => ({
    canciones: [{
      id: '',
      titulo: '',
      grupo: '',
      year: '',
      genero: ''
    }],
    infoCancion: {
      titulo: '',
      grupo: '',
      year: '',
      genero: ''
    },
    search: '',
    snackbar: false,
    alertText: '',
    headers: [
      // { text: 'id', value: 'id', visible: false },
      {
        text: 'Titulo',
        align: 'start',
        value: 'titulo',
        sortable: true
      },
      { text: 'Artista', value: 'grupo' },
      { text: 'Año', value: 'year' },
      { text: 'Genero', value: 'genero' },
      { text: '', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    disableBtn() {
      return this.infoCancion.titulo != '' && this.infoCancion.grupo != '' ? false : true;
    }
  },
  mounted() {
    this.consultaListado();
  },
  methods: {
    async guardarCancion() {
      await db.collection('canciones').add(this.infoCancion).then(doc => {
        this.infoCancion = {
          titulo: '',
          grupo: '',
          year: '',
          genero: ''
        };
        this.alertText = 'Nueva cancion agregada';
        this.snackbar = true;
      }).catch(e => {
        this.alertText = 'Ocurrio un error, intentalo de nuevo';
        this.snackbar = true;
      });

      await this.consultaListado();
    },
    async consultaListado() {
      await db.collection('canciones').get()
        .then((r) => {
          this.canciones = [];
          r.docs.forEach(doc => {
            this.canciones.push(
              {
                id: doc.id,
                titulo: doc.data().titulo,
                grupo: doc.data().grupo,
                year: doc.data().year,
                genero: doc.data().genero
              }
            );
          });
        }).catch((e) => {
          this.alertText = 'Ocurrio un error, intentalo de nuevo';
          this.snackbar = true;
        });
    },
    async eliminarCancion(item: string) {

      await db.collection('canciones').doc(item).delete().then(r => {
        this.snackbar = true;
        this.alertText = 'Cancion eliminada correctamente';
      }).catch((e) => {
        this.alertText = 'Ocurrio un error, intentalo de nuevo';
        this.snackbar = true;
      });

      await this.consultaListado();
    }
  }
})

</script>