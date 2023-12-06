const tf = require('@tensorflow/tfjs-node');
const { loadIris, RandomForestClassifier, accuracyScore } = require('js-ml-tools'); // Você precisará de uma biblioteca JavaScript de aprendizado de máquina adequada

(async () => {
  // Carregar o conjunto de dados Iris
  const { data, target } = loadIris();
  
  // Dividir os dados em conjunto de treinamento e teste
  const [XTrain, XTest, yTrain, yTest] = trainTestSplit(data, target, 0.2, 42);
  
  // Inicializar o modelo de classificação (usando RandomForestClassifier como exemplo)
  const model = new RandomForestClassifier({ randomState: 42 });
  
  // Treinar o modelo no conjunto de treinamento
  await model.fit(XTrain, yTrain);
  
  // Fazer previsões no conjunto de teste
  const yPred = model.predict(XTest);
  
  // Avaliar a precisão do modelo
  const accuracy = accuracyScore(yTest, yPred);
  console.log(`Acurácia do modelo: ${accuracy.toFixed(2)}`);
  
  // Você pode usar este modelo treinado para fazer previsões em novos dados
  // Exemplo: model.predict(novosDados);
})();
