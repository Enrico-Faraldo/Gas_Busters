  // definindo a entrada analógica do sensor
const int PINO_SENSOR_MQ2 = A0;

  // definindo valores máximos e mínimos para serem captados 
const int VALOR_MINIMO = 100;
const int VALOR_MAXIMO = 1000;

// Entrada de 9600 Bits
void setup() {
  Serial.begin(9600);
}

 // Comando sendo executado em looping de acordo com o delay
void loop() {

  // variavel de numero inteiro
  int valorSensor = analogRead(PINO_SENSOR_MQ2);

  // Realiza o cálculo onde o  resultado fica armazenado na variável porcentagem
  float porcentagem = ((float)(valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100;

  // definindo uma condição de porcentagem
  if (porcentagem < 0) {
    porcentagem = 0;
  } else if (porcentagem > 100) {   
    porcentagem = 100;
  }

  // declarar labels no plotter serial
  Serial.print("Maxima:");
  Serial.print(100);
  Serial.print(" ");
  Serial.print("Gás:");
  Serial.print(porcentagem);
  Serial.print(" ");
  Serial.print("Vazamento:");
  Serial.print(60);
  Serial.print(" ");
  Serial.print("Alerta:");
  Serial.print(30);
  Serial.print(" ");
  Serial.print("Minima:");
  Serial.println(0);

  // delay para o código informar a cada 1s
  delay(2000);
}