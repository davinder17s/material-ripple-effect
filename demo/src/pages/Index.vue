<template>
  <q-page class="flex flex-center">
    <div ref="scope" class="row q-col-gutter-sm" style="width: 960px">
      <div class="col-12 q-pa-sm">
        <q-btn color="primary" label="add box" @click="addBox"></q-btn>
      </div>
      <div class="col-3" v-for="box in boxes" :key="box.id" >
        <div class="box" :class="box.color" data-ripple="currentColor"></div>
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

const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey'
]

const random = function (max) {
  return Math.floor(Math.random() * max) + 0
}

const randomColor = function () {
  const color = colors[random(colors.length)]
  let variant = random(14)
  if (variant) {
    variant = '-' + variant
  }
  return `bg-${color}${variant}`
}

export default {
  name: 'PageIndex',
  data () {
    return {
      boxes: [
        { id: 0, color: randomColor() },
        { id: 1, color: randomColor() },
        { id: 2, color: randomColor() },
        { id: 3, color: randomColor() },
        { id: 4, color: randomColor() },
        { id: 5, color: randomColor() }
      ]
    }
  },
  mounted () {
    this.ripple = new RippleEffect(this.$refs.scope)
  },
  methods: {
    addBox () {
      this.boxes.push({ id: this.boxes.length, color: randomColor() })
    }
  }
}
</script>
