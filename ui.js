import * as tfvis from '@tensorflow/tfjs-vis'

const imageElements = document.getDocumentById("images")

export function showTestResults(batch, predicitons, labels) { 
  //TODO: later work
}

export function showTrainImages(trainBatch){
  //TODO: render on page the sample train images
  const trainExamples = trainBatch.xs.shape[0]
  imageElements.innerHTML = ''

}

export function setTrainButtonCallBack(callback) {
  const trainButton = document.getElementById("train")
  console.log(trainButton)
  trainButton.addEventListener('click', () => {
    callback()
    showTrainImages()
  })
}