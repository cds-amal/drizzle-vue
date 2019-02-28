<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ContractData contractName="SimpleStorage" method="storedData" />
    <hr />
    <ContractData contractName="ComplexStorage" method="string1" toUtf8 />
    <hr />
    <ContractArrayData contractName="ComplexStorage" method="singleDD" />
  </div>
</template>

<script>
import ContractData from './components/ContractData.vue'
import ContractArrayData from './components/ContractArrayData.vue'

export default {
  name: 'app',
  components: {
    ContractData,
    ContractArrayData
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
