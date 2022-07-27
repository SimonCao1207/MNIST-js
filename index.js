import * as tf from '@tensorflow/tfjs';
import { MnistData } from './data'
import * as ui from './ui'


let data

async function load(){
  const data = new MnistData()
  await data.load()
}

function createConvModel() {
  //TODO: define model here
}

async function train(model, onIteration) {
  //TODO: define model compile
  model.compile({
    optimize: 'rmsprop', 
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })

  //TODO: model.fit
  const trainData = data.getTrainData()
  const testData = data.getTestData()

  await model.fit(trainData.xs, trainData.labels, {
    batchSize, 
    validationSplit,
    epochs: trainEpochs,
    callbacks : {
      onBatchEnd: async (batch, logs) => {
        //TODO: print status message and plot graph (loss, accucuracy) ? when batch end
        
        await tf.nextFrame()
      },
      
      onEpochEnd: async (epoch, logs) => {
        //TODO: plot graphs

        await tf.nextFrame()
      }

    }
  })
}

async function showPredictions(model) {
  const testExamples = 10
  const examples = data.getTestData(testExamples)

  tf.tidy(() => {
    const output = model.predict(examples.xs)
    const labels = Array.from(examples.labels.argMax(1).dataSync())
    const predictions = Array.from(output.argMax(1).dataSync())
    ui.showTestResults(examples, predictions, labels)
  })
}

function createModel() {
  const model = createConvModel()
  return model
}

//TODO: main function, load data, train model, show what model predict on unseen data.
ui.setTrainButtonCallBack(async () => {
  await load() // await to load the data
})
