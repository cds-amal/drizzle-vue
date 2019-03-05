<template>
  <div v-if="isDrizzleInitialized">
    <div>
      <Contract contractName="SimpleStorage" method="storedData" />
      <ContractForm contractName="SimpleStorage" method="set" />
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import Contract from './components/Contract'
import ContractForm from './components/ContractForm'
import { mapGetters } from 'vuex'

export default {
  name: 'SimpleStorage',
  components: {
    Contract,
    ContractForm
  },

  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style></style>
