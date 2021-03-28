<template>
  <img
    v-if="$store.state.user.avatar"
    :src="$store.state.user.avatar"
    :width="1.25 * size"
    :height="1.25 * size"
    style="border-radius: 50%;"
  >
  <div
    v-else
    class="avatar-container"
    style="background: #CCC;border-radius: 50%;text-align: center;"
    :style="{width: 1.25 * size + 'px', height: 1.25 * size + 'px'}"
  >
    <SvgIcon
      name="user"
      :size="size"
      color="#8a8a8a"
      style="verticle-align: middle;"
      :hover-change-color="false"
    />
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    size: {
      type: Number,
      default: 24
    }
  }
}
</script>

<style>

</style>
