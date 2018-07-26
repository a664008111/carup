<template>
    <div id="list-ss">
        <div class="wrap" ref="wrap">
            <List :data="data" :setSidebars="setSidebars"></List>
        </div>
      <Letter :letter="letter" :changeLetter="changeLetter"></Letter>
      <Sidebar :getSidebar="getSidebar" :show="show" :hide="hide"></Sidebar>
    </div>
</template>

<script>
import List from "./components/list";
import Letter from "./components/letter";
import Sidebar from "./components/sidebar";
export default {
    data(){
        return {
            letter:[],
            data:[],
            getSidebar:[],
            show:''
        } 
    }, 
    components:{  
      List,
      Letter,
      Sidebar
    },
    methods:{
        init(){
            fetch("https://baojia.chelun.com/v2-car-getMasterBrandList.html?_1530760059632")
              .then((res)=>{
                res.json().then((body)=>{
                  if(body.code==1){
                        body.data.forEach((item,index)=>{
                            if(this.letter.indexOf(item.Spelling.slice(0,1))==-1){
                                this.letter.push(item.Spelling[0])
                            }
                        })
                        this.letter.forEach((value,keys)=>{
                            this.data.push({
                                list:[],
                                vehicle:value
                            })
                        })
                        body.data.forEach((v,i)=>{
                            this.data.forEach((x,y)=>{
                                if(v.Spelling[0]==x.vehicle){
                                    x.list.push(v)
                                }
                            })
                        })
                    }else{
                        alert(body.msg)
                    }
                })
            })
        },
        setSidebars(id){
            fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+id)
                .then(res=>{
                    res.json().then((body)=>{
                        console.log(body.data)
                        if(body.code==1){
                            this.getSidebar=body.data
                            this.show='active'
                        }else{
                            alert(body.msg)
                        }
                    })
                })
            },
        hide(){
            this.show='';
        },
        changeLetter(v,i){
           let wrap=this.$refs.wrap
           let child=this.$refs.wrap.children[0]
           let mian=child.children[v];
           wrap.scrollTop=mian.offsetTop;
        }
        
    },
    mounted(){
        this.init()
    }
}
</script>

<style>
@import "./common/style/list.css";
</style>
