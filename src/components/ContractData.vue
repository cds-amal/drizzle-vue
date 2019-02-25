<template>
  <div>
    <h1>{{ contractName }}</h1>
    <strong>Stored data:</strong> <span>{{ contractData }}</span>
    <button @click="onClick">Click me</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters('contracts', ['getContractData']),
    contractData() {
      return this.getContractData(this.contractName, this.method)
    }
  },

  methods: {
    onClick() {
      this.$store.dispatch('updateStoredData', 'whoa!')
      console.log(this.contractName)
    }
  },

  created() {
    console.log('getCacheKey', this.$getCacheKey)
    //this.$getCacheKey(this.contractName, this.method)
    const { contractName, method } = this
    this.$store.dispatch('drizzle/registerContract', { contractName, method })
  }
}
</script>
<style scoped></style>
