<template>
    <div class="imgs">
        <div v-if="!block">
        <div class="imgs-top">
            <router-link :to="{path:'/color',query:{id:ID}}"><span>{{Name}}</span><i class="icon iconfont icon-down-arrow"></i></router-link>
            <router-link to="/chekuan"><span>车款</span><i class="icon iconfont icon-down-arrow"></i></router-link>
        </div>
        <ul class="imgs-bottom">
            <li v-for="(val,ind) in data" :key="ind">
                <img v-for="(item,index) in val.List" :key="index" v-lazy="item.Url" @click="enlarge(index)"/>
                <div v-if="key==0" @click="xians(val.Id,1)">
                    <p>{{val.Name}}</p>
                    <p>{{val.Count}} 张<i class="icon iconfont icon-right-arrow"></i></p>
                </div>
            </li>
        </ul>
        </div>
        <ol class="imgs-gundong" v-else ref="scro" @scroll="hand">
            <li v-for="(item,index) in xian.List" :key="index" @click="enlarge(index)">
              <img v-lazy="item.Url"> 
            </li>
            <p v-if="!show">正在刷新.....</p>
            <div v-if="toogle" class="swiper" @click="toogles()">
                <div class="swiper-container"  >
                    <div ref="mySwiper" class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in xian.List" :key="index">
                            <li><img v-lazy="item.Url"></li>
                        </div>
                    </div>
                </div>
            </div>
        </ol>
    </div>
</template>

<script>
import  Swiper from 'swiper';
export default {
    data(){
        return {
            data:[],
            list:[],
            xian:{
                List:[]
            },
            key:0,
            page:1,
            block:false,
            images:"",
            id:null,
            show:false,
            toogle:false,
            ID:null,
            ColorId:null,
            Name:'颜色',
            IMGID:0
        }
    },
    methods:{
        Imgs(){
            this.ID=this.$route.query.id;
            this.ColorId=this.$route.query.ColorId
            this.$route.query.Name?this.Name=this.$route.query.Name:null;
            let URL ="https://baojia.chelun.com/v2-car-getImageList.html?SerialID="+this.$route.query.id;
            if(this.ColorId){
                URL+=`&ColorID=${this.ColorId}`
            }
            fetch(URL)
                .then((res)=>{
                    res.json().then((body)=>{
                        if(body.code==1){       
                            this.data=body.data
                            this.data.forEach((item,index)=>{
                                item.List.forEach((val,ind)=>{
                                    let li=val.Url.replace('{0}','7')
                                    val.Url=li;   
                                })
                            })
                        }else{
                            alert(body.msg)
                        }
                    })
                })
        },
        xians(id,page){
            localStorage.imgId=id;
            this.block=true;
            this.id=id;    
               let URL ="https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID="+this.$route.query.id +'&ImageID='+id+'&Page='+page+'&PageSize=30';
            if(this.ColorId){
                URL+=`&ColorID=${this.ColorId}`
            }
            fetch(URL)
            .then((res)=>{
                    res.json().then((body)=>{
                        if(body.code==1){                
                            if(this.xian.List.length){
                                let data = this.xian.List.concat(body.data.List);
                                this.xian.List = data;
                            }else{
                                this.xian.List = body.data.List;
                            };
                            this.xian.List.forEach((item,index)=>{
                                    let li=item.Url.replace('{0}','6')
                                    item.Url=li;   
                            })
                                this.show=true
                        }else{
                            alert(body.msg)
                        }
                    })
                })      
            },
            hand(e){
             let top = e.target.scrollTop- (this.$refs.scro.children.length/3*123-window.innerHeight+10);
             if(top>=0){
                 setTimeout(()=>{
                     this.show=false;
                 },2000)
                  this.xians(this.id,this.page=this.page+1)    
              }
            },
            enlarge(index){
                this.block=true;
                this.toogle=true; 
                if(localStorage.imgId){
                  this.xians(localStorage.imgId,1);
                  setTimeout(()=>{ 
                    this.mySwiper = new Swiper('.swiper-container');
                    this.mySwiper.slideTo(index,0,false);
                },0)
                }else{
                    alert("imgid为空")
                }    
            },
            toogles(){
               this.toogle=false; 
            }
        },
        mounted(){
            this.Imgs() 
        }
}
</script>

<style>
@import "../../common/iconf/iconfont.css";
@import "../../common/style/imgs.css";
@import 'swiper/dist/css/swiper.css';

</style>
