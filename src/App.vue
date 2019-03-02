<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Simple Storage</h1>
    <Contract contractName="SimpleStorage" method="storedData" />
    <Contract contractName="ComplexStorage" method="singleDD" />
    <!-- <ContractData contractName="SimpleStorage" method="storedData" />
       - <h1>Complex Storage</h1>
       - <ContractData contractName="ComplexStorage" method="string1" toUtf8 />
       - <ContractData contractName="ComplexStorage" method="storeduint1" />
       - <h1>Complex Storage</h1>
       - <ContractArrayData contractName="ComplexStorage" method="singleDD" /> -->
  </div>
</template>

<script>
import Contract from './components/Contract.vue'
//import ContractData from './components/ContractData.vue'
//import ContractArrayData from './components/ContractArrayData.vue'

export default {
  name: 'app',
  components: {
    Contract
//    ContractData,
//    ContractArrayData
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
