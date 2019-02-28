<template>
  <div>
    <ul>
      <li>{{ this.contractName }}: {{ this.method }}</li>
      <li v-for="(val, index) in contractData" :key="index">
        <strong>{{ val.key }}</strong> {{ val.value }}
      </li>
    </ul>
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
      const value = this.getContractData(arg)
      return typeof value === 'object'
        ? Object.entries(value).map(([k, v]) => ({ key: k, value: v }))
        : value
    }
  },

  created() {
    const utf8 = this.toUtf8 ? 'toUtf8' : ''
    const { contractName, method } = this
    console.log(
      `Component: <ContractArrayData contractName="${contractName}" method="${method}" ${utf8} />`
    )

    this.$store.dispatch('drizzle/registerContract', { contractName, method })
  }
}
</script>
<style scoped></style>
