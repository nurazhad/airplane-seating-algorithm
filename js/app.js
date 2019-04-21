let button = document.getElementById("button");
let row, column, block, newSeat, i, j, z;
let table, tr, td;

function transformInputStringToArray(string) {
  string = string.replace(/\s/g, ''); //remove extra spaces
  string = string.substring(2, string.length-2); //remove first and last 2 symbol
  //transform string to array
  let array = string.split("],[").map(function (x) {
    return x.split(",");
  });
  //replace strings to numbers
  for(i = 0; i < array.length; i++){
    for(j = 0; j < array[i].length; j++){
      array[i][j] = parseInt(array[i][j]);
    }
  };
  return array;
}

function clearFromDOM(element){
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

function addBackgroundImg() {
  seats.style.background = 'url(\'img/img.png\') no-repeat center top';
  seats.style.backgroundSize = 'contain';
}

function Seat (block, row, column, classSeat, passenger)
{
  this.block = block;
  this.row = row;
  this.column = column;
  this.classSeat = classSeat;
  this.passenger = passenger;
}

function mySort(key) {
  return function(a, b) {
    const varA = a[key];
    const varB = b[key];
    return ((varA < varB) ? -1 : ((varA > varB) ? 1 : 0));
  }
}

function createTableResults (arrInput, arrResult) {
  for(i=0; i<arrInput.length; i++){
    table = document.createElement('table');
    table.setAttribute('class', 'table'+(i+1));

    for(j=0; j<arrInput[i][1]; j++) {
      tr = document.createElement('tr');
      tr.setAttribute('class', 'tr'+(j+1));
      for(z=0; z<arrResult.length; z++) {
        if(arrResult[z].block===i+1 && arrResult[z].column===j+1) {
          td = document.createElement('td');
          td.setAttribute('class', 'class'+arrResult[z].classSeat);
          if(isNaN(arrResult[z].passenger)===false) {
            td.innerText=arrResult[z].passenger;
          }
          else{
            td.innerText="";
          }
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    seats.appendChild(table);
  }
}

button.addEventListener("click", function() {
      let queue = document.getElementById('queue').value;
      let stringRowsColumns = document.getElementById("rowsColumns").value;
      let seats=document.getElementById("seats");
      let result = [];


// removing old result
      clearFromDOM(seats);

// image airplane in div with results
      addBackgroundImg();

// transform input string to array
      let inputArrayRowsColumns = transformInputStringToArray(stringRowsColumns);

// check input
      if (inputArrayRowsColumns.length>8) {
        alert('Too many sections with the rows and columns!');
        document.getElementById("rowsColumns").focus();
        return false;
      }
      for(i = 0; i < inputArrayRowsColumns.length; i++){
        for(j = 0; j < inputArrayRowsColumns[i].length; j++){
          if(inputArrayRowsColumns[i][j]<1 || Number.isNaN(inputArrayRowsColumns[i][j])) {
            alert('The rows and columns must be more than 0!');
            document.getElementById("rowsColumns").focus();
            return false;
          }
        }
      }
      if (queue<1 || !queue.match('^[0-9]+$')) {
        alert('Incorrect input!');
        document.getElementById("queue").focus();
        return false;
      }

// sorting seats
      for(block = 1; block <= inputArrayRowsColumns.length; block++){
        for(column = 1; column <= inputArrayRowsColumns[block-1][0]; column++){
          for(row = 1; row <= inputArrayRowsColumns[block-1][1]; row++){
            if(block === 1 && column === 1 && inputArrayRowsColumns[block-1][0]>1) {
              newSeat = new Seat(block, column, row, 2);
              result.push(newSeat);
            }
            else if(block === inputArrayRowsColumns.length
              && column === inputArrayRowsColumns[block-1][0]
              && inputArrayRowsColumns[block-1][0]>1){
              newSeat = new Seat(block, column, row, 2);
              result.push(newSeat);
            }
            else if(column === 1 || column === (inputArrayRowsColumns[block-1][0])) {
              newSeat = new Seat(block, column, row, 1);
              result.push(newSeat);
            }
            else {
              newSeat = new Seat(block, column, row, 3);
              result.push(newSeat);
            }
          }
        }
      }

      result.sort(mySort('column'));
      result.sort(mySort('classSeat'));

//passenger seating
      if(result.length<queue) {
        alert("Only the first "+result.length+" passengers will be able to fly away.");
        for(i=0; i<result.length; i++){
          result[i].passenger = i+1;
        }
      }
      else {
        for(i=0; i<queue; i++){
          result[i].passenger = i+1;
        }
      }

//output of the result
      result.sort(mySort('row'));
      result.sort(mySort('column'));
      result.sort(mySort('block'));

      createTableResults(inputArrayRowsColumns, result)

});
