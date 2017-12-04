# DL pipeline Design

_Italic_
__Bold__
___Italic Bold___
> to be or not to be, that is the [question](http://example.com/)


`code`
```javascript
public class HelloWorld {
}
```

## Common layers
have you ever think of why there are layers in deep learning? think of a pipeline in automobile factory. building a car is complex so that it is break into many small jobs, one after another. 
By encapsulate some specialized functionalities into a layer, we can combine arbitrary layers together to do different type of tasks.

Factors:
	1. purpose/feature
	2. performance
	3. BP

### Fully connect layer
__input__ features
__output__ 
Used to do classification from input features

### Activation layer
Add nonlinearity?

	* Sigmoid
	* RELU
	* TanH

### Convolutional layer
The output from the convolutional layers represents high-level features in the data. While that output could be flattened and connected to the output layer, adding a fully-connected layer is a (usually) cheap way of learning non-linear combinations of these features.

Essentially the convolutional layers are providing a meaningful, low-dimensional, and somewhat invariant feature space, and the fully-connected layer is learning a (possibly non-linear) function in that space.

    * Conv1D
    * Conv2D

### Deconvolutional layer

### Downsampling layer
    - maxpooling
    - ef     
	-	`some text`
    - averagepooling

### Upsampling

### Batch Normalization layer


### Recurrent layer

### Embedding layer

## Inter-connection
### Transfer learning
    1. Word2vec/glove
    2. VGG




## Use case analysis:
	1. Image classification
	2. Image semantic segmentation
	3. Object detection
	4. Sentiment analysis
	5. Word embedding
