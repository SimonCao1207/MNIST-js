import { flatten } from '@tensorflow/tfjs-layers/dist/exports_layers'
import * as tfvis from '@tensorflow/tfjs-vis'

const imageElements = document.getElementById("images")

export function showTestResults(batch, predictions, labels) { 
  // batch shape : [10,28,28,1]
  
  const testExamples = batch.xs.shape[0]
  imageElements.innerHTML = ''
  for (let i=0; i < testExamples; i++){
    const image = batch.xs.slice([i, 0], [1, batch.xs.shape[1]]) // why ? shape : 1*28*28*1
    const div = document.createElement('div')
    div.className = 'pred-container'
    const canvas = document.createElement('canvas')
    canvas.className = 'prediction-canvas'
    draw(image.flatten(), canvas)

    const pred = document.createElement('div')
    const prediction = predictions[i]
    const label = labels[i]
    const correct = prediction === label
    pred.className = `pred ${(correct ? 'pred-correct' : 'pred-incorrect')}`
    pred.innerText = `pred: ${prediction}`

    div.appendChild(canvas)
    div.appendChild(pred)

    imageElements.appendChild(div)
  }
}

export function draw(image, canvas){
  const [width, height] = [28, 28]
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const imageData = new ImageData(width, height)
  const data = image.dataSync() // why ? 
  for (let i=0; i < height*width; i++){
    const j = i*4
    imageData.data[j+0] = data[i] * 255 // why ?
    imageData.data[j+1] = data[i] * 255
    imageData.data[j+2] = data[i] * 255
    imageData.data[j+3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  
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