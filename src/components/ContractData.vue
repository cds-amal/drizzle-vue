<template>
  <div>
    <h1>{{ contractName }}</h1>
    <strong>Stored data:</strong> <span>{{ contractData }}</span>
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
      let value = this.getContractData(this.contractName, this.method)

      // Todo - should read state to determine if component can go live
      if (value === 'UNCACHED') return '???uncached???'

      if (this.$drizzleInstance.web3.utils === undefined) return '?????'
      if (this.toUtf8) {
        value = this.$drizzleInstance.web3.utils.hexToUtf8(value)
      } else if (this.toAscii) {
        value = this.$drizzleInstance.web3.utils.hexToAscii(value)
      }
      return value
    }
  },

  created() {
    const utf8 = this.toUtf8 ? 'toUtf8' : ''
    const { contractName, method } = this
    console.log(
      `Component: <ContractData contractName="${contractName}" method="${method}" ${utf8} />`
    )

    this.$store.dispatch('drizzle/registerContract', { contractName, method })
  }
}
</script>
<style scoped></style>
