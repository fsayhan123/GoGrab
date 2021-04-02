<template>
  <div>
    <ol>
      <h1>My Rentals</h1>
      <li id="listing" v-for="(listing, index) in listingsArray" :key="index">
        {{ listing[1].model }} <br />
        <img />
        <br />
        DATE: {{ listing[1].afrom }} -- {{ listing[1].ato }}<br />${{ listing[1].price }}
        <br />
        <button
          id="reviewButton"
          v-on:click="
            listing_ID = listing[0];
            goReview();
          "
          v-if="!listing[1].reviewerID"
        >
          Review Now!
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  components: { },
  data() {
    return {
      listingsArray: [],
      listing_ID: "",
    };
  },
  methods: {
    fetchListings: function () {
      const user = firebase.auth().currentUser;
     //current logged in user
      firebase
        .firestore()
        .collection("listings")
        .where("renterID", "==", user.uid)
        .get()
        .then((snapshot) => {
          // var temp = [];
          snapshot
            .forEach((doc) => {
              console.log(doc.id + " ==>" + doc.data());
              //   temp.push(doc.data());
              this.listingsArray.push([doc.id, doc.data()]);
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        });
    },
    goReview: function () {
      console.log("listing_ID: " + this.listing_ID);
      this.$router.push({
        name: 'reviewForm',
        params: {
          listingID: this.listing_ID,
        }
      });
    },
  },
  created: function () {
    this.fetchListings();
    console.log("after created functions");
  },
};
</script>

<style>
/*button */
#reviewButton {
  background-color: indigo;
  border: none;
  color: white;
  font-weight: bold;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#listing {
  font-size: 25px;
  border: 3px solid indigo;
}
</style>