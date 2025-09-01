<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default{

  name: 'app',
  components: {
    Header,
  },
  created() {
    // window.addEventListener(
    //   "mousewheel",
    //   function (event) {
    //     if (event.ctrlKey === true || event.metaKey) {
    //       event.preventDefault();
    //     }
    //   },
    //   { passive: false }
    // );

    // //firefox
    // window.addEventListener(
    //   "DOMMouseScroll",
    //   function (event) {
    //     if (event.ctrlKey === true || event.metaKey) {
    //       event.preventDefault();
    //     }
    //   },
    //   { passive: false }
    // );
  },
  data: function() {
    return {
      
    }
  }
}
</script>

<style>

</style>


