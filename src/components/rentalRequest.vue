<template>
<div id="rentalForm">
<br>
<h1>Send A Rental Request</h1>
<form>
<h3>I have read the terms and conditions as stated by the renter: </h3>
    
    <input type="checkbox" id="read" value="read" required v-model="request.read">
    <label for="read"> check </label><br>
    

<h3>Any notes for the owner?</h3>
    <textarea id="note" name="note" rows="4" cols="50" v-model="request.note"/>
<h3>Choose the rental d do you intend to rent the car?</h3>
    <label for="rfrom">Rent From:  </label> <input type="date" id="rfrom" name="rfrom" v-model="request.rfrom" @change="calculateDays"> 
    <label for="rto"> To:  </label> <input type="date" id="rto" name="rto" v-model="request.rto" @change="calculateDays"><br><br>
<h3>Price/day</h3>
<p id="dailyPrice"> </p>
<h3>Total</h3>
<p id="numdays"> </p>


<h3>Payment Method</h3>
   
    <input type="radio" id="epay" name='paymentMethod' value=true v-model="request.paymentMethod.epay">
    <label for="epay"> Electronic Payment (to be liased with owner separately) </label><br>
    <input type="radio" id="cash" name='paymentMethod' value=true v-model="request.paymentMethod.cash">
    <label for="cash"> Cash </label><br>
    

<button @click="submit">Rent</button>
</form>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'RentalRequest',
  props: {
    listing_id: String
  },

  data(){
    return {
      request: {
        read:'',
        note:'',
        rfrom:'',
        rto:'', 
        total: '', //get from the collection parasm
        paymentMethod: {
            epay:'', // value = true if Chosen; value = '' if not Chosen
            cash:'',
        },
        ownerID:'',
        renterID:'',
        listing_id: '',
        model:'',
        imageULR:'',
        price:'',
        status:'',
      },
      pickUpDate:Date(this.rfrom),
      returnDate:Date(this.rto),
  }},


  methods : {
    getCurrentUser: function() {
      var user = firebase.auth().currentUser;
      var uid

      if (user != null) {
        uid = user.uid;
        return uid;
      }
    },
    getOwnerID: function() {

        const car = firebase.firestore().collection("listings").doc(this.request.listing_id)
        car.get().then((doc) => {
              if (doc.exists) {
                  this.request.ownerID = doc.get("ownerID")
 
              } 
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
    },

    submit : function() {
            this.request.renterID = this.getCurrentUser(); 
            this.request.status = "Pending" 
            firebase.firestore().collection("rentalRequests")
            .add(this.request)
            .then(() => {
                alert("Request submitted");
                this.$router.push("/MyRentals");
                })
                .catch((error) => {
                alert(error.message);
                });
    },
    getListingInfo: function() {
        const car = firebase.firestore().collection("listings").doc(this.listing_id)
        car.get().then((doc) => {
              if (doc.exists) {                  
                  this.request.model = doc.get("model")
                  this.request.price = doc.get("price")
                  document.getElementById("dailyPrice").innerText=this.request.price
                  var images = doc.get("images")
                  this.request.imageULR = images[0]
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });

    },

    calculateDays : function() {
        var rfrom = new Date(this.request.rfrom)
        var rto = new Date(this.request.rto)
        var days = parseInt( (rto - rfrom) / (24 * 3600 * 1000) )
        if (document.getElementById("rto")) {
            var total = days * this.request.price
            document.getElementById("numdays").innerText=total
            this.request.total = total
        } else {
            document.getElementById("numdays").innerText=0
        }
    },
    // calculateDays: function() {
    //     return Math.floor((Date.UTC(this.returnDate.getFullYear(), this.returnDate.getMonth(), this.returnDate.getDate()) - Date.UTC(this.pickUpDate.getFullYear(), this.pickUpDate.getMonth(), this.pickUpDate.getDate()) ) /(1000 * 60 * 60 * 24));
    // },

  },
  created:function() {
        this.listing_id = this.$route.query.listing_id;
        this.getOwnerID();
        this.getListingInfo();
  }

}

</script>

<style scoped>
label {
    margin: 20px;
}

#rentalForm {
    margin-left: 50px;
}
</style>
