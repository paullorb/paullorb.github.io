const tableContainer = document.querySelector('#table-container table');

const defaultCellWidth = 200; // Default cell width
const defaultCellHeight = 200; // Default cell height
const minCellSize = 30; // Minimum cell size

function setDefaultCellSize() {
    document.documentElement.style.setProperty('--box-width', `${defaultCellWidth}px`);
    document.documentElement.style.setProperty('--box-height', `${defaultCellHeight}px`);
}

function adjustCellSize() {
    const rows = tableContainer.rows;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let idealCellWidth = defaultCellWidth;
    let idealCellHeight = defaultCellHeight;

    if (rows.length > 0) {
        const numCells = rows[0].cells.length;
        const numRow = rows.length;

        // Calculate ideal cell width based on viewport width and number of cells
        idealCellWidth = Math.max(minCellSize, Math.min(Math.floor(viewportWidth / numCells), defaultCellWidth));
        
        // Calculate total table height
        const totalTableHeight = numRow * idealCellHeight;
        
        // Adjust cell height only if the total table height exceeds the viewport height
        if (totalTableHeight > viewportHeight) {
            idealCellHeight = Math.max(minCellSize, Math.floor(viewportHeight / numRow));
        }
    }

    document.documentElement.style.setProperty('--box-width', `${idealCellWidth}px`);
    document.documentElement.style.setProperty('--box-height', `${idealCellHeight}px`);
}

const getNumberOfColumns = () => tableContainer.rows[0].cells.length;

document.getElementById('add-col').addEventListener('click', () => {
    const rows = tableContainer.rows;

    for (let i = 0; i < rows.length; i++) {
        rows[i].insertCell(-1).innerHTML = '1';
    }

    adjustCellSize();
});

document.getElementById('delete-col').addEventListener('click', () => {
    const rows = tableContainer.rows;

    if (rows.length > 0 && rows[0].cells.length > 1) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].deleteCell(-1);
        }
    }

    adjustCellSize();
});

document.getElementById('add-row').addEventListener('click', () => {
    const newRow = tableContainer.insertRow(-1);
    const numberOfColumns = getNumberOfColumns();

    for (let i = 0; i < numberOfColumns; i++) {
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