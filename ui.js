import * as tfvis from '@tensorflow/tfjs-vis'

const imageElements = document.getElementById("images")

export function showTestResults(batch, predicitons, labels) { 
  //TODO: given batch, predictions and labels => render result on page

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
  })
}