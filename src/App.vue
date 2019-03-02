<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Simple Storage</h1>
    <Contract contractName="SimpleStorage" method="storedData" />
    <h1>Complex Storage</h1>
    <Contract contractName="ComplexStorage" method="string1" toUtf8 />
    <Contract contractName="ComplexStorage" method="storeduint1" />
    <h1>Complex Storage object</h1>
    <Contract contractName="ComplexStorage" method="singleDD" />
  </div>
</template>

<script>
import Contract from './components/Contract.vue'

export default {
  name: 'app',
  components: {
    Contract
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
