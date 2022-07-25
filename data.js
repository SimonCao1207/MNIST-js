import * as tf from '@tensorflow/tfjs';

export const IMAGE_H = 28
export const IMAGE_W = 28
const IMAGE_SIZE = IMAGE_H*IMAGE_W
const NUM_CLASSES = 10
const MNIST_LABELS_PATH = 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8'

export class MnistData {
  constructor() {}

  async load() {
    const img = new Image()
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const imgRequest = new Promise((resolve, reject) => {
      // TODO: load img
    })
    const labelRequest = fetch(MNIST_LABELS_PATH)
    const [imgResponse, labelsResponse] = await Promise.all([imgRequest, labelRequest])
    this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer())
    
    //TODO : split data for testing and training
  }

  getTrainData() {
    const xs = tf.tensor4d(
      this.trainImages,
      [this.trainImages.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1]
    )

    const labels = tf.tensor2d(
      this.trainLabels, [this.trainLabels.length / NUM_CLASSES, NUM_CLASSES]
    )
    return {xs, labels}
  }

  getTestData(numExamples) { 
    let xs = tf.tensor4d(
      this.testImages,
      [this.testImages.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1]
    )

    let labels = tf.tensor2d(
      this.testLabels, [this.testLabels.length / NUM_CLASSES, NUM_CLASSES]
    )

    if (numExamples!=null){
      xs = xs.slice([0,0,0,0], [numExamples, IMAGE_H, IMAGE_W, 1])
      labels = labels.slice([0,0], [numExamples, NUM_CLASSES])
    }
    return {xs, labels}
  }
}
