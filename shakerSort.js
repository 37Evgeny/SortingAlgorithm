export async function shakerSort(data, drawBars, sleep) {
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
        swapped=true;
        drawBars([i -1 ,i]);
        await sleep(50);
      }
    }

    left++;

    if (!swapped) break;
  }
}