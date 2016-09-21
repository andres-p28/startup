const SAMPLE = [["","Monday", "Tuesday", "Wednesday", "Thurday","Friday", "Saturday", "Sunday"],
			    ["8 - 12", "Study", "English", "Work", "English", "Guitar", "Study", "Going out"],
			    ["16 - 18", "Work", "Study", "Work", "Study", "Work", "Study", "Games"],
			    ["19 - 21", "Sports","Guitar", "Laundry", "Shopping","Sports", "Swimming", "Cleaning"]];


function createTable(matrixData, nrow) {
	var myTable = document.createElement("table");
	for(var i = 0; i < nrow; i++) {
		var	tableRow = document.createElement("tr");
		myTable.appendChild(tableRow);
		for(var j = 0; j < matrixData[i].length ; j++) {
			var tableData = document.createElement("td");
			tableData.innerHTML = matrixData[i][j];

			tableRow.appendChild(tableData); 
		}
	}
	return myTable;
}

document.body.appendChild(createTable(SAMPLE, 4));

