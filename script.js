const debug = document.getElementById("debug")

function setVisible(domId, visible) {
  let value = "none"
  if(visible === true) {
    value = "block"
  }
  document.getElementById(domId).style.display= value
}

function setContent(domId,content) {
  document.getElementById(domId).innerHTML = content 
}

fetch("https://python-iot-sim.professorandrea.repl.co")
//https://python-iot-sim.professorandrea.repl.co
//fetch("https://hf3xzw.deta.dev/")
  .then(r => r.json()) // (1)
  .then(body => {
    console.log(body)
    document.getElementById("debug").innerHTML = JSON.stringify(body,null,2)
  })