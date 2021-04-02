<template>
  <div id="app">
    <h1>Build trust among the GoGrab community!</h1>
    <h1>Leave a review today!</h1>

    <br /><br /><br />
    <button class="button" v-on:click="goBack()">Back</button>
    <ul>
      <form>
        <h1>Review:</h1>
        <StarRating v-model="reviewData.reviewValue"> </StarRating>
        <h3>Rating selected: {{ reviewData.reviewValue }}/5</h3>
        <label for="reviewText"></label>
        <br />
        <textarea
          id="reviewText"
          placeholder="Enter your review description here"
          name="reviewText"
          v-model="reviewData.reviewText"
          rows="7"
          cols="50"
        >
        </textarea>
      </form>
    </ul>
    <br><br><br>
    <button class="button"  v-on:click="addReview()">Submit</button>
      <!-- <button v-on:click="checkUID()">CHECK</button> -->
  </div>
</template>

<script>
import firebase from "firebase";
import { StarRating } from "vue-rate-it";

export default {
  data() {
    return {
      reviewData: {
        reviewerID:"",
        reviewValue: 0,
        reviewText: "",
        listingID: this.listingID
      },
    };
  },
  props: {
    listingID: String
  },
  components: {
    StarRating,
  },
  methods: {
    addReview: function () {
      console.log("start addReview");
      const user = firebase.auth().currentUser;
      this.reviewData.reviewerID = user.uid;
      firebase
        .firestore()
        .collection("reviews")
        .add(this.reviewData)
        .then(() => {
          alert("Review submitted!");
          //this.$router.push("/listed");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("after addReview");

      
      const listingRef = firebase.firestore().collection("listings").doc(this.listingID);
      listingRef.update({
        reviewerID: user.uid
      }).then(() => {
        console.log("listing document successfully updated");
      }).catch((error) => {
        console.log("Error: " + error);
      })
      this.$router.push("/myRentals");

    },
    checkUID: function() {
      const user = firebase.auth().currentUser;
      console.log(user.uid);
      console.log("listingID: " + this.listingID);
    },
    goBack: function() {
          this.$router.push("/myRentals");
    }
  },
};
</script>

<style>
ul {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*button */
.button {
  background-color: indigo;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#reviewText {
  font-size: 25px;
  border: 5px solid indigo
}
</style>
