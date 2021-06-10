<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  margin:0;
  padding: 0;
  font-family: 'Oswald', sans-serif;
}
html,body{
  overflow: hidden;
}
html,body::-webkit-scrollbar{
  width:0;
  height: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.page-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #f2f2f280;
  backdrop-filter: blur(5px);
}
.main-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

</style>
