<template>
    <div class="Routing">
        <div class="connect">
            <router-link :to="{path:'/imgs',query:{id:Routing.SerialID}}">
            <div class="img">
                <img v-lazy="Routing.CoverPhoto" />
                <span>{{Routing.pic_group_count}}张照片</span>
            </div>
            </router-link>
            <div class="top">
                <p>
                    <span v-if="Routing.market_attribute&&Routing.market_attribute.dealer_price">{{Routing.market_attribute.dealer_price}}</span>
                    <span v-if="Routing.market_attribute&&Routing.market_attribute.official_refer_price">指导价 {{Routing.market_attribute.official_refer_price}}</span>
                </p>
                <div class="but">{{Routing.BottomEntranceTitle}}</div>
            </div>
            <div class="con-bot">
                <div class="con-nav">
                    <span v-for="(item,index) in yearList" :key="index"  @click="tab(item,index)" :class="{active:index==num}">   
                        {{item}}
                    </span>
                </div>
                <div class="dotp">
                <div v-for="(item,index) in carList" :key="index">
                <div v-if="index==yearInfo">
                    <div v-for="(val,ind) in item" :key="ind">  
                    <p>{{val.exhaust_str+'/'+val.max_power_str + val.inhale_type}}</p>
                    <ul>
                        <li>
                            <h3>{{val.market_attribute.year + "款" +val.car_name}}</h3>
                            <h3>{{val.horse_power+"马力"+val.gear_num+"挡"}}</h3>
                            <h3><span>指导价 {{val.market_attribute.dealer_price_max}}</span><span>{{val.market_attribute.dealer_price_min+"起"}}</span></h3>
                            <button>询问低价</button>
                        </li>
                    </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>{{Routing.BottomEntranceTitle}}</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Routing:[],
            // year:[],
            // lone:[],
            // si:[],
            // ba:[],
            // box:[],
            // li:[],
            num:1,
            yearList:[],
            carList:[],
            yearInfo:[]
        }
    },
    methods:{
        particulars(id){
            fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID="+this.$route.query.id)
                .then(res=>{
                    res.json().then((body)=>{
                        if(body.code==1){
                            this.Routing=body.data
                            console.log(this.Routing)
                            // this.Routing.list.forEach((item,index)=>{
                            //     if(this.year.indexOf(item.market_attribute.year)==-1){
                            //         this.year.push(item.market_attribute.year)
                            //     }
                            //     let on=item.exhaust_str+'/'+item.max_power_str + item.inhale_type
                            //     if(this.si.indexOf(on)==-1){
                            //         this.si.push(on)
                            //     }
                            // })
                            // this.si.forEach((val,ind)=>{
                            //     this.ba.push({
                            //         ons:val,
                            //         lones:[]
                            //     })
                            // })
                            // this.Routing.list.forEach((xc,ay)=>{
                            //     this.ba.forEach((q,w)=>{
                            //         if(xc.exhaust_str+'/'+xc.max_power_str + xc.inhale_type===q.ons){
                            //             q.lones.push(xc)
                            //         }
                            //     })
                            // })
                            // this.year.forEach((value,index)=>{
                            //     this.box.push({
                            //         years:value,
                            //         datac:[]
                            //     }) 
                            // })
                            // this.Routing.list.forEach((x,y)=>{
                            //     this.box.forEach((a,b)=>{
                            //         if(x.market_attribute.year==a.years){
                            //             a.datac.push(x)
                            //         }
                            //     })
                            // })
               let yearList = ['全部'];
               let carList = {'全部':[]};
               body.data.list.forEach(item=>{
                   let year = item.market_attribute.year;
                   if(yearList.indexOf(year) != -1){
                       carList[year].push(item)
                   }else{
                       yearList.push(year)
                       carList[year] = [item];
                   }
                   carList['全部'].push(item)
               })
               this.yearList = yearList
                let sortCar = (arr)=>{
                    return arr.sort((a,b)=>{
                        if(a.exhaust < b.exhaust){
                            return -1;
                        }else if(a.exhaust > b.exhaust){
                            return 1;
                        }else{
                            if(a.max_power < b.max_power){
                                return -1;
                            }else if(a.max_power > b.max_power){
                                return 1;
                            }else{
                                return b.inhale_type - a.inhale_type
                            }
                        }
                    })
                }
                for(let i in carList){
                    carList[i]= sortCar(carList[i])
                }
                this.carList = carList
                        }else{
                            alert(body.msg)
                    }  
                })
            })
            
        },
        tab(item="全部",index){
            this.num=index
            return this.yearInfo = item
            
        }
    },
    mounted(){
        this.particulars()
        this.tab()
    }
}
</script>

<style>
@import "../../common/style/Routing.css";
</style>
