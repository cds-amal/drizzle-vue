<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Accounts</h1>
    <Accounts />
    <h1>Simple Storage</h1>
    <Contract contractName="SimpleStorage" method="storedData" />
    <ContractForm contractName="SimpleStorage" method="set" />
    <h1>Complex Storage</h1>
    <Contract contractName="ComplexStorage" method="string1" toUtf8 />
    <Contract contractName="ComplexStorage" method="storeduint1" />
    <h1>Complex Storage object</h1>
    <Contract contractName="ComplexStorage" method="singleDD" />
  </div>
</template>

<script>
import Contract from './components/Contract'
import ContractForm from './components/ContractForm'
import Accounts from './components/Accounts'

export default {
  name: 'app',
  components: {
    Accounts,
    Contract,
    ContractForm
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
