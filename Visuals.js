// let dataset
// let salarySizeScale, salaryXScale, categoryColorScale
// let simulation, nodes
// let categoryLegend, salaryLegend
// let interval, trans_timeout
const sections = document.getElementById("graphic");
// for (const section of sections) {
//   section.style.display = "none";
// }
sections.style.display = "none";

// function myFunction(imgs) {
//   // Get the expanded image
//   var expandImg = document.getElementById("expandedImg");
//   // Get the image text
//   var imgText = document.getElementById("imgtext");
//   // Use the same src in the expanded image as the image being clicked on from the grid
//   expandImg.src = imgs.src;
//   // Use the value of the alt attribute of the clickable image as text inside the expanded image
//   imgText.innerHTML = imgs.alt;
//   // Show the container element (hidden with CSS)
//   expandImg.parentElement.style.display = "block";
// }

function myFunction(imgName, altText) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgName;
  expandImg.alt = altText;
  imgText.innerHTML = altText;
  expandImg.parentElement.style.display = "block";
}




// var moment = require(['require', 'node_modules/moment/moment']);



// const margin = {top: 20, right: 20, bottom: 30, left: 100};
// const width = 800 - margin.left - margin.right
// const height = 600 - margin.bottom - margin.top

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

var setDateTime = function(date, str){
    var sp = str.split(':');
    date.setHours(parseInt(sp[0],10));
    date.setMinutes(parseInt(sp[1],10));
    date.setSeconds(parseInt(sp[2],10));
    return date;
}

document.getElementById("file-upload").addEventListener("change", getFile);


function getFile(event) {

var loading = {
  start: function() {
    document.body.insertAdjacentHTML('beforeend', '<div id="overlay"></div>');
    document.body.insertAdjacentHTML('beforeend', '<div id="loading">LOADING</div><br><br>');
    document.body.insertAdjacentHTML('beforeend', '<br><br><div class="loader"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div></div>');
  }
};
loading.start();


const input = event.target;
if ("files" in input && input.files.length > 0) {
  placeFileContent(document.getElementById("content-target"), input.files[0]);
}
// var loading = document.getElementById("loading");
//   loading.remove(loading);
// 
}

function WordCount(str) { 
  return str.split(" ").length;
}
function haha_counter(str) {
  if (str.includes("hahahaha")){
    return 4;
  }
  else if (str.includes("hahahah")){
    return 3.5;
  }
  else if (str.includes("hahahaha")){
    return 3;
  }
  else if (str.includes("hahahah")){
    return 2.5;
  }
  else if (str.includes("hahaha")){
    return 2;
  }
  else if (str.includes("hahah")){
    return 1.5;
  }
  else if (str.includes("haha")){
    return 1;
  }
  else {
    return 0;
  }
}
function count_quest(str){
  var count = 0
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "?") {
      count++
    }
  }
  return count
}
function getMinutes(str) {
  var time = str.split(':');
  return time[0]*60+time[1]*1;
}

function count_emoji(str) {
  const regex = /[\u{1F000}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAC0}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;
  // const regex = /\p{Emoji}/gu; // regex to match emojis
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

function count_laughing_emo(str) {
    const regex = /😂/gu; // regex to match the specific emoji
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

function count_heart_emo(str) {
  const regex = /❤️/gu; // regex to match the specific emoji
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

function count_morning(date){
  var start_day = moment(date['_i'].split(",")[0], "DD/MM/YYYY");
  var end_day = moment(date['_i'].split(",")[0], "DD/MM/YYYY");
  var start = moment('06:00:00', "HH:mm:ss");
  var end = moment('11:59:59', "HH:mm:ss");
  start_day.set({
    hour:   start.get('hour'),
    minute: start.get('minute'),
    second: start.get('second')
});
end_day.set({
  hour:   end.get('hour'),
  minute: end.get('minute'),
  second: end.get('second')
});

  if (moment(date).isBetween(start_day, end_day))
    return 1
  else
    return 0
}
function count_night(date){
  var night_day = moment(date['_i'].split(",")[0], "DD/MM/YYYY");
  var morning_day = moment(date['_i'].split(",")[0], "DD/MM/YYYY");
  var start = moment('00:00:01', "HH:mm:ss");
  var end = moment('06:00:00', "HH:mm:ss");
  night_day.set({
    hour:   start.get('hour'),
    minute: start.get('minute'),
    second: start.get('second')
});
morning_day.set({
  hour:   end.get('hour'),
  minute: end.get('minute'),
  second: end.get('second')
});

  if (moment(date).isBetween(night_day, morning_day))
    return 1
  else
    return 0
}


function placeFileContent(target, file) {
readFileContent(file)
.then((content) => {
// target.value = content;

  const dateTimeList = [];
  const nameList = [];
  const textList = [];
  const word_countlist = [];
  const haha_countlist = [];
  const question_countlist = [];
  const morning_countlist = [];
  const night_countlist = [];
  const emoji_countlist = [];
  // const message_list = [];
  const laugh_countlist = [];
  const heart_countlist = []
//   const dateTimeFormat = "dd-mm-yyyy hh:mm:ss";
  
const yearSelect = document.getElementById("year");
const timeSelect = document.getElementById("time_format");

// Get the currently selected value
const selectedYear = yearSelect.value;
const selectedTime = timeSelect.value;

  const lines = content.split("\n");
  for (let line of lines) {
    if (line[0] === "[") {
        if (line.split("]", 2)[1].includes(":") == true) {
            const date = moment(line.split("]", 1)[0].replace("[", ""), selectedTime);
            dateTimeList.push(date['_d']);
            const name = line.split("]", 2)[1].split(":", 1)[0];
            nameList.push(name.substring(1));
            const text = line.split("]", 2)[1].split(":", 2)[1];
            textList.push(text.substring(1, text.length - 1));
            const word_count = WordCount(text.substring(1, text.length - 1))
            word_countlist.push(word_count)
            const haha_count = haha_counter(text.substring(1, text.length - 1).toLowerCase())
            haha_countlist.push(haha_count)
            const quest_count = count_quest(text.substring(1, text.length - 1).toLowerCase())
            question_countlist.push(quest_count)
            const morning_count = count_morning(date)
            morning_countlist.push(morning_count)
            const emoji_count = count_emoji(text)
            emoji_countlist.push(emoji_count)
            const heart_count = count_heart_emo(text)
            heart_countlist.push(heart_count)
            const laugh_count = count_laughing_emo(text)
            laugh_countlist.push(laugh_count)
            const night_count = count_night(date)
            night_countlist.push(night_count)
            // message_list.push(text)
    }
    }
}

const data = [];
  for (let i = 0; i < dateTimeList.length; i++) {
    data.push({
      date: dateTimeList[i],
      Person: nameList[i],
      Message: textList[i],
      Message_count: 1,
      Words_count: word_countlist[i],
      Haha_count: haha_countlist[i],
      Quest_count: question_countlist[i],
      Morning_count: morning_countlist[i],
      Night_count: night_countlist[i],
      Emoji_count: emoji_countlist[i],
      Laugh_count: laugh_countlist[i],
      Heart_count: heart_countlist[i]
    });
  }

  let filteredData = data.filter((entry) => entry.Message !== "-");
  filteredData = filteredData.filter(
    (entry) =>
      entry.date >= new Date(selectedYear + "-01-01") &&
      entry.date <= new Date(selectedYear + "-12-30")
  );

  var nest = d3.nest()
    .key(function(row) { return row.Person; })
    .rollup(function(values) {
      return {
          Message_tot: d3.sum(values, function(d) { return +d.Message_count; }),
          Words_tot: d3.sum(values, function(d) { return +d.Words_count; }),
          Quest_tot: d3.sum(values, function(d) { return +d.Quest_count; }),
          Morning_tot: d3.sum(values, function(d) { return +d.Morning_count; }),
          Night_tot: d3.sum(values, function(d) { return +d.Night_count; }),
          Haha_tot: d3.sum(values, function(d) { return +d.Haha_count; }),
          Emoji_tot: d3.sum(values, function(d) { return +d.Emoji_count; }),
          Laugh_tot: d3.sum(values, function(d) { return +d.Laugh_count; }),
          Heart_tot: d3.sum(values, function(d) { return +d.Heart_count; }),
          Words_mean: d3.mean(values, function(d) { return +d.Words_count; }),
          Quest_mean: d3.mean(values, function(d) { return +d.Quest_count; }),
          Morning_mean: d3.mean(values, function(d) { return +d.Morning_count; }),
          Night_mean: d3.mean(values, function(d) { return +d.Night_count; }),
          Haha_mean: d3.mean(values, function(d) { return +d.Haha_count; }),
          Emoji_mean: d3.mean(values, function(d) { return +d.Emoji_count; }),
          Laugh_mean: d3.mean(values, function(d) { return +d.Laugh_count; }),
          Heart_mean: d3.mean(values, function(d) { return +d.Heart_count; })
      };
    })
    // .rollup(function(values) { return d3.sum(values, function(d) {return +d.Words_count; })  })
    // .rollup(function(questions) { return d3.sum(questions, function(d) {return +d.Quest_count; })  })
    .entries(filteredData);
  
  // const sumId = filteredData.reduce((a, {
  //     Person,
  //     Words_count
  //   }) => (a[Person] = (a[Person] || 0) + Words_count, a), {});

  data_visuals(nest);
  // console.log(nest);
})
.catch((error) => console.log(error));
}

function readFileContent(file) {
const reader = new FileReader();
return new Promise((resolve, reject) => {
reader.onload = (event) => resolve(event.target.result);
reader.onerror = (error) => reject(error);
reader.readAsText(file);
});
}

