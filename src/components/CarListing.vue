<template>
    <div>
        <div id = "carSearch">
            <input  type="search" placeholder="Search.." />
            <button> Search </button> 
        </div>
        
        


        <div id = "carDisplay"> 
            <b-container class="bv-example-row" >
                <b-row v-for = "(chunk,index) in chunkedCarArray" :key = "index">
                    <b-col sm = '4' v-for="(carData,index) in chunk" :key="index"><car-list-icon v-bind:rental="carData"></car-list-icon></b-col>
                </b-row>
            </b-container>
        </div>
    </div>    
</template>

<script>
import CarListIcon from './CarListIcon.vue'
import database from '../main.js'

export default {
    components: {
        CarListIcon,
    },
    data()  {
        return {
             chunkedCarArray : []
        }
    },
    methods : {
        fetchItems : function() {
            database.collection('rentals').get().then(snapshot => {
                var temp = [];
                snapshot.docs.forEach(doc => {
                    temp.push([doc.id, doc.data()]);
                    if (temp.length == 3) {
                        this.chunkedCarArray.push(temp);
                        temp = [];
                    }
                });
                if (temp.length != 0) {
                    this.chunkedCarArray.push(temp);
                }
            })
        },
        checkChunked : function () {
            console.log(this.chunkedCarArray[0][0])
        }
    },

    created:function() {
        this.fetchItems();
        console.log(this.chunkedCarArray);
    }
}
</script>

<style scoped>

#carSearch {
    margin-top:20px;
}

#carSearch > input {
    float:left;
    width:75%;
    height:30px;
    border-radius:25px;
    box-shadow: inset 0 0 2px #000000;
    margin-right:0px;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:20px;
    border-style:none;
    text-indent:20px;
}

#carSearch > button {
    margin-left:0px;
    margin-top:auto;
    margin-bottom:auto;
    width:100px;
    height:30px;
    background-color: darkviolet;
    color:white;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1)
}

#filter {
    margin-top:20px;
    background-color: darkviolet;
    width:100%;
    height:40px;
}

#filter > span {
    float:left;
    display: inline-flex;
    align-items:center;
    margin-left:20px;
    color:white;
    padding:0px;
    height:100%;
    
}

#filterChoice {
    list-style: none;
    text-align: center;
    height:100%;
}

#filterChoice > li {
    float:left;
    display:flex;
    align-items:center;
    height:100%;
    margin-left:30px;
    color:white;
}

#carDisplay {
    margin-top:20px;
}

.col {
    border:1px solid #000000 !important;
    margin:10px !important;
}




</style>