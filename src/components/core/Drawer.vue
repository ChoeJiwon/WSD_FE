<template>
  <v-navigation-drawer id="app-drawer" v-model="inputValue" app dark floating persistent mobile-break-point="991" width="260">
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="34" contain/>
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            우 미 알
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.to" :active-class="color" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>

        <v-list-tile active-class="success" class="v-list-item v-list__tile--buy" @click="signOut" to="/">
          <v-list-tile-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="font-weight-light">
            Log Out
          </v-list-tile-title>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {mapMutations, mapState} from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico',
    links: [
      {
        to: '/',
        icon: 'mdi-view-dashboard',
        text: 'Home'
      },
      {
        to: '/finderboard',
        icon: 'mdi-account',
        text: 'Finder Board'
      },
      {
        to: '/losterboard',
        icon: 'mdi-clipboard-outline',
        text: 'Loster Board'
      },
      {
        to: '/mypage',
        icon: 'mdi-format-font',
        text: 'My Page'
      },
      // {
      //   to: '/maps',
      //   icon: 'mdi-map-marker',
      //   text: 'Maps'
      // },
      // {
      //   to: '/notifications',
      //   icon: 'mdi-bell',
      //   text: 'Notifications'
      // }
    ]
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    signOut: function(){
        this.$http.get('/login/logout').then((res)=>{
          if(res.data.success==true){
            this.$store.commit("setInitialize");
          }
        })
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>
