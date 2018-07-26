<template>
    <div class="color">
        <router-link :to="{path:'/imgs',query:{ColorId:0,id:id,Name:'颜色'}}"><p>全部颜色</p></router-link>
        <div>
          <p>
            <span v-for="(item,index) in keys" :key="index" @click="colors(index,item)" :class="{active:index==num}">{{item}}</span>
          </p>
          <ul>
            <li v-for="(item,index) in data[item]" :key="index">
              <router-link :to="{path:'/imgs',query:{ColorId:item.ColorId,Name:item.Name,id:id}}"><span :style="{background:item.Value}"></span></router-link>{{item.Name}}</li>
          </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
        id:null,
        data:[],
        keys:[],
        num:0,
        item:2017,
        ColorId:null
      }
  },
  methods:{
      init(){
        this.id=this.$route.query.id
          fetch("https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID="+this.id)
            .then((res)=>{
              res.json().then((body)=>{
                  this.data=body.data
                  for(let key in this.data){
                    this.keys.push(key);
                  }
                  this.keys.sort((x,y)=>{
                       return y-x
                  })
              })
            });   
      },
      colors(index,item){
        this.num=index;
        this.item=item;
      }
  },
  mounted(){
    this.init()
  }
}
</script>

<style>
@import "../../common/style/color.css";
</style>
