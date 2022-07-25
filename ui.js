import * as tfvis from '@tensorflow/tfjs-vis'

export function showTestResults(batch, predicitons, labels) { 
  //TODO: 
}

export function setTrainButtonCallBack(callback) {
  const trainButton = document.getElementById("train")
  console.log(trainButton)
  trainButton.addEventListener('click', () => console.log("something"))
}