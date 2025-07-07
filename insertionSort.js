export async function insertionSort(data, drawBars, sleep) {
  let n= data.length;

  for(let i=1; i<n; i++) {
    let key= data[i];
    let j= i-1;

    while(j>=0 && data[j]>key) { 
      drawBars([j,j+1]);
      await sleep(50);

      data[j+1]=data[j];
      j--;

      drawBars([j+1]);
      await sleep(50);
      
    }

    data[j+1]=key;

    // Обновляем визуализацию после вставки
    drawBars();
    await sleep(50);
   } 
}