<template>
   <div ref="sidebar" :class='"sidebar "+show' @touchmove.stop="touchMove" @touchstart.stop="touchStart" @touchend="touchEnd">
       <div class="sidebar_o" v-for="(item,index) in getSidebar" :key="index">
           <h1>{{item.GroupName}}</h1>
           <ul>
               <li  v-for="(value,keys) in item.GroupList" :key="keys">
                   <router-link :to="{path:'/routing?id='+value.SerialID,query:{id:value.SerialID}}"> 
                    <img :src="value.Picture">
                    <div>
                        <p>{{value.AliasName}}</p>
                        <p>{{value.DealerPrice}}</p>
                    </div>  
                    </router-link>
               </li>
           </ul>
       </div>
   </div>
</template>

<script>
export default {
    props:{
        getSidebar:{
            type:Array
        },
        show:{
            type:String
        },
        hide:{
            type:Function
        },
        particulars:{
            type:Function
        }
    },
    methods:{
        touchStart(e){
            this.startTouch=e.touches[0]
        },
        touchMove(e){  
            let touch = e.touches[0];
            let pageX = touch.pageX - this.startTouch.pageX;
            this.pageX=pageX
            if(pageX>0){
                 this.$refs.sidebar.style=`transform:translate3d(${pageX}px,0,0)`
            }
        },
        touchEnd(e){
            this.$refs.sidebar.style=``;
            if(this.pageX>100){
                 this.hide()
            }
        }
    }
}
</script>

<style>

</style>
