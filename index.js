import { bubbleSort } from './bubbleSort.js';
import { shakerSort } from './shakerSort.js';
import { insertionSort } from './insertionSort.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let data = [];
const barCount = 50;

// Генерация случайных данных
function generateData() {
  data = [];
  for (let i=0; i<barCount; i++) {
    data.push(Math.random());
  }
}

// Отрисовка массива с выделением индексов
function drawBars(highlightIndices=[]) {
  ctx.clearRect(0,0,width,height);
  
  const barWidth= width / barCount;

  for(let i=0; i<barCount; i++) {
    const barHeight= data[i]*(height -20);
    ctx.fillStyle= highlightIndices.includes(i) ? 'red' : 'blue';
    ctx.fillRect(i*barWidth, height - barHeight, barWidth -1 , barHeight);
  }
}

// Задержка для анимации
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Обработка выбора алгоритма и запуск сортировки
async function startSorting(algo) {
  
  switch(algo) {
    case 'bubble':
      await bubbleSort(data, drawBars, sleep);
      break;
    case 'shaker':
      await shakerSort(data, drawBars, sleep);
      break;
    case 'insertion':
      await insertionSort(data, drawBars, sleep);
      break;
    default:
      break;
  }

}

// Обработчик кнопок выбора алгоритма
document.querySelectorAll("#menuButtons button").forEach(btn => {
  
  btn.addEventListener("click", () => {
    
    generateData();
    
    // Визуализируем начальные данные
    drawBars();

    const algo= btn.getAttribute("data-algo");
    
    startSorting(algo);

    // скрываем меню после выбора (опционально)
    document.getElementById("menuContainer").style.display='none';
    document.getElementById("canvas").style.display='block';
    
   });
});



// Изначально генерируем данные и рисуем их
generateData();
drawBars();