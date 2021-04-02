
<template>
<div id=app>
<h1>List Your Car Now!</h1>
<br><br><br>


<form id='listing'>

<ul>
  <li>
    <label for="model">Car Model:  </label>
    <input type="text" id="model" name="model"  v-model="listing.model"><br><br>
  </li>
  <li>
    <label for="color">Color:   </label>
    <input type="text" id="color" name="color" v-model="listing.color"><br><br> 
  </li>
  <li> 
    <label for="age">Age:   </label>
    <input type="number" id="age" name="age" v-model="listing.age"><br><br>
  </li>
    <!-- Rounded switch -->
  <li>
    <label> Any Defect:   No </label>
    <label class="switch">
    <input type="checkbox" v-model="listing.defect">
    <span class="slider round"></span>
    </label>
    <label> Yes  ( If yes, please specify in the description box. )</label>
    <br><br>
  </li>
  <li>
    <label for="price">Price:  $ </label>
    <input type="number" id="price" name="price" v-model="listing.price">
    <label for="price"> /day </label><br><br>
  </li>
  <li> 
    <label for="afrom">Available From:  </label> <input type="date" id="afrom" name="afrom" v-model="listing.afrom">
    <label for="ato"> To:  </label> <input type="date" id="ato" name="ato" v-model="listing.ato"><br><br>
  </li>
  <li>
    <label for="loc">Pick-up Location:</label>
    <input type="text" id="loc" name="loc" v-model="listing.location"><br><br>
  </li>
  <li>
    <label for="files">Upload Photos: </label>
    <input type="file" id="files" name="files" @change="uploadImage"  ><br><br>
  </li>
  <li>
    <label for="description">Description:  </label><br><br>
    <textarea id="description" name="description" rows="4" cols="50" v-model="listing.description">
    </textarea><br><br>
  </li>
  <li>
    <label for="rule">Set your rules for your guest:  </label><br><br>
    <textarea id="rule" name="rule" rows="4" cols="50" v-model="listing.rules">
    </textarea><br><br>
  </li>
</ul>
<button v-on:click.prevent="list">List Now</button>
</form>
</div>

</template>

<script>
import firebase from 'firebase'
 export default {

  name: 'IndividualListing',
  props: {
    msg: String
  },

  data(){
    return {
      listing: {
        model:'',
        color:'',
        age:'',
        defect:'', //boolean
        price: '',
        location:'',
        description:'',
        rules:'',
        images:[],
        renterID: '',
        afrom: Date.now(),
        ato: Date.now(),

      },
    
    }
  },
  methods: {
    list : function() {
      //testing
      console.log("abt to insert now");
      //add to collection
      console.log("afrom TEST is: " + this.listing.afrom);
      console.log("ato TEST is: " + this.listing.ato);
      // var dateFrom2 = new Date(document.getElementById("dateFrom").value);
      // var dateTo2 = new Date(document.getElementById("dateTo").value);

      firebase.firestore().collection("listings")
      .add(this.listing)
      .then(() => {
          alert("Successfully listed!");
          this.$router.push("/listed");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("done");
    }
  },

     uploadImage(e){
          if(e.target.files[0]){
            //testing
            console.log("ready to upload")
            
              let file = e.target.files[0];
        
              var storageRef = firebase.storage().ref('listings/'+ Math.random() + '_'  + file.name);
        
              let uploadTask  = storageRef.put(file);
        
              uploadTask.on('state_changed', () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  this.listing.images.push(downloadURL);
                });
                
              }, (error) => {
                // Handle unsuccessful uploads
                console.log(error);
              }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                console.log('successful')
                
              });
              //testing
            console.log("end of upload")
          }
      }

     

} 
</script>

<style>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  text-align: left;
  margin-left: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 'List It' button */
input[type=submit] {
  background-color: #c88ad8;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* ####### Style below: for the toggle switch ####### */

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #c88ad8;
}

input:focus + .slider {
  box-shadow: 0 0 1px #c88ad8;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
  align-items: center;
}

.slider.round:before {
  border-radius: 50%;
}
</style>