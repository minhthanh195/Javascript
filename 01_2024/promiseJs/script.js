var callBackXmlHttp = function(theUrl, resolve) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      resolve(xmlHttp)
    };
  }
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}

// callBackXmlHttp('https://picsum.photos/200/300', (data) => {
//   

//   callBackXmlHttp('https://picsum.photos/200/300', (data) => {
//     

//     callBackXmlHttp('https://picsum.photos/200/300', (data)=> {
//       document.getElementById('img_3').setAttribute('src', data.responseURL)
//     })
//   })
// })

 

var initTestPromise = new Promise((resolve, reject) => {
  callBackXmlHttp('https://picsum.photos/200/300',resolve)
})

var initTestPromise2 = new Promise((resolve, reject) => {
  callBackXmlHttp('https://picsum.photos/200/300',resolve)
})

var initTestPromise3 = new Promise((resolve, reject) => {
  callBackXmlHttp('https://picsum.photos/200/300',resolve)
})

// ============================================== Handle Async/Await Basic ====================================================

var initTestAsyncAwait = async () => {
  try {
    let promise1 = await initTestPromise;
    document.getElementById('img_1').setAttribute('src', promise1.responseURL)
    let promise2 = await initTestPromise2;
    document.getElementById('img_2').setAttribute('src', promise2.responseURL)
    let promise3 = await initTestPromise3;
    document.getElementById('img_3').setAttribute('src', promise3.responseURL)
  }
  catch(error) {
    console.log({error})
  }
} 

initTestAsyncAwait()


// ============================================== Handle Promise Basic ====================================================
// initTestPromise
// .then((data) => {
//   document.getElementById('img_1').setAttribute('src', data.responseURL)
//   return initTestPromise2
// })
// .then((data) => {
//   document.getElementById('img_2').setAttribute('src', data.responseURL)
//   return initTestPromise3
// })
// .then((data) => {
//   document.getElementById('img_3').setAttribute('src', data.responseURL)
// })
// .catch((data) => {
//   console.log(data)
// })
// .finally(() => {
//   console.log('Finally')
// })