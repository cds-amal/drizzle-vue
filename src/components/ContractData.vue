<template>
  <div>
    <h1>{{ contractName }}</h1>
    <strong>Stored data:</strong> <span>{{ storedData }}</span>
    <button @click="onClick">Click me</button>
  </div>
</template>

<script>
export default {
  props: {
    contractName: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    }
  },
  computed: {
    storedData() {
      return this.$store.state.SimpleStorage.storedData
    }
  },
  methods: {
    onClick() {
      this.$store.dispatch('updateStoredData', 'whoa!')
      console.log(this.contractName)
    }
  }
}
</script>
<style scoped></style>
