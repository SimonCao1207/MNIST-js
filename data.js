import * as tf from '@tensorflow/tfjs';
import { image } from '@tensorflow/tfjs';

export const IMAGE_H = 28
export const IMAGE_W = 28
const IMAGE_SIZE = IMAGE_H*IMAGE_W
const NUM_DATASET_ELEMENTS = 65000
const NUM_TRAIN_ELEMENTS = 55000
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS
const NUM_CLASSES = 10
const MNIST_LABELS_PATH = 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8'
const MNIST_IMAGES_PATH = 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png' // Image Sprite
export class MnistData {
  constructor() {}

  async load() {
    const img = new Image()
    const cnvs = document.getElementById('canvas')
    const ctx = cnvs.getContext("2d")
    console.log(cnvs);
    const imgRequest = new Promise((resolve, reject) => {
      // TODO: load img 
      img.crossOrigin = ''
      img.onload = () => {
        img.width = img.naturalWidth //784 = (28*28)
        img.height = img.naturalHeight //65000 = num_samples
        const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS*IMAGE_SIZE*4) // create a new buffer len 65000*28*28*(num_bytes=4)
        const chunkSize = 5000 
        cnvs.width = img.width
        cnvs.height = chunkSize
        // render on screen
        for (let i=0; i < NUM_DATASET_ELEMENTS/chunkSize; i++){
          // new Float32Array(buffer, byteOffset, length)
          ctx.drawImage(img, 0, i*chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize)
        }
        console.log(`width ${img.naturalWidth}, height: ${img.naturalHeight}`);
        this.dataSetImage = new Float32Array(datasetBytesBuffer)
        resolve()
      }
      img.src = MNIST_IMAGES_PATH 

    })
    const labelRequest = fetch(MNIST_LABELS_PATH)
    const [imgResponse, labelsResponse] = await Promise.all([imgRequest, labelRequest])
    console.log("image", img) // html image element 
    console.log("imgResponse", imgResponse) // undefined
    this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer())
    
    //TODO : split data for testing and training
    this.trainImages = this.dataSetImage.slice(0, IMAGE_SIZE*NUM_TRAIN_ELEMENTS)
    this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES*NUM_TRAIN_ELEMENTS)
    this.testImages = this.dataSetImage.slice(IMAGE_SIZE*NUM_TRAIN_ELEMENTS)
    this.testLabels = this.datasetLabels.slice(NUM_CLASSES*NUM_TRAIN_ELEMENTS)
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
