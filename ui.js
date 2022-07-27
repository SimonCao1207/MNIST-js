import * as tfvis from '@tensorflow/tfjs-vis'

export function showTestResults(batch, predicitons, labels) { 
  //TODO: later work
}

export function showTrainImages(){
  //TODO: render on page the sample train images

}

export function setTrainButtonCallBack(callback) {
  const trainButton = document.getElementById("train")
  console.log(trainButton)
  trainButton.addEventListener('click', () => {
    callback()
  })
}