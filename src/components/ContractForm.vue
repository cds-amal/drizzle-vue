<template>
  <div>
    <form>
      <input v-model="ethData" />
      <button @click.prevent="onSubmit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
  computed: mapState(['drizzle']),

  data() {
    return {
      ethData: '',
      abi: null
    }
  },


  methods: {
    onSubmit() {
      console.log('submitting', this.ethData)
      //console.log('abi', this.getContractABI(this.contractName, this.method))
      console.log('abi', this.abi)
    }
  }
}
</script>

<style></style>
