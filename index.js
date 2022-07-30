import * as tf from '@tensorflow/tfjs';
import { IMAGE_H, IMAGE_W, MnistData } from './data'
import * as ui from './ui'

function createConvModel() {
  const model = tf.sequential()
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_H, IMAGE_W, 1],
    kernelSize: 3, 
    filters: 16,
    activation: 'relu'
  }))
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}))
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}))
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}))
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  model.add(tf.layers.flatten({}));
  model.add(tf.layers.dense({units: 64, activation: 'relu'}));
  model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
  return model
}

async function train(model, onIteration) {
  model.compile({
    optimizer: 'rmsprop', 
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })

  const trainData = data.getTrainData()
  const testData = data.getTestData()
  const batchSize = 320
  const validationSplit = 0.15
  const trainEpochs = 3 // TODO: get from user (getTrainEpoch() in ui)
  await model.fit(trainData.xs, trainData.labels, {
    batchSize, 
    validationSplit,
    epochs: trainEpochs,
    callbacks : {
      onBatchEnd: async (batch, logs) => {
        //TODO: print status message and plot graph (loss, accucuracy) ? when batch end
        if (onIteration && batch%10 === 0)
          onIteration("onBatchEnd", batch, logs)
        await tf.nextFrame()
      },
      
      onEpochEnd: async (epoch, logs) => {
        //TODO: plot graphs
        if (onIteration)
          onIteration("onEpochEnd", epoch, logs)
        await tf.nextFrame()
      }
    }
  })
}

async function showPredictions(model) {
  const testExamples = 100
  const examples = data.getTestData(testExamples)

  tf.tidy(() => {
    const output = model.predict(examples.xs)
    const labels = Array.from(examples.labels.argMax(1).dataSync())
    const predictions = Array.from(output.argMax(1).dataSync())
    ui.showTestResults(examples, predictions, labels)
  })
}
function createModel() {
  let model = createConvModel()
  return model
}

let data
async function load(){
  data = new MnistData()
  await data.load()
}

async function renderImages() {
  const trainBatch = data.getTrainData()
  ui.renderTrainImages(trainBatch)
}

ui.displayTrainImages(async () => {
  // TODO: display random train images
  await load()
  await renderImages()
})

//Main function, load data, train model, show what model predict on unseen data.
ui.setTrainButtonCallBack(async () => {
  await load()
  const model = createModel()
  model.summary()
  await train(model, () => showPredictions(model))
})
