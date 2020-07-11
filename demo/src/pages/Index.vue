<template>
  <q-page class="flex flex-center">
    <div ref="scope" class="row q-col-gutter-sm" style="width: 960px">
      <div class="col-12 q-pa-sm">
        <q-btn color="primary" label="add box" @click="boxes.push(boxes.length)"></q-btn>
      </div>
      <div class="col-3" v-for="box in boxes" :key="box" >
        <div class="box" data-ripple="dark"></div>
      </div>
    </div>
  </q-page>
</template>

<style lang="css">
  .box {
    padding-top: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 10px black;
  }
</style>

<script>
import RippleEffect from '@jjjrmy/material-ripple-effect'

export default {
  name: 'PageIndex',
  data () {
    return {
      boxes: [0, 1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.ripple = new RippleEffect(this.$refs.scope)
  }
}
</script>
