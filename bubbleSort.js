// Экспортируем функцию пузырьковой сортировки
export async function bubbleSort(data, drawBars, sleep) {
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