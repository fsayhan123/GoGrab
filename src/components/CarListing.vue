<template>
    <div>
        <b-form inline style = "max-width:90%; margin: 0 auto; margin-top:40px; padding:0;" class = "mx-auto" v-on:submit.prevent = "applyFilter"> 
            <h3 >Filters </h3>
            <label class = "ml-4">Car Brand</label> 
            <b-form-select v-model = "filters.brand" :options = "brandOptions" placeholder = "Brands" class = "ml-2"> </b-form-select>
            <label class = "ml-4">Car Type</label>
            <b-form-select v-model = "filters.type" :options = "typeOptions" placeholder = "Car Type" class = "ml-2"> </b-form-select>
            <label class = "ml-4">Maximum Price </label>
            <b-form-input type = "number" v-model = "filters.maxPrice" min = "0" placeholder = "Maximum Price" class = "ml-2"> </b-form-input>
            <label class = "ml-4">Start Date </label>
            <b-form-datepicker class = "ml-2" v-model = "filters.startDate" :min = "new Date()" required> </b-form-datepicker>
            <label class = "ml-4">End Date </label>
            <b-form-datepicker class = "ml-2" v-model = "filters.endDate" :min = "new Date()" required>  </b-form-datepicker>
            <b-button type = "Submit" variant = primary class = "ml-4">Filter </b-button>
        </b-form>
        <b-modal v-model = "invalidFilter" title = "Invalid dates Selected">
            <p>Please ensure that you have selected a start and end date, and the end date is greater than the start date.</p>            
        </b-modal>
        <div id = "carDisplay"> 
            <b-container class="bv-example-row"  style = "max-width:90%;" >
                <b-row v-for = "(chunk,index) in chunkedCarArray" :key = "index" class = "mb-4 align-self-stretch">
                    <b-col lg = '4' v-for="(carData,index) in chunk" :key="index"><car-list-icon v-bind:rental="carData"></car-list-icon></b-col>
                </b-row>
            </b-container>
        </div>
    </div>    
</template>

<script>
import CarListIcon from './CarListIcon.vue';
import database from '../main.js';
import moment from "moment";
import firebase from "firebase";
import _ from "lodash";

export default {
    components: {
        CarListIcon,
    },
    data()  {
        return {
            uid : null,
            fullCarArray : [],
            chunkedCarArray : [],
            filters : {
                brand : null,
                type : null,
                maxPrice : null,
                startDate : null,
                endDate : null,
            },
            invalidFilter : false,
            typeOptions : [
                {value : null, text : "None"},
                "SUV",
                "MPV",
                "Sedan",
                "Sports",
                "Mini"
            ],
            brandOptions : [{value : null, text : "None"},
                "Abarth",
                "Alfa Romeo",
                "Aston Martin",
                "Audi",
                "Bentley",
                "BMW",
                "Bugatti",
                "Cadillac",
                "Chevrolet",
                "Chrysler",
                "Citroën",
                "Dacia",
                "Daewoo",
                "Daihatsu",
                "Dodge",
                "Donkervoort",
                "DS",
                "Ferrari",
                "Fiat",
                "Fisker",
                "Ford",
                "Honda",
                "Hummer",
                "Hyundai",
                "Infiniti",
                "Iveco",
                "Jaguar",
                "Jeep",
                "Kia",
                "KTM",
                "Lada",
                "Lamborghini",
                "Lancia",
                "Land Rover",
                "Landwind",
                "Lexus",
                "Lotus",
                "Maserati",
                "Maybach",
                "Mazda",
                "McLaren",
                "Mercedes-Benz",
                "MG",
                "Mini",
                "Mitsubishi",
                "Morgan",
                "Nissan",
                "Opel",
                "Peugeot",
                "Porsche",
                "Renault",
                "Rolls-Royce",
                "Rover",
                "Saab",
                "Seat",
                "Skoda",
                "Smart",
                "SsangYong",
                "Subaru",
                "Suzuki",
                "Tesla",
                "Toyota",
                "Volkswagen",
                "Volvo"
            ],
        }
    },
    methods : {
        fetchItems : function() {
            var user = firebase.auth().currentUser;
            this.uid = user.uid
            database.collection('listings').where("ownerID", "!=", this.uid).where("status", "==", "pending").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.fullCarArray.push([doc.id, doc.data()]);
                });
                this.applyFilter();
            })
        },

        applyFilter : function() {
            var tempArray = _.cloneDeep(this.fullCarArray);
            if (this.filters.startDate == null || this.filters.endDate == null) {
                this.invalidFilter = true;
                return;
            }
            if (moment(this.filters.startDate).valueOf() > moment(this.filters.endDate).valueOf()) {
                this.invalidFilter = true;
                return;
            }
            if (this.filters.brand != null) {
                tempArray = tempArray.filter((car) => car[1]['brand'] == this.filters.brand);
            } if (this.filters.type != null) {
                tempArray = tempArray.filter((car) => car[1]['carType'] == this.filters.type);
            } if (this.filters.maxPrice != null) {
                tempArray = tempArray.filter((car) => Number(car[1]['price']) <= Number(this.filters.maxPrice));
            }       
            tempArray = tempArray.filter((car) => {
                const docStartTime = moment(car[1]['afrom']).valueOf();
                const docEndTime = moment(car[1]['ato']).valueOf();
                const startTime = moment(this.filters.startDate).valueOf();
                const endTime = moment(this.filters.endDate).valueOf();
                return ((docStartTime <= startTime && docEndTime >= startTime) && (docStartTime <= endTime && docEndTime >= endTime));
            });
            this.chunkedCarArray = [];
            //Chunk the array 
            var temp = [];
            for (let i = 0; i < tempArray.length; i++) {
                temp.push(tempArray[i]);
                if (temp.length == 3) {
                    this.chunkedCarArray.push(temp);
                    temp = [];
                }
            } if (temp.length != 0) {
                this.chunkedCarArray.push(temp);
            }
        },
    },

    created:function() {
        if (this.$route.params.search) {
            this.filters.startDate = this.$route.params.startTime;
            this.filters.endDate = this.$route.params.endTime;
            this.fetchItems()
        } else {
            const today = new Date();
            this.filters.startDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(); 
            this.filters.endDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+3); 
            this.fetchItems()
        }
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