const tableContainer = document.querySelector('#table-container table');

const defaultCellWidth = 200; // Default cell width
const defaultCellHeight = 200; // Default cell height
const minCellSize = 30; // Minimum cell size

function setDefaultCellSize() {
  document.documentElement.style.setProperty('--box-width', `${defaultCellWidth}px`);
  document.documentElement.style.setProperty('--box-height', `${defaultCellHeight}px`);
}

function adjustCellSize() {
  const { rows } = tableContainer;
  const viewportWidth = window.innerWidth;
  // Calculate the available height for the table, subtracting any fixed elements if necessary
  const fixedElementsHeight = document.getElementById('buttons').offsetHeight;
  const containerHeight = document.getElementById('table-container').clientHeight - fixedElementsHeight;

  let idealCellWidth = defaultCellWidth;
  let idealCellHeight;

  if (rows.length > 0) {
    const numCells = rows[0].cells.length;
    const numRow = rows.length;

    // Calculate ideal cell width based on viewport width and number of cells
    const maxCellWidth = Math.floor(viewportWidth / numCells);
    idealCellWidth = Math.max(minCellSize, Math.min(maxCellWidth, defaultCellWidth));

    // Dynamically adjust cell height to fit the container
    idealCellHeight = Math.max(minCellSize, Math.floor(containerHeight / numRow));
  } else {
    // If no rows exist, set the cell height to default or minimum
    idealCellHeight = defaultCellHeight;
  }

  document.documentElement.style.setProperty('--box-width', `${idealCellWidth}px`);
  document.documentElement.style.setProperty('--box-height', `${idealCellHeight}px`);
}

const getNumberOfColumns = () => tableContainer.rows[0].cells.length;

document.getElementById('add-col').addEventListener('click', () => {
  const { rows } = tableContainer;

  for (let i = 0; i < rows.length; i += 1) {
    rows[i].insertCell(-1).innerHTML = '1';
  }

  adjustCellSize();
});

document.getElementById('delete-col').addEventListener('click', () => {
  const { rows } = tableContainer;

  if (rows.length > 0 && rows[0].cells.length > 1) {
    for (let i = 0; i < rows.length; i += 1) {
      rows[i].deleteCell(-1);
    }
  }

  adjustCellSize();
});

document.getElementById('add-row').addEventListener('click', () => {
  const newRow = tableContainer.insertRow(-1);
  const numberOfColumns = getNumberOfColumns();

  for (let i = 0; i < numberOfColumns; i += 1) {
    newRow.insertCell(i).innerHTML = '2';
  }

  adjustCellSize();
});

document.getElementById('delete-row').addEventListener('click', () => {
  if (tableContainer.rows.length > 1) {
    tableContainer.deleteRow(-1);
  }
  adjustCellSize();
});

setDefaultCellSize();
window.addEventListener('resize', () => {
  setDefaultCellSize();
  adjustCellSize();
});
