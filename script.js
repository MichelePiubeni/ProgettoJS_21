const sensori = document.getElementById("sensori")

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
//dichiaro variabili e le prendo dall'index

//fetch("https://python-iot-sim.professorandrea.repl.co")
//https://python-iot-sim.professorandrea.repl.co

//prende i dati dal sito dei sensori
fetch("https://hf3xzw.deta.dev/")
  .then(r => r.json())
  .then(body => {
    console.log(body)
    //let value = ""
    let type = ""
    let read = ""
    //mette tutti i sensori nella variabile type
    for (i = 0; i < body.sensors.length; i++) {
      read = JSON.stringify(body.sensors[i].readonly, null, 2)
      type = type + JSON.stringify(body.sensors[i].description, null, 2) +"<br>"
      //}
      if (i >= 4) { //serve per prendere gli ultimi 4 sensori perchè i primi 4 non danno i dati
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
    document.getElementById("sensori").innerHTML = JSON.stringify(body, null, 2)
  
    document.getElementById("Storico").innerHTML = storico
    
    // creazione grafico
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
//metodo che ricarica tutto e la fetch si attiva solo quando viene premuto il bottone
const btnAggiorna = document.getElementById("btnAggiorna")
btnAggiorna.onclick = () => {
  fetch("https://hf3xzw.deta.dev/")
    .then(r => r.json())
    .then(body => {
      console.log(body)
      let read = ""
      for (i = 0; i < body.sensors.length; i++) {
        read = JSON.stringify(body.sensors[i].readonly, null, 2)
       //gli if e il for controllano se lo storico ha spazio e se è pieno i sensori scalano di 4 per fare spazio a quelli nuovi(è uno storico che mostra solo gli ultimi 8 sensori)
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
      document.getElementById("sensori").innerHTML = JSON.stringify(body, null, 2)
      // il grafico rimane quello vecchio perchè quello nuovo viene disegnato sotto e si sovrappongono facendo vedere quello vecchio
      document.getElementById("Storico").innerHTML = storico
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [typeSensor1, typeSensor2, typeSensor3, typeSensor4],
          datasets: [{
            label: 'On/Off',
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
//metodo che aggiorna ma non serve perchè c'e gia l'altro
function reload() {
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
      document.getElementById("sensori").innerHTML = JSON.stringify(body, null, 2)
      document.getElementById("Storico").innerHTML = storico
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

//Aggiornamento dei dati con un timer
/*btnAggiorna.onclick = () => {
  console.log("click")
  btnAggiorna.disabled = true
  setInterval(() => {
    fetch("https://hf3xzw.deta.dev/")
      .then(r => r.json())
      .then(body => {
        console.log(body)
        let read = ""
        for (i = 0; i < body.sensors.length; i++) {
          read = JSON.stringify(body.sensors[i].readonly, null, 2)
          //if(let == "true"){
          //value = value + JSON.stringify(body.sensors[i].value,null,2) + "<br>" 
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
        document.getElementById("sensori").innerHTML = JSON.stringify(body, null, 2)
        //document.getElementById("value").innerHTML = value
        document.getElementById("Storico").innerHTML = storico

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [typeSensor1, typeSensor2, typeSensor3, typeSensor4],
            datasets: [{
              label: '',
              data: [typeSensor1Value, typeSensor2Value, typeSensor3Value, typeSensor4Value],
              backgroundColor: [
                'rgba(255, 99, 152, 0.2)',
                'rgba(54, 162, 285, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 195, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 129, 64, 0.2)'
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
  }, 1000)//tempo in cui ci mette per aggiornare, quindi in questo caso ogni secondo, si puo usare solo uno dei 2 metodi di aggiornamento per evitare conflitti
}*/