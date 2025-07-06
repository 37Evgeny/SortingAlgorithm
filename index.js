const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width; //600
const height = canvas.height; //400

let data = [];
const barCount = 50; // число столбиков

// Генерация случайных данных
function generateData() {
  data = [];
  for (let i = 0; i < barCount; i++) {
    data.push(Math.random());
  }
}

// Отрисовка массива
function drawBars(highlightIndices = []) {
  ctx.clearRect(0, 0, width, height);

  const barWidth = width / barCount;

  for (let i = 0; i < barCount; i++) {
    const barHeight = data[i] * (height - 20);
    ctx.fillStyle = highlightIndices.includes(i) ? "red" : "blue";

    // Центрируем столбики по горизонтали
    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
  }
}

// Вспомогательная функция задержки
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Алгоритмы сортировки

// Пузырьковая
async function bubbleSort() {
  let n = data.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      drawBars([j, j + 1]);
      await sleep(50);
      if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        drawBars([j, j + 1]);
        await sleep(50);
      }
    }
  }
}

// Шейкерная
async function shakerSort() {
  let left = 0,
    right = data.length - 1;

  while (left < right) {
    let swapped = false;

    for (let i = left; i < right; i++) {
      drawBars([i, i + 1]);
      await sleep(50);
      if (data[i] > data[i + 1]) {
        [data[i], data[i + 1]] = [data[i + 1], data[i]];
        swapped = true;
        drawBars([i, i + 1]);
        await sleep(50);
      }
    }

    right--;

    if (!swapped) break;

    swapped = false;

    for (let i = right; i > left; i--) {
      drawBars([i - 1, i]);
      await sleep(50);
      if (data[i - 1] > data[i]) {
        [data[i - 1], data[i]] = [data[i], data[i - 1]];
        swapped = true;
        drawBars([i - 1, i]);
        await sleep(50);
      }
    }

    left++;

    if (!swapped) break;
  }
}

// Сортировка вставками
async function insertionSort() {
  let n = data.length;

  for (let i = 1; i < n; i++) {
    let key = data[i];
    let j = i - 1;

    while (j >= 0 && data[j] > key) {
      drawBars([j, j + 1]);
      await sleep(50);

      data[j + 1] = data[j];
      j--;

      drawBars([j + 1]);
      await sleep(50);
    }

    data[j + 1] = key;

    // Обновляем визуализацию после вставки
    drawBars();
    await sleep(50);
  }
}

async function startSorting(algo) {
  // Отключаем кнопки
  document
    .querySelectorAll("#menuButtons button")
    .forEach((btn) => (btn.disabled = true));

  const canvasElement = document.getElementById("canvas");
  canvasElement.style.display = "block";

  ctx.clearRect(0, 0, width, height);
  generateData();
  drawBars();

  switch (algo) {
    case "bubble":
      await bubbleSort();
      break;
    case "shaker":
      await shakerSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    default:
      break;
  }

  // Включаем кнопки обратно
  document
    .querySelectorAll("#menuButtons button")
    .forEach((btn) => (btn.disabled = false));
}
// Обработчики кнопок
document.querySelectorAll("#menuButtons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const algo = btn.getAttribute("data-algo");

    // Запускаем сортировку и показываем визуализацию
    startSorting(algo);

    // После выбора меню скрывается (если нужно)
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("btn").style.border = "none";
    document.getElementById("btn").style.outline = "none";
  });
});

// Изначально визуализация скрыта — ничего не рисуем и не показываем канвас
// Можно оставить так или подготовить стартовую настройку
