<template>
  <div>
    <h1>SimpleStorage</h1>
    <strong>Stored data:</strong> <span>{{ storedData }}</span>
    <button @click="onClick">Click me</button>
  </div>
</template>

<script>
export default {
  computed: {
    storedData() {
      return this.$store.state.SimpleStorage.storedData
    }
  },
  methods: {
    onClick() {
      this.$store.dispatch('updateStoredData', 'whoa!')
    }
  }
}
</script>
<style scoped></style>
