<template>
<div>
    <h1>Car Model</h1>

    <p id='scrolly'>
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30661/QQ20190428230137__95937.1556517799.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30658/QQ20190428230027__93343.1556517796.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30663/QQ20190428230148__69023.1556517796.png?c=2" alt="Izoa">
    </p>
  

<div class="flex-container">
  <div class="flex-child 1">
    <ul>
    <h2>Price </h2>
    <p>Color </p>
    <p>Age </p> 
    <p>Defect </p>
    <p>Available: </p>
    </ul>
    </div>

  <div class="flex-child 2">
    <ul>
    <h2>UserName's Car: </h2>
    <p>Discription box</p>
    <h2>Owner's Rules: </h2>
    <p>rule box</p>
    </ul>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'IndividualListed',
  props: {
    msg: String
  }, 

    created : function() {
      //Query document ID from listing from this listing_id to populate fields above
      console.log(this.$route.params.listing_id);
    }
}

</script>
<style scoped>
#scrolly {
            height: 300px;
            width: 800px;
            overflow: auto;
            overflow-y: hidden;
            margin: 0 auto;
            white-space: nowrap
        }

img {
            width: 525px;
            height: 300px;
            margin: 20px 10px;
            display: inline;
            margin-left: 40px;
            margin-right: 40px;
        }
ul {
            text-align: left;
            margin-left: 25%;

}
.flex-container {
    display: flex;
}

.flex-child {
    flex: 0.5;
}  

.flex-child:first-child {
    margin-left: 10px;
} 
</style>