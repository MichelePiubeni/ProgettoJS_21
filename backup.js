const debug = document.getElementById("debug")
const type = document.getElementById("type")
var typeSensor1 = document.getElementById("typeSensor1")
var typeSensor2 = document.getElementById("typeSensor2")
var typeSensor3 = document.getElementById("typeSensor3")
var typeSensor4 = document.getElementById("typeSensor4")
var typeSensor1Value = 0
var typeSensor2Value = 0
var typeSensor3Value = 0
var typeSensor4Value = 0
var storico = []
let j = 0
var interval;

//fetch("https://python-iot-sim.professorandrea.repl.co")
//https://python-iot-sim.professorandrea.repl.co
fetch("https://hf3xzw.deta.dev/")
  .then(r => r.json())
  .then(body => {
    console.log(body)
    let type = ""
    let read = ""
    for (i = 0; i < body.sensors.length; i++) {
      read = JSON.stringify(body.sensors[i].readonly, null, 2)
      
      type = type + JSON.stringify(body.sensors[i].description, null, 2)
      if (i >= 4) {
        storico[j] = "<br>" + JSON.stringify(body.sensors[i].value, null, 2)
        j++
        typeSensor1 = JSON.stringify(body.sensors[4].description, null, 2)
        typeSensor2 = JSON.stringify(body.sensors[5].description, null, 2)
        typeSensor3 = JSON.stringify(body.sensors[6].description, null, 2)
        typeSensor4 = JSON.stringify(body.sensors[7].description, null, 2)
        typeSensor1Value = JSON.stringify(body.sensors[4].value, null, 2)
        typeSensor2Value = JSON.stringify(body.sensors[5].value, null, 2)
        typeSensor3Value = JSON.stringify(body.sensors[6].value, null, 2)
        typeSensor4Value = JSON.stringify(body.sensors[7].value, null, 2)
      }
    }
    document.getElementById("debug").innerHTML = JSON.stringify(body, null, 2)
    document.getElementById("type").innerHTML = type
    document.getElementById("Storico").innerHTML = storico
    document.getElementById("typeSensor1").innerHTML = typeSensor1
    document.getElementById("typeSensor2").innerHTML = typeSensor2
    document.getElementById("typeSensor3").innerHTML = typeSensor3
    document.getElementById("typeSensor4").innerHTML = typeSensor4

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [typeSensor1, typeSensor2, typeSensor3, typeSensor4],
        datasets: [{
          label: '',
          data: [typeSensor1Value, typeSensor2Value, typeSensor3Value, typeSensor4Value],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })

const btnAggiorna = document.getElementById("btnAggiorna")
btnAggiorna.onclick = () => {
  //fetch("https://python-iot-sim.professorandrea.repl.co")
  //document.body.innerHTML = ""
  //interval = setTimeout(function() { reload(); }, 1000);
  //clearInterval(interval)
//}

/*function reload () {*/
  fetch("https://hf3xzw.deta.dev/")
    .then(r => r.json())
    .then(body => {
      console.log(body)
      let read = ""
      for (i = 0; i < body.sensors.length; i++) {
        read = JSON.stringify(body.sensors[i].readonly, null, 2)
      
        if (i >= 4) {
          if (j == 8) {
            for (m = 0; m < 4; m++) {
              storico[m] = storico[m + 4]
            }
            j = 4
          }
          storico[j] = "<br>" + JSON.stringify(body.sensors[i].value, null, 2)
          j++
        }
        typeSensor1Value = JSON.stringify(body.sensors[4].value, null, 2)
        typeSensor2Value = JSON.stringify(body.sensors[5].value, null, 2)
        typeSensor3Value = JSON.stringify(body.sensors[6].value, null, 2)
        typeSensor4Value = JSON.stringify(body.sensors[7].value, null, 2)

      }
      document.getElementById("debug").innerHTML = JSON.stringify(body, null, 2)
      
      document.getElementById("Storico").innerHTML = storico
      document.getElementById("typeSensor1").innerHTML = typeSensor1
      document.getElementById("typeSensor2").innerHTML = typeSensor2
      document.getElementById("typeSensor3").innerHTML = typeSensor3
      document.getElementById("typeSensor4").innerHTML = typeSensor4

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [typeSensor1, typeSensor2, typeSensor3, typeSensor4],
          datasets: [{
            label: '',
            data: [typeSensor1Value, typeSensor2Value, typeSensor3Value, typeSensor4Value],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
}
/*function reload(){
  fetch("https://hf3xzw.deta.dev/")
  .then(r => r.json())
  .then(body => {
    console.log(body)
    let type = ""
    let read = ""
    for (i = 0; i < body.sensors.length; i++) {
      read = JSON.stringify(body.sensors[i].readonly, null, 2)
      //if(let == "true"){
      type = type + JSON.stringify(body.sensors[i].description, null, 2)
      //}
      if (i >= 4) {
        storico[j] = "<br>" + JSON.stringify(body.sensors[i].value, null, 2)
        j++
        typeSensor1 = JSON.stringify(body.sensors[4].description, null, 2)
        typeSensor2 = JSON.stringify(body.sensors[5].description, null, 2)
        typeSensor3 = JSON.stringify(body.sensors[6].description, null, 2)
        typeSensor4 = JSON.stringify(body.sensors[7].description, null, 2)
        typeSensor1Value = JSON.stringify(body.sensors[4].value, null, 2)
        typeSensor2Value = JSON.stringify(body.sensors[5].value, null, 2)
        typeSensor3Value = JSON.stringify(body.sensors[6].value, null, 2)
        typeSensor4Value = JSON.stringify(body.sensors[7].value, null, 2)
      }
    }
    document.getElementById("debug").innerHTML = JSON.stringify(body, null, 2)
    document.getElementById("type").innerHTML = type
    document.getElementById("Storico").innerHTML = storico
    document.getElementById("typeSensor1").innerHTML = typeSensor1
    document.getElementById("typeSensor2").innerHTML = typeSensor2
    document.getElementById("typeSensor3").innerHTML = typeSensor3
    document.getElementById("typeSensor4").innerHTML = typeSensor4
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [typeSensor1, typeSensor2, typeSensor3, typeSensor4],
        datasets: [{
          label: '',
          data: [typeSensor1Value, typeSensor2Value, typeSensor3Value, typeSensor4Value],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
}*/

function modifica() {
  let ID = parseInt(document.getElementById('ID').value)
  fetch("https://hf3xzw.deta.dev/")
    .then(r => r.json())
    .then(body => {
      console.log(body)
      for (i = 0; i < body.sensors.length; i++) {
        read = JSON.stringify(body.sensors[i].readonly, null, 2)
      }
    })
}