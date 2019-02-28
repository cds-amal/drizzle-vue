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

      if (value === 'loading' || this.$drizzleInstance.web3.utils === undefined)
        return 'loading'

      const { hexToUtf8, hexToAscii } = this.$drizzleInstance.web3.utils

      if (this.toUtf8) return hexToUtf8(value)
      else if (this.toAscii) return hexToAscii(value)
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
