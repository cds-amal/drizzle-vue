<template>
  <div v-if="isDrizzleInitialized">
    <Contract contractName="TutorialToken" method="totalSupply" />
    <Contract contractName="TutorialToken" method="symbol" />
    <Contract
      contractName="TutorialToken"
      method="balanceOf"
      :methodArgs="accounts"
    />

    <ContractForm
      contractName="TutorialToken"
      method="transfer"
      :labels="transferLabels"
    />
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import Contract from './components/Contract'
import ContractForm from './components/ContractForm'
import { mapGetters } from 'vuex'

export default {
  name: 'TutorialToken',
  components: {
    Contract,
    ContractForm
  },

  computed: {
    ...mapGetters('account', ['getAccount']),
    ...mapGetters('drizzle', ['isDrizzleInitialized']),

    accounts() {
      const accountObj = this.getAccount
      console.log('accountObj', accountObj)
      return [accountObj.account]
    },

    transferLabels() {
      return ['To Address', 'Amount to Send']
    }
  }
}
</script>

<style></style>
