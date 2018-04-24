var path = require('path');
var fetch = require('node-fetch');

const baseURL = "https://api.github.com";



exports.getWeekData = function (req, res, next) {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const path = "/repos/" + owner + "/" + repo + "/stats/commit_activity";
  fetch(baseURL + path).then(function(response) {
    return response.json();
  }).then(function(json) {
    var day = new Date();
    var dayOfWeek = day.getDay();
    var totalData = new Array();



    var weekData;
    for(var poop = 3; poop > 0; poop--) {
      weekData = json[json.length-poop];
      for(var pee = 0; pee < 7; pee++) {
        totalData.push(weekData.days[pee]);
      }
    }

   // var weekData = json[json.length - 3];

   //  for (var i=0; i<7; i++) {
   //    totalData.push(weekData.days[i]);
   //  }
   //  weekData = json[json.length - 2];

   //  for (var j=0; j<7; j++) {
   //    totalData.push(weekData.days[j]);
   //  }

   //  weekData = json[json.length - 1];

   //  for (var k=0; k<7; k++) {
   //    totalData.push(weekData.days[k]);
   //  }

    switch(dayOfWeek) {
      case 0:
        dayOfWeek = 14;
        break;

      case 1:
        dayOfWeek = 15;
        break;

      case 2:
        dayOfWeek = 16;
        break;

      case 3:
        dayOfWeek = 17;
        break;

      case 4:
        dayOfWeek = 18;
        break;

      case 5:
        dayOfWeek = 19;
        break;

      case 6:
        dayOfWeek = 20;
        break;

      default:
        dayOfWeek = -1;
        break;
    }

    var myArray = new Array(7);
    // for (var z = 0; z< 7; z++) {
    //   myArray[6] += totalData[dayOfWeek-z];
    //   console.log(totalData[dayOfWeek-z]);
    // }
    var weekTotal;
    var d = new Date();
    var tomorrow = new Date(d.setDate(d.getDate()+1));
    for(var l = 6; l >= 0; l-- ) {
      d = new Date(tomorrow.getDate()+1);
      myArray[l]=new Array(2);
      myArray[l][1]=0;
      d =new Date(tomorrow.setDate(tomorrow.getDate()-1));
      myArray[l][0]=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
      for(var z = 0; z < 7; z++) {

        myArray[l][1]+=totalData[dayOfWeek-z];

      }



      dayOfWeek--;

    }

    const data = {
      "data" : myArray
    }
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "Could not get week data"});
  });
}


exports.getMonthData = function (req, res, next) {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const path = "/repos/" + owner + "/" + repo + "/stats/commit_activity";
  fetch(baseURL + path).then(function(response) {
    return response.json();
  }).then(function(json) {
    var day = new Date();
    var dayOfWeek = day.getDay();
    var totalData = new Array();

    var weekData;
    for(var poop = 7; poop > 0; poop--) {
      weekData = json[json.length-poop];
      for(var pee = 0; pee < 7; pee++) {
        totalData.push(weekData.days[pee]);
      }
    }

    switch(dayOfWeek) {
      case 0:
        dayOfWeek = 42;
        break;

      case 1:
        dayOfWeek = 43;
        break;

      case 2:
        dayOfWeek = 44;
        break;

      case 3:
        dayOfWeek = 45;
        break;

      case 4:
        dayOfWeek = 46;
        break;

      case 5:
        dayOfWeek = 47;
        break;

      case 6:
        dayOfWeek = 48;
        break;

      default:
        dayOfWeek = -1;
        break;
    }

    var myArray = new Array(30);
    // for (var z = 0; z< 7; z++) {
    //   myArray[6] += totalData[dayOfWeek-z];
    //   console.log(totalData[dayOfWeek-z]);
    // }
    var weekTotal;
    var d = new Date();
    var tomorrow = new Date(d.setDate(d.getDate()+1));
    for(var l = 29; l >= 0; l-- ) {
      d = new Date(tomorrow.getDate()+1);
      myArray[l]=new Array(2);
      myArray[l][1]=0;
      d = new Date(tomorrow.setDate(tomorrow.getDate()-1));
      myArray[l][0]=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
      for(var z = 0; z < 7; z++) {
        myArray[l][1]+=totalData[dayOfWeek-z];
      }
      dayOfWeek--;

    }

    const data = {
      "data" : myArray
    }
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "Could not get month data"});
  });
}

exports.getYearData = function (req, res, next) {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const path = "/repos/" + owner + "/" + repo + "/stats/commit_activity";
  fetch(baseURL + path).then(function(response) {
    return response.json();
  }).then(function(json) {
    var day = new Date();
    var dayOfWeek = day.getDay();
    var totalData = new Array();

    var weekData;
    for(var poop = 52; poop > 0; poop--) {
      weekData = json[json.length-poop];
      for(var pee = 0; pee < 7; pee++) {
        totalData.push(weekData.days[pee]);
      }
    }

    switch(dayOfWeek) {
      case 0:
        dayOfWeek = 358;
        break;

      case 1:
        dayOfWeek = 359;
        break;

      case 2:
        dayOfWeek = 360;
        break;

      case 3:
        dayOfWeek = 361;
        break;

      case 4:
        dayOfWeek = 362;
        break;

      case 5:
        dayOfWeek = 363;
        break;

      case 6:
        dayOfWeek = 364;
        break;

      default:
        dayOfWeek = -1;
        break;
    }

    var myArray = new Array(51);
    // for (var z = 0; z< 7; z++) {
    //   myArray[6] += totalData[dayOfWeek-z];
    //   console.log(totalData[dayOfWeek-z]);
    // }
    var weekTotal;
    var d = new Date();
    var tomorrow = new Date(d.setDate(d.getDate()+7));
    console.log(tomorrow);
      d = new Date(tomorrow.getDate()+1);
      for(var l = 50; l >= 0; l--) {
      console.log(d);
      myArray[l]=new Array(2);
      myArray[l][1]=0;
      d = new Date(tomorrow.setDate(tomorrow.getDate()-7));
      myArray[l][0]=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
      for(var z = 0; z < 7; z++) {
        myArray[l][1]+=totalData[dayOfWeek-z];
      }
       dayOfWeek=dayOfWeek-7;
      // if(dayOfWeek < 7) {
      //   myArray[l][1]=-1;
      //   break;
      // }


    }

    const data = {
      "data" : myArray
    }
    res.send(data);
  }).catch(function(err) {
    res.status(400).send({message : "Could not get year data"});
  });
}
