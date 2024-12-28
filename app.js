const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = '#000000';
let brushSize = 5;

// Начать рисование
canvas.addEventListener('mousedown', () => (painting = true));
canvas.addEventListener('mouseup', () => (painting = false));
canvas.addEventListener('mousemove', draw);

// Рисование на холсте
function draw(e) {
  if (!painting) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Выбор цвета
document.getElementById('color-picker').addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Изменение размера кисти
document.getElementById('brush-size').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

// Очистка холста
document.getElementById('clear-canvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Сохранение изображения
document.getElementById('save-drawing').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Добавление текста
document.getElementById('add-text').addEventListener('click', () => {
  const text = prompt('Введите текст:');
  if (text) {
    const x = parseInt(prompt('Введите X-координату:'), 10) || 0;
    const y = parseInt(prompt('Введите Y-координату:'), 10) || 0;
    ctx.font = '20px Arial';
    ctx.fillStyle = currentColor;
    ctx.fillText(text, x, y);
  }
});