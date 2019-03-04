<template>
  <div v-if="isDrizzleInitialized">
    <h1>{{ ethData }}</h1>
    <form>
      <input
        v-for="(param, i) in displayInputs"
        v-model="ethData[i]"
        :key="i"
        :type="param.type"
      />
      <button @click.prevent="onSubmit">Submit</button>
    </form>
    <div>{{ displayInputs }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return 'number'
    case /^string/.test(type) || /^bytes/.test(type):
      return 'text'
    case /^bool/.test(type):
      return 'checkbox'
    default:
      return 'text'
  }
}

export default {
  name: 'ContractForm',
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

  //computed: mapGetters('drizzle', ['getContractABI']),
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),

    abi() {
      const di = this.drizzleInstance
      return di.contracts[this.contractName].abi.find(
        item => item.name === this.method
      )
    },

    abiInputs() {
      return this.abi.inputs
    },

    displayInputs() {
      const di = this.drizzleInstance
      return di.contracts[this.contractName].abi
        .find(item => item.name === this.method)
        .inputs.map(x => ({ ...x, type: translateType(x.type) }))
    },

    utils() {
      return this.drizzleInstance.web3.utils
    }
  },

  data() {
    return {
      ethData: {}
    }
  },

  methods: {
    onSubmit() {
      console.log('submitting', this.ethData)
      console.log('abi', this.abi)
      console.log('abi.inputs', this.abiInputs)
      console.log('this.method', this.method)
      const convertedInputs = this.abiInputs.map((input, i) =>
        input.type === 'bytes32'
          ? (this.ethData[i] = this.utils.toHex(this.ethData[i]))
          : this.ethData[i]
      )
      console.log('convertedInputs', convertedInputs)
      this.drizzleInstance.contracts[this.contractName].methods[
        this.method
      ].cacheSend(...convertedInputs)
    }
  }
}
</script>

<style></style>
