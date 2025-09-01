<template>
  <div>
    <v-charts
    class="chart"
    :option="option"></v-charts>
  </div>
</template>

<script>
export default {
  props: ['customizedOption'],
  data() {
    return {
      option: {
      }
    }
  },
  created() {
    this.option = this.customizedOption;
    console.log(this.customizedOption);
  }
}
</script>
