<template>
  <component v-bind:is="contractData.component" />
</template>

<script>
import { mapGetters } from 'vuex'
import ContractData from './presentational/Data'
import ContractArrayData from './presentational/ArrayData'
import ContractObjectData from './presentational/ObjectData'

const transformContractObject = data => {
  const max = Math.max(
    ...Object.keys(data)
      .map(x => parseInt(x, 10))
      .filter(Boolean)
  )

  const values = Object.entries(data).map(([key, value]) => ({ key, value }))

  return Object.entries(values).reduce(
    // eslint-disable-next-line no-unused-vars
    (acc, [_, { key, value }]) =>
      +key <= max ? acc : [...acc, { key, value }],
    []
  )
}

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

  components: {
    ContractData,
    ContractArrayData,
    ContractObjectData
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
      let component = 'ContractData'
      let contractData = this.getContractData(arg)
      if (typeof contractData === 'object') {
        component = 'ContractObjectData'
        contractData = transformContractObject(contractData)
      } else if (Array.isArray(contractData)) {
        component = 'ContractArrayData'
      }
      return {
        data: contractData,
        component
      }
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
<style scoped></style>
