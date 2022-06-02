<template>
      <div id="app">
        
        <Navigation></Navigation>

        <router-view></router-view>

        
    </div>
</template>

<script>

import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components:{
    Navigation
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family:'montserrat', sans-serif;
  font-weight: 600;
  background-color: rgb(228, 228, 228);
}

nav{
    height: 100px;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, #0054a6 100%);
    display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px
}


#logo{
    width: 200px
}

.menu-items{
    padding-right: 10vw;
}
.menu-items li{
    display: inline;
    cursor: pointer;
    padding: 0px 20px 0px 20px;
    color: white;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: white;
  text-decoration: none;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
#list{
    padding: 20px 40px 20px 40px;
}

span{
  color: black;
}

.list-wrap{
  margin: 50px 0px 50px 25px;
}

.listas{
  overflow-wrap: break-word;
}
.listas li{
  margin-bottom: 10px;
  font-style: bold;
}
h1{
  text-align: center;
  margin: 25px 0px 10px 0px;
  font-style: italic;
  font-size: 3em;
}
.paging-nav{
  font-size: 30px;
  border-radius: 100px;
  padding: 0px 10px 0px 10px;
  background: #0054a6;
  cursor: pointer;
  margin: 0% 0% 10% 5%;
  color: azure;
}

.paging-wrap{
  text-align: center;
}

.adding-form,.update-form {
  margin-bottom: 20px;
  width: 30%;
  max-width: 200px;
  text-align: center;
}


#submit-new, #update-btn{
  margin-top: 5px;
  font-size: 12px;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
  background: #0054a6;
  cursor: pointer;
  margin-left: 5%;
  color: azure;
  transition-duration: 0.4s;
}

#submit-new:hover , #update-btn:hover{
  background-color: #126fcc;
  }

.adding-form input, .update-form input{
  border: 0.5px solid #0054a6;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
}

/* .update-form{
  text-align: center;
} */

.search-input{
  border: 0.5px solid #0054a6;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
}

.listas p{
  font-weight: 400;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
  text-align: center;
}

.del-edit img{
  width: 50px;
  padding: 10px;
}

.del-edit:hover{
  background-color: #126fcc;
  color: white;
}

.del-edit{
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}
table {
  table-layout: fixed ;
  width: 100% ;
  overflow-wrap: break-word;
}
td {
  width: 15% ;
}

.adding-btn{
  border-radius: 50px;
  font-size: 3.5em;
  padding: 10px 25px;
  cursor: pointer;
  margin-bottom: 30px;
  text-align: center;
  transition-duration: 0.4s;
  margin: 30px auto;
  display: block;
}

.adding-btn:hover{
  background-color: #0054a6;;
  color: white;
}


/* Edit Modal */
.modal-mask {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  z-index: 8;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  z-index: 10;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-body #update-btn{
  text-align: center;
}
#close-btn {
  float: right;
  padding: 2px 5px 2px 5px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>