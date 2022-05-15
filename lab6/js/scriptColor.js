const tdNodes = $('.card table td');
const colorPicker = $('#color-picker');

const getRandomColorBit = () => Math.floor(Math.random() * 255);
const getRandomColor = () => [getRandomColorBit(), getRandomColorBit(), getRandomColorBit()]

const myVariantNoe = tdNodes[6];

myVariantNoe
  .addEventListener("mouseover", (e) => {
    const color = getRandomColor();
    e.target.style.backgroundColor = `rgb(${color.join(',')})`;
  });

myVariantNoe
  .addEventListener("click", (e) => {
    e.target.style.backgroundColor = colorPicker.value;
  });


const getColumns = () => {
  let prevKey = -2;

  return [...tdNodes].filter((node, key) => {
    if (prevKey + 2 === key) {
      prevKey = key
      return true
    }
  })
}

myVariantNoe
  .addEventListener("dblclick", () => {
    getColumns().map(node => node.style.backgroundColor = colorPicker.value)
  });