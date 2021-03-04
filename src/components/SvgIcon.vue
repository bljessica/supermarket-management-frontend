<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      color: props.color
    }"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup (props) {
    return {
      props
    }
  }
})
</script>
