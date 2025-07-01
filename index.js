const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = 600;
const height = 400;
const barCount = 50; // количество столбцов
let data = [];

// Генерируем случайные данные
function generateData() {
  data = [];
  for(let i=0; i<barCount; i++) {
    data.push(Math.random()); // значения от 0 до 1
  }
}

// Отрисовка массива в виде столбцов
function drawBars(highlightIndices=[]) {
  ctx.clearRect(0,0,width,height);
  
  const barWidth= width / barCount;
  
  for(let i=0; i<barCount; i++) {
    const barHeight= data[i] * (height -20);
    ctx.fillStyle= highlightIndices.includes(i) ? 'red' : 'blue';
    ctx.fillRect(i*barWidth, height - barHeight, barWidth -1, barHeight);
  }
}

// Асинхронная пузырьковая сортировка с анимацией
async function bubbleSort() {
  let n= data.length;
  
  for(let i=0; i<n-1; i++) {
    for(let j=0; j<n-i-1; j++) {
      // Выделяем сравниваемые элементы
      drawBars([j,j+1]);
      await sleep(10); // задержка для анимации
      
      if(data[j]>data[j+1]) {
        // Меняем местами
        [data[j], data[j+1]] = [data[j+1], data[j]];
        drawBars([j,j+1]);
        await sleep(10);
      }
    }
  }
  
  // Финальная отрисовка без выделения
  drawBars();
}

// Вспомогательная функция задержки
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Инициализация и запуск
generateData();
drawBars();

document.getElementById('startBtn').addEventListener('click', () => {
  bubbleSort();
  });