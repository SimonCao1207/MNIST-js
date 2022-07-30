import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'
const imageElements = document.getElementById("images")
const imageTrainElements = document.getElementById("train-images")

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

export function renderTrainImages(trainBatch){
  //TODO: render on page some sample train images
  const trainExamples = 10
  imageTrainElements.innerHTML = ''
  for (let i=0; i<trainExamples; i++){
    console.log("loading");
    const image = trainBatch.xs.slice([i, 0], [1, trainBatch.xs.shape[1]]) // why ? shape : 1*28*28*1
    const div = document.createElement('div')
    div.className = 'pred-container'
    const canvas = document.createElement('canvas')
    canvas.className = 'prediction-canvas'
    draw(image.flatten(), canvas)
    div.appendChild(canvas)
    imageTrainElements.appendChild(div)
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

export function displayTrainImages(callback){
  callback()
}

export function setTrainButtonCallBack(callback) {
  const trainButton = document.getElementById("train")
  trainButton.addEventListener('click', () => {
    callback()
  })

  // const testButton_removed = document.getElementById("testing-code")
  // testButton_removed.addEventListener("click", () => {
  //   // TEST YOUR CODE here 
  //   const xs = tf.tensor4d([...Array(10*28*28).keys()], [10, 28, 28, 1]);
  //   const xsSlice = xs.slice([1, 0], [1, 28]) // 1*28*28*1
  //   const xsSlice_same = xs.slice([1,0,0,0], [1, 28, 28, 1])
  //   const c = xsSlice.equal(xsSlice_same).sum().dataSync()[0]
  //   c === xsSlice.shape.reduce((a,b) => a *= b) ? console.log("true") : console.log("false")
  // })
}