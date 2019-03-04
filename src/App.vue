<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Accounts</h1>
    <Accounts />

    <h1>TutorialToken</h1>

    <Contract contractName="TutorialToken" method="totalSupply" />

    <Contract contractName="TutorialToken" method="symbol" />

    <Contract
      contractName="TutorialToken"
      method="balanceOf"
      :methodArgs="accounts"
    />

    <h1>Simple Storage</h1>
    <div class="pair">
      <Contract contractName="SimpleStorage" method="storedData" />
      <ContractForm contractName="SimpleStorage" method="set" />
    </div>
    <h1>Complex Storage</h1>
    <p>string1 and string2 are converted from bytes to UTF-8</p>
    <Contract contractName="ComplexStorage" method="string1" toUtf8 />
    <Contract contractName="ComplexStorage" method="string2" toUtf8 />
    <h1>Complex Storage object</h1>
    <Contract contractName="ComplexStorage" method="singleDD" />
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import Contract from './components/Contract'
import ContractForm from './components/ContractForm'
import Accounts from './components/Accounts'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Accounts,
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
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
