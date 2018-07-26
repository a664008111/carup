<template>
  <div class="letter">
      <ol>
          <li v-for="(item,index) in letter" :key="index" @click="changeLetter(item,index)">
              {{item}}
          </li>
      </ol>
  </div>
</template>

<script>
export default {
    props:{
        letter:{
            type:Array
        },
        changeLetter:{
            type:Function
        }
    },
     methods: {
        touchEnd(){
            
        }
    }
}
</script>

<style>
@import "../common/style/list.css";
</style>
