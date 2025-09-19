export const questions = [
  {
    questionText: 'What is the primary characteristic of a Scalar?',
    answerOptions: [
      { answerText: 'It is a list of numbers.', isCorrect: false },
      { answerText: 'It has both magnitude and direction.', isCorrect: false },
      { answerText: 'It is a single, simple number.', isCorrect: true },
      { answerText: 'It is a multi-dimensional array.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Vector?',
    answerOptions: [
      { answerText: 'A single, simple number.', isCorrect: false },
      { answerText: 'A list of numbers, usually describing something with direction or multiple values.', isCorrect: true },
      { answerText: 'A two-dimensional grid of numbers.', isCorrect: false },
      { answerText: 'A non-linear function.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the difference between a Vector and a Matrix?',
    answerOptions: [
      { answerText: 'A vector is a single number, while a matrix is a list of numbers.', isCorrect: false },
      { answerText: 'A vector is a single row or column of numbers, while a matrix is a two-dimensional grid of numbers.', isCorrect: true },
      { answerText: 'A matrix has direction, while a vector does not.', isCorrect: false },
      { answerText: 'They are the same thing.', isCorrect: false },
    ],
  },
  {
    questionText: 'In a neural network, what does a "backward pass" calculate?',
    answerOptions: [
      { answerText: 'The initial weights of the network.', isCorrect: false },
      { answerText: 'The gradients of the model\'s parameters with respect to the loss function.', isCorrect: true },
      { answerText: 'The forward propagation of data through the layers.', isCorrect: false },
      { answerText: 'The number of neurons in each layer.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the purpose of an Activation Function?',
    answerOptions: [
      { answerText: 'To convert data from one type to another.', isCorrect: false },
      { answerText: 'To add non-linearity to the model, enabling it to learn complex patterns.', isCorrect: true },
      { answerText: 'To define the number of layers in a network.', isCorrect: false },
      { answerText: 'To store and retrieve model parameters.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Tensor in PyTorch?',
    answerOptions: [
      { answerText: 'A programming language.', isCorrect: false },
      { answerText: 'A two-dimensional array only.', isCorrect: false },
      { answerText: 'A multi-dimensional array used for calculations.', isCorrect: true },
      { answerText: 'A type of variable that stores only a single value.', isCorrect: false },
    ],
  },
  {
    questionText: 'What does a Loss Function measure?',
    answerOptions: [
      { answerText: 'The execution time of the model.', isCorrect: false },
      { answerText: 'The quality of the input data.', isCorrect: false },
      { answerText: 'The difference between the model\'s prediction and the actual value.', isCorrect: true },
      { answerText: 'The number of epochs completed.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the primary role of an Optimizer during training?',
    answerOptions: [
      { answerText: 'To increase the number of layers in the model.', isCorrect: false },
      { answerText: 'To adjust the model\'s parameters to minimize the loss.', isCorrect: true },
      { answerText: 'To randomly generate new training data.', isCorrect: false },
      { answerText: 'To define the model\'s architecture.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a single Epoch?',
    answerOptions: [
      { answerText: 'A single training step on one data point.', isCorrect: false },
      { answerText: 'The entire dataset passed through the network once.', isCorrect: true },
      { answerText: 'A small portion of the dataset used for training.', isCorrect: false },
      { answerText: 'A complete training session from start to finish.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Batch?',
    answerOptions: [
      { answerText: 'A single training step.', isCorrect: false },
      { answerText: 'A randomly selected portion of the dataset.', isCorrect: true },
      { answerText: 'The entire dataset.', isCorrect: false },
      { answerText: 'A list of model parameters.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Layer in a neural network?',
    answerOptions: [
      { answerText: 'A collection of weights.', isCorrect: false },
      { answerText: 'A group of interconnected neurons that process data.', isCorrect: true },
      { answerText: 'The final output of the network.', isCorrect: false },
      { answerText: 'A single data point.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Neuron?',
    answerOptions: [
      { answerText: 'The final output of the network.', isCorrect: false },
      { answerText: 'The basic computational unit of a neural network.', isCorrect: true },
      { answerText: 'An external hardware component.', isCorrect: false },
      { answerText: 'A type of dataset.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a CNN (Convolutional Neural Network) primarily used for?',
    answerOptions: [
      { answerText: 'Predicting stock prices.', isCorrect: false },
      { answerText: 'Generating text.', isCorrect: false },
      { answerText: 'Image recognition and processing.', isCorrect: true },
      { answerText: 'Analyzing sequential data like text.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which type of network is best suited for sequential data like text or time series?',
    answerOptions: [
      { answerText: 'CNN.', isCorrect: false },
      { answerText: 'RNN (Recurrent Neural Network).', isCorrect: true },
      { answerText: 'Perceptron.', isCorrect: false },
      { answerText: 'GAN.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a GAN (Generative Adversarial Network) known for?',
    answerOptions: [
      { answerText: 'Classifying images.', isCorrect: false },
      { answerText: 'Generating new, realistic data like images or text.', isCorrect: true },
      { answerText: 'Translating languages.', isCorrect: false },
      { answerText: 'Predicting numerical values.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Transformer model used for?',
    answerOptions: [
      { answerText: 'Financial forecasting.', isCorrect: false },
      { answerText: 'Image classification.', isCorrect: false },
      { answerText: 'Natural Language Processing (NLP) tasks like language translation and text generation.', isCorrect: true },
      { answerText: 'Generating new images.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a Linear Function?',
    answerOptions: [
      { answerText: 'A function that creates a curved line.', isCorrect: false },
      { answerText: 'A function that creates a straight line.', isCorrect: true },
      { answerText: 'A function with multiple outputs.', isCorrect: false },
      { answerText: 'A function that operates only on vectors.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is an Array or Matrix?',
    answerOptions: [
      { answerText: 'A single number.', isCorrect: false },
      { answerText: 'A one-dimensional list.', isCorrect: false },
      { answerText: 'A single vector.', isCorrect: false },
      { answerText: 'A grid of numbers.', isCorrect: true },
    ],
  },
  {
    questionText: 'In the context of PyTorch, what is an "Operation"?',
    answerOptions: [
      { answerText: 'A simple number.', isCorrect: false },
      { answerText: 'A mathematical function applied to one or more tensors.', isCorrect: true },
      { answerText: 'A type of neural network layer.', isCorrect: false },
      { answerText: 'A specific type of data.', isCorrect: false },
    ],
  },
  {
    questionText: 'Why is a GPU important for training neural networks?',
    answerOptions: [
      { answerText: 'It provides a graphical user interface.', isCorrect: false },
      { answerText: 'It is a faster way to store data.', isCorrect: false },
      { answerText: 'It has many cores, allowing it to perform parallel computations much faster than a CPU.', isCorrect: true },
      { answerText: 'It automatically generates the model architecture.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Parameter" in a neural network?',
    answerOptions: [
      { answerText: 'The input data.', isCorrect: false },
      { answerText: 'The weights and biases that the network learns during training.', isCorrect: true },
      { answerText: 'The number of layers in the network.', isCorrect: false },
      { answerText: 'The activation function.', isCorrect: false },
    ],
  },
  {
    questionText: 'How is a "model" defined?',
    answerOptions: [
      { answerText: 'A single neuron.', isCorrect: false },
      { answerText: 'A collection of loss functions.', isCorrect: false },
      { answerText: 'A collection of layers and neurons that can be trained to perform a task.', isCorrect: true },
      { answerText: 'The training data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the "learning rate" of an Optimizer?',
    answerOptions: [
      { answerText: 'The speed at which the model runs on a GPU.', isCorrect: false },
      { answerText: 'A hyperparameter that controls how much the model\'s parameters are adjusted in each step.', isCorrect: true },
      { answerText: 'The number of epochs.', isCorrect: false },
      { answerText: 'The number of batches.', isCorrect: false },
    ],
  },
  {
    questionText: 'In the context of `requires_grad=True`, what does "grad" stand for?',
    answerOptions: [
      { answerText: 'Gradient.', isCorrect: true },
      { answerText: 'Grade.', isCorrect: false },
      { answerText: 'Graph.', isCorrect: false },
      { answerText: 'General.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "backpropagation"?',
    answerOptions: [
      { answerText: 'The process of moving data forward through the network.', isCorrect: false },
      { answerText: 'An algorithm for calculating gradients during the backward pass.', isCorrect: true },
      { answerText: 'The process of initializing model weights.', isCorrect: false },
      { answerText: 'A type of activation function.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "overfitting"?',
    answerOptions: [
      { answerText: 'When a model performs well on new data but poorly on training data.', isCorrect: false },
      { answerText: 'When a model learns the training data too well, memorizing it instead of generalizing to new data.', isCorrect: true },
      { answerText: 'When a model cannot learn from the training data.', isCorrect: false },
      { answerText: 'When the model is too simple to learn the data.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which of these is a common type of activation function?',
    answerOptions: [
      { answerText: 'The Batch function.', isCorrect: false },
      { answerText: 'ReLU (Rectified Linear Unit).', isCorrect: true },
      { answerText: 'The Gradient function.', isCorrect: false },
      { answerText: 'The Optimizer function.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the purpose of a "hidden layer"?',
    answerOptions: [
      { answerText: 'To store the final output.', isCorrect: false },
      { answerText: 'To receive the input data.', isCorrect: false },
      { answerText: 'To perform computations and feature extraction that are not directly visible to the user.', isCorrect: true },
      { answerText: 'To provide the labels for the data.', isCorrect: false },
    ],
  },
  {
    questionText: 'In machine learning, what does "bias" refer to?',
    answerOptions: [
      { answerText: 'The model\'s tendency to favor certain data points.', isCorrect: false },
      { answerText: 'A constant added to the weighted sum of inputs in a neuron.', isCorrect: true },
      { answerText: 'A type of data that is unbalanced.', isCorrect: false },
      { answerText: 'The number of layers in a network.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the "weight" in a neural network?',
    answerOptions: [
      { answerText: 'A value that a neuron assigns to its output.', isCorrect: false },
      { answerText: 'A parameter that scales the input signal of a neuron.', isCorrect: true },
      { answerText: 'The number of neurons in a layer.', isCorrect: false },
      { answerText: 'The overall size of the model.', isCorrect: false },
    ],
  },
  {
    questionText: 'What does a Recurrent Neural Network (RNN) specialize in?',
    answerOptions: [
      { answerText: 'Image recognition.', isCorrect: false },
      { answerText: 'Data generation.', isCorrect: false },
      { answerText: 'Sequential data like time series and natural language.', isCorrect: true },
      { answerText: 'Classifying fixed-size data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What does `requires_grad=True` enable in PyTorch?',
    answerOptions: [
      { answerText: 'Forward pass.', isCorrect: false },
      { answerText: 'Backward pass for gradient calculation.', isCorrect: true },
      { answerText: 'Model visualization.', isCorrect: false },
      { answerText: 'Data loading.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which of these is a key component of a GAN?',
    answerOptions: [
      { answerText: 'An encoder and a decoder.', isCorrect: false },
      { answerText: 'A single, very large neural network.', isCorrect: false },
      { answerText: 'A Generator and a Discriminator network.', isCorrect: true },
      { answerText: 'A series of convolutional layers.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the purpose of the "Dropout" layer?',
    answerOptions: [
      { answerText: 'To speed up training.', isCorrect: false },
      { answerText: 'To regularize the model and prevent overfitting.', isCorrect: true },
      { answerText: 'To add more data to the training set.', isCorrect: false },
      { answerText: 'To increase the number of neurons.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the difference between supervised and unsupervised learning?',
    answerOptions: [
      { answerText: 'Supervised learning uses labeled data; unsupervised learning uses unlabeled data.', isCorrect: true },
      { answerText: 'Supervised learning requires a GPU; unsupervised learning does not.', isCorrect: false },
      { answerText: 'Supervised learning is for regression; unsupervised learning is for classification.', isCorrect: false },
      { answerText: 'They are the same thing.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which algorithm is a type of Optimizer?',
    answerOptions: [
      { answerText: 'ReLU.', isCorrect: false },
      { answerText: 'Adam.', isCorrect: true },
      { answerText: 'Sigmoid.', isCorrect: false },
      { answerText: 'Softmax.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "Hyperparameter Tuning"?',
    answerOptions: [
      { answerText: 'Adjusting the model\'s weights.', isCorrect: false },
      { answerText: 'The process of selecting the best combination of hyperparameters for a model.', isCorrect: true },
      { answerText: 'The process of converting data to a tensor.', isCorrect: false },
      { answerText: 'The process of collecting new data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the role of a "feature" in a dataset?',
    answerOptions: [
      { answerText: 'It is the final prediction.', isCorrect: false },
      { answerText: 'It is a measurable property of the data.', isCorrect: true },
      { answerText: 'It is the name of the dataset.', isCorrect: false },
      { answerText: 'It is a type of loss function.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "Gradient Descent"?',
    answerOptions: [
      { answerText: 'An algorithm for image classification.', isCorrect: false },
      { answerText: 'An optimization algorithm used to minimize the loss function by iteratively moving in the direction of the steepest descent.', isCorrect: true },
      { answerText: 'A method for data visualization.', isCorrect: false },
      { answerText: 'A process for generating new data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "data normalization"?',
    answerOptions: [
      { answerText: 'Making data less consistent.', isCorrect: false },
      { answerText: 'Scaling input data to a standard range to improve model performance.', isCorrect: true },
      { answerText: 'Adding more data to the dataset.', isCorrect: false },
      { answerText: 'Converting text data to images.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "training set"?',
    answerOptions: [
      { answerText: 'The data used to evaluate the final model.', isCorrect: false },
      { answerText: 'The data used to train the model.', isCorrect: true },
      { answerText: 'The data used to select hyperparameters.', isCorrect: false },
      { answerText: 'A small portion of data used for testing.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "validation set"?',
    answerOptions: [
      { answerText: 'The data used for model training.', isCorrect: false },
      { answerText: 'The data used to tune hyperparameters and prevent overfitting during training.', isCorrect: true },
      { answerText: 'The final, unseen data for evaluation.', isCorrect: false },
      { answerText: 'Data with missing values.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "test set"?',
    answerOptions: [
      { answerText: 'The data used for training.', isCorrect: false },
      { answerText: 'The data used to evaluate the final, trained model\'s performance.', isCorrect: true },
      { answerText: 'Data used for validation.', isCorrect: false },
      { answerText: 'Data with incorrect labels.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the "vanishing gradient problem"?',
    answerOptions: [
      { answerText: 'When gradients become too large, leading to unstable training.', isCorrect: false },
      { answerText: 'When gradients shrink to near-zero, making it difficult for a network to learn deep layers.', isCorrect: true },
      { answerText: 'When the loss function never decreases.', isCorrect: false },
      { answerText: 'When the model\'s performance stagnates.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "learning curve"?',
    answerOptions: [
      { answerText: 'A plot of the model\'s loss over time, used to diagnose performance.', isCorrect: true },
      { answerText: 'A type of activation function.', isCorrect: false },
      { answerText: 'The shape of a neural network.', isCorrect: false },
      { answerText: 'A type of dataset.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Hyperparameter"?',
    answerOptions: [
      { answerText: 'A parameter that is learned by the model during training.', isCorrect: false },
      { answerText: 'A parameter whose value is set before the training process begins.', isCorrect: true },
      { answerText: 'The output of a model.', isCorrect: false },
      { answerText: 'A type of loss function.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "Computer Vision"?',
    answerOptions: [
      { answerText: 'A subfield of AI that teaches computers to understand and interpret visual data from the world.', isCorrect: true },
      { answerText: 'A field focused on robotic movements.', isCorrect: false },
      { answerText: 'A type of natural language processing.', isCorrect: false },
      { answerText: 'A type of data generation.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Generative" model?',
    answerOptions: [
      { answerText: 'A model that only performs classification.', isCorrect: false },
      { answerText: 'A model that predicts future outcomes.', isCorrect: false },
      { answerText: 'A model that can generate new data instances.', isCorrect: true },
      { answerText: 'A model that only works with images.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "Reinforcement Learning"?',
    answerOptions: [
      { answerText: 'A type of supervised learning with rewards.', isCorrect: false },
      { answerText: 'A type of unsupervised learning for clustering.', isCorrect: false },
      { answerText: 'A machine learning method where an agent learns to make decisions by performing actions in an environment to maximize a reward.', isCorrect: true },
      { answerText: 'Learning from unlabeled data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the purpose of "pooling" in a CNN?',
    answerOptions: [
      { answerText: 'To increase the size of the feature maps.', isCorrect: false },
      { answerText: 'To reduce the spatial dimensions of the data and simplify the model.', isCorrect: true },
      { answerText: 'To add noise to the data.', isCorrect: false },
      { answerText: 'To increase the number of layers.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "Natural Language Processing" (NLP)?',
    answerOptions: [
      { answerText: 'A field focused on robot movement.', isCorrect: false },
      { answerText: 'A field of AI that deals with the interaction between computers and human language.', isCorrect: true },
      { answerText: 'A method for generating images.', isCorrect: false },
      { answerText: 'A technique for numerical analysis.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Recurrent" Neural Network?',
    answerOptions: [
      { answerText: 'A network that uses a single layer.', isCorrect: false },
      { answerText: 'A network with feedback loops to process sequences.', isCorrect: true },
      { answerText: 'A network for classifying images.', isCorrect: false },
      { answerText: 'A network that generates new data points.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Sequence Model"?',
    answerOptions: [
      { answerText: 'A model for classifying images.', isCorrect: false },
      { answerText: 'A model that takes sequences as input or produces sequences as output.', isCorrect: true },
      { answerText: 'A model that only works with numerical data.', isCorrect: false },
      { answerText: 'A model with no hidden layers.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "supervised" machine learning task?',
    answerOptions: [
      { answerText: 'A task with unlabeled data.', isCorrect: false },
      { answerText: 'A task where the model learns from a labeled dataset.', isCorrect: true },
      { answerText: 'A task where a human oversees the learning process.', isCorrect: false },
      { answerText: 'A task where the model learns from interacting with an environment.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is an "unsupervised" machine learning task?',
    answerOptions: [
      { answerText: 'A task with labeled data.', isCorrect: false },
      { answerText: 'A task where the model learns from an unlabeled dataset.', isCorrect: true },
      { answerText: 'A task where a human is not involved.', isCorrect: false },
      { answerText: 'A task where the model learns from an external reward.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the main advantage of using a GPU for training?',
    answerOptions: [
      { answerText: 'Faster internet connection.', isCorrect: false },
      { answerText: 'Ability to perform parallel computations.', isCorrect: true },
      { answerText: 'Lower power consumption.', isCorrect: false },
      { answerText: 'Larger storage capacity.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which term is a type of linear function?',
    answerOptions: [
      { answerText: 'A sigmoid function.', isCorrect: false },
      { answerText: 'A sine function.', isCorrect: false },
      { answerText: 'A linear regression model.', isCorrect: true },
      { answerText: 'A convolution.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "feature map" in a CNN?',
    answerOptions: [
      { answerText: 'A map of a geographical location.', isCorrect: false },
      { answerText: 'The output of a convolutional layer, representing learned features.', isCorrect: true },
      { answerText: 'A diagram of the network architecture.', isCorrect: false },
      { answerText: 'A type of dataset.', isCorrect: false },
    ],
  },
  {
    questionText: 'Which of these is a type of Transformer model?',
    answerOptions: [
      { answerText: 'RNN.', isCorrect: false },
      { answerText: 'BERT.', isCorrect: true },
      { answerText: 'LeNet.', isCorrect: false },
      { answerText: 'GAN.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the "Activation" in a neuron?',
    answerOptions: [
      { answerText: 'The input value to the neuron.', isCorrect: false },
      { answerText: 'The output of the neuron after applying the activation function.', isCorrect: true },
      { answerText: 'The weight of the neuron.', isCorrect: false },
      { answerText: 'The bias of the neuron.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "Model" in machine learning?',
    answerOptions: [
      { answerText: 'The dataset used for training.', isCorrect: false },
      { answerText: 'A mathematical representation of a real-world process, trained to make predictions.', isCorrect: true },
      { answerText: 'The final output of a neural network.', isCorrect: false },
      { answerText: 'A single neuron.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is "feature extraction"?',
    answerOptions: [
      { answerText: 'The process of removing features from the data.', isCorrect: false },
      { answerText: 'The process of collecting new data.', isCorrect: false },
      { answerText: 'The process of transforming raw data into meaningful features.', isCorrect: true },
      { answerText: 'The process of visualizing data.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the "learning" process in machine learning?',
    answerOptions: [
      { answerText: 'The process of a model making a single prediction.', isCorrect: false },
      { answerText: 'The process of a model adjusting its parameters to improve its performance.', isCorrect: true },
      { answerText: 'The process of a human giving instructions to a computer.', isCorrect: false },
      { answerText: 'The process of collecting data from the internet.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "dataset"?',
    answerOptions: [
      { answerText: 'A single data point.', isCorrect: false },
      { answerText: 'A collection of related data points.', isCorrect: true },
      { answerText: 'The code used to train a model.', isCorrect: false },
      { answerText: 'The final output of a model.', isCorrect: false },
    ],
  },
  {
    questionText: 'What does "training" a model mean?',
    answerOptions: [
      { answerText: 'Running the model on test data.', isCorrect: false },
      { answerText: 'The process of feeding the model data and adjusting its weights to learn a task.', isCorrect: true },
      { answerText: 'Writing the code for a neural network.', isCorrect: false },
      { answerText: 'Converting data into a tensor.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the purpose of "bias" in a neuron?',
    answerOptions: [
      { answerText: 'To make the output of the neuron less predictable.', isCorrect: false },
      { answerText: 'To add a constant value to the weighted sum, allowing the activation function to be shifted.', isCorrect: true },
      { answerText: 'To increase the number of layers in a network.', isCorrect: false },
      { answerText: 'To determine which data points are more important.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "loss" value?',
    answerOptions: [
      { answerText: 'A value that indicates how fast the model is running.', isCorrect: false },
      { answerText: 'A numerical measure of the model\'s error on a given input.', isCorrect: true },
      { answerText: 'The total number of errors made during training.', isCorrect: false },
      { answerText: 'The number of layers in the network.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "receptive field" in a CNN?',
    answerOptions: [
      { answerText: 'The entire image that a CNN processes.', isCorrect: false },
      { answerText: 'The area of the input image that a neuron in a subsequent layer can see.', isCorrect: true },
      { answerText: 'The output of the final layer.', isCorrect: false },
      { answerText: 'The number of neurons in a layer.', isCorrect: false },
    ],
  },
  {
    questionText: 'What is a "batch size"?',
    answerOptions: [
      { answerText: 'The total number of data points in the dataset.', isCorrect: false },
      { answerText: 'The number of data points in a single batch.', isCorrect: true },
      { answerText: 'The number of epochs.', isCorrect: false },
      { answerText: 'The learning rate.', isCorrect: false },
    ],
  },
];
