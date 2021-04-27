<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      color: iconColor
    }"
    @mouseenter="hoverChangeColor && (iconColor = props.hoverColor)"
    @mouseleave="hoverChangeColor && (iconColor = props.color)"
  >
    <use
      :xlink:href="`#icon-${props.name}`"
      :fill="iconColor"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: '#000'
    },
    hoverColor: {
      type: String,
      default: '#B3C0D1'
    },
    hoverChangeColor: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const { color } = toRefs(props)
    const iconColor = ref(color.value)
    watch(color, (newColor: string) => {
      iconColor.value = newColor
    })
    return {
      props,
      iconColor
    }
  }
})
</script>
