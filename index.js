import * as tf from '@tensorflow/tfjs'
import {IMAAGE_H, IMAGE_W, MnistData} from './data' 
import * as ui from './ui'

function createConvModel() {
  //TODO: define model here
}

async function train(model, onIteration) {
  //TODO: define model compile

  //TODO: model.fit
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