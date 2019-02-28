<template>
  <div>
    <strong>{{ method }}</strong>: <span>{{ contractData }}</span>
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
    },
    toUtf8: {
      type: Boolean,
      default: false
    },
    toAscii: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('contracts', ['getContractData']),

    contractData() {
      const arg = {
        contract: this.contractName,
        method: this.method,
        toUtf8: this.toUtf8,
        toAscii: this.toAscii
      }
      return this.getContractData(arg)
    }
  },

  created() {
    const utf8 = this.toUtf8 ? 'toUtf8' : ''
    const { contractName, method } = this
    console.log(
      `Component: <ContractData contractName="${contractName}" method="${method}" ${utf8} />`
    )

    this.$store.dispatch('drizzle/REGISTER_CONTRACT', { contractName, method })
  }
}
</script>
<style scoped>
</style>
