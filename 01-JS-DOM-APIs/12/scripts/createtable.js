const SAMPLE = [["","Monday", "Tuesday", "Wednesday", "Thurday","Friday", "Saturday", "Sunday"],
                ["8 - 12", "Study", "English", "Work", "English", "Guitar", "Study", "Going out"],
                ["16 - 18", "Work", "Study", "Work", "Study", "Work", "Study", "Games"],
                ["19 - 21", "Sports","Guitar", "Laundry", "Shopping","Sports", "Swimming", "Cleaning"]];


function createTable(matrixData) {
    let myTable = document.createElement("table");
    let i,j;

    for (i = 0; i < matrixData.length; i++) {
        let tableRow = document.createElement("tr");
        
        myTable.appendChild(tableRow);
        
        for (j = 0; j < matrixData[i].length ; j++) {
            let tableData = document.createElement("td");
            
            tableData.textContent = matrixData[i][j];
            tableRow.appendChild(tableData); 
        }
    }
    return myTable;
}

document.body.appendChild(createTable(SAMPLE, 4));

