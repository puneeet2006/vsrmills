import Vue from 'vue'
import axios from 'axios'
import VueImg from 'v-img';
import VueScrollTo from 'vue-scrollto';
import
{
  Notify
}
from 'quasar'

Notify.setDefaults(
{
  position: 'top-right',
  timeout: 4000,
  actions: [
  {
    icon: 'close',
    color: 'white'
  }]
})

const vueImgConfig = {
  // Use `alt` attribute as gallery slide title
  altAsTitle: true,
  // Display 'download' button near 'close' that opens source image in new tab
  sourceButton: false,
  // Event listener to open gallery will be applied to <img> element
  openOn: 'click',
  // Show thumbnails for all groups with more than 1 image
  thumbnails: true,
}

Vue.use(VueImg, vueImgConfig);
Vue.use(VueScrollTo,
{
  container: ".scroll_container",
  duration: 1500,
  easing: "ease",
  offset: -80,
  force: true,
})
Vue.prototype.$axios = axios
