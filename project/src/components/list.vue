<template>
  <div class="list">
      <div class="lists" v-for="(item,index) in data" :key="index" :id="item.vehicle">
          <h1>{{item.vehicle}}</h1>
          <ul>
              <li v-for="(value,keys) in item.list" :key="keys" @click="setSidebars(value.MasterID)">
                  <img v-lazy="value.CoverPhoto" />
                  <span>{{value.Name}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:[]
        },
        setSidebars:{
            type:Function,
            default:()=>{}
        }
    },
    methods:{
        
    },
    mounted(){
        
    }
}
</script>

<style>
@import "../common/style/list.css";
</style>
