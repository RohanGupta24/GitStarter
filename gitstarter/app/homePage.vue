<template>
<div>
  <div class="jumbotron hero-nature">
  	<div class="typewriter">
    	<h1 id=upperText>GitStarter</h1>
      <div id="descriptionTitle">
        <p id=upperText>Built for Developers.</p>
    	  <p id=upperText>A marketplace for open source projects.</p>
      </div>
  	</div>

  <!--   <h1 id=upperText>GitStarter</h1> -->

  <!--   <hr class="my-4">
   -->
    <a class="btn btn-primary btn-lg" href="#" role="button">GITHUB BUTTON HERE</a>
  </div>
  <div id="OrderPickContainer">

    <div class="form-group row" id=centered>
      <div class="col-10">
      <input class="form-control" type="search" placeholder="Search for projects" v-model="search">
    </div>
    </div>




    <table class="table table-hover" id="table1">

      <tbody>
          <template v-for="project in ProjectsLists">

              <tr>

              <td style="font-size:30px"><a :href="project.owner">{{project.owner}}</a> / <a :href="project.name">{{project.name}}</a>

              <br>
              {{ project.description }}



              </td>
                  <!-- <td>{{batch.Icon}}</td>
                  <td>{{batch.ProjectName}}</td>
                  <td>{{batch.Prices}}</td>
                   -->

              </tr>
          </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
module.exports = {
    data: function() {
      return {};
    }
};
</script>

<style>
div.jumbotron.hero-nature{
    background: rgb(0,0,0);
	background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(82,105,236,1) 50%, rgba(0,0,0,1) 100%);
    text-align:center;
    background-size:cover;
    background-position:center;
    padding-top:50px;
    padding-bottom:100px;
}

 table#table1 {
    width:70%;
    margin-left:15%;
    margin-right:15%;
    height: 50px;
    vertical-align: middle;
  }

#centered{
	/*height: 200px;*/
    padding-left: 500px;
    padding-right: 500px;
/*    text-align: center
*/}

.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

.descriptionTitle {
  padding: 20px 15px;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 50% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: transparent; }
}
#upperText {
	font-weight: bold;
	/*background: #1e5799;*/
	color:white;
	font-family:"Lucida Console", Monaco, monospace
}
</style>
