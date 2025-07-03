const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = 600;
const height = 400;
const barCount = 50; // число столбцов
let data = [];

// Генерация случайных данных
function generateData() {
  data = [];
  for(let i=0; i<barCount; i++) {
    data.push(Math.random()); // значения от 0 до 1
  }
}

// Отрисовка массива
function drawBars(highlightIndices=[]) {
  ctx.clearRect(0,0,width,height);
  
  const barWidth= width / barCount;
  
  for(let i=0; i<barCount; i++) {
    const barHeight= data[i] * (height -20);
    ctx.fillStyle= highlightIndices.includes(i) ? 'red' : 'blue';
    ctx.fillRect(i*barWidth, height - barHeight, barWidth -1, barHeight);
  }
}

// Асинхронная шейкерная сортировка с анимацией
async function shakerSort() {
  let left =0;
  let right = data.length -1;
  
  while (left < right) {
    let swapped = false;

    // проход слева направо
    for(let i=left; i<right; i++) {
      drawBars([i,i+1]);
      await sleep(50);
      if(data[i]>data[i+1]) {
        [data[i], data[i+1]] = [data[i+1], data[i]];
        swapped=true;
        drawBars([i,i+1]);
        await sleep(50);
      }
    }
    
    right--; // уменьшаем правую границу
    
    if(!swapped) break; // если не было обменов — массив отсортирован
    
    swapped=false;

    // проход справа налево
    for(let i=right; i>left; i--) {
      drawBars([i-1,i]);
      await sleep(50);
      if(data[i-1]>data[i]) {
        [data[i-1], data[i]] = [data[i], data[i-1]];
        swapped=true;
        drawBars([i-1,i]);
        await sleep(50);
      }
    }

    left++; // увеличиваем левую границу
    
    if(!swapped) break; // если не было обменов — массив отсортирован
  }

  drawBars(); // финальная отрисовка без выделения
}

// Вспомогательная функция задержки
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Инициализация и запуск
generateData();
drawBars();

document.getElementById('startBtn').addEventListener('click', () => {
  shakerSort();
});