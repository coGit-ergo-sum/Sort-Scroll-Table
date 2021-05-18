	// ------------------------------------------- //
	// ipersemplified namespacing
	if (!Vi) var Vi = {};
	Vi.Table = Vi.Table || {};
	// ------------------------------------------- //

	/**
	*
	* Sorts a table column.
	*
	* @remarks This functions performs the standard actions needed to sort a column,
	* regardless the type. 
	* It is designed to be called by one of the previous function each of them 
	* specialize the search by 'string'; 'number'; 'date' or custom.
	*
	*
	* @params th- the column header to sort	
	* @params getValue- a callback (tr: tableRow, index:number) => value: any (returns the value at row: tr; position: index. 
	* This calback it is necessary to provide the correct value to the sorting function. (value can be different from what 
	* the cell shows. It is the value used to order rows.)
	*/
	Vi.Table.sort = function (th, getValue) {
		try {

			//debugger;
			var cellIndex = th.cellIndex;		
			var className = th.classList.contains('sortAZ') ? 'sortZA' : 'sortAZ';
			var direction = (className == 'sortAZ') ? 1 : -1;
			
			var table = th.closest('table');		
			var tbody = table.tBodies[0];
			
			// - - - - - - - - - - - - - - - - - - - - - - - - - //
			// Icon managment
			for(let th of table.rows[0].cells){
				th.classList.remove('sortAZ', 'sortZA');
			}	
			th.classList.add(className);
			// - - - - - - - - - - - - - - - - - - - - - - - - - //

			var rows = Array.prototype.slice.call(table.rows, 1);

			rows.sort(function (rowA, rowB) {
				// only the developer (the user of this functions) knows
				// how data is stored in each cell. It is its duty the 
				// implementation of the function 'getValue' that provides
				// the value upon which the sorting is based.				
				var valueA = getValue(rowA, cellIndex);
				var valueB = getValue(rowB, cellIndex);

				return (valueA <= valueB) ? -direction : direction;
			});

			for (let row in rows) { tbody.appendChild(rows[row]) };

		}
		catch (jse) {
			if (console) if (console.error) console.error(jse)
		}
	}
		
	
	/** 
	* Sorts rows based on a lessical criteria. 
	*
	* @params th- the column header to sort	
	*
	*/
	Vi.Table.sort.number= function (th) {
		try {
			Vi.Table.sort(th, function (tr, cellIndex) {
				return parseInt('0' + tr.children[cellIndex].innerText);
			})
		}
		catch (jse) {
			alert(jse.message);
		}
	}
	
	/** 
	* Sorts rows based on a mumeric criteria. 
	*
	* @params th- the column header to sort	
	*
	*/
	Vi.Table.sort.string = function (th) {
		try {

			function getCellValue(tr, cellIndex) {
				var child = tr.children[cellIndex];
				return child.innerText.toUpperCase();
			}

			Vi.Table.sort(th, getCellValue);

		}
		catch (jse) {
			console.error(jse);
		}
	}

	/** 
	* Sorts rows based on a custom criteria. 
	*
	* @params th- the column header to sort	
	* @param orderedArray- an array of values. Should be a set of all the possible
	* values in the sorting column. Rows will be ordered inthe same order as the
	* values in the column are listed in the array
	*
	*/
	Vi.Table.sort.custom = function (th, orderedArray) {
		try {

			function getCellValue(tr, cellIndex) {
				var value = tr.children[cellIndex].innerText.toLowerCase().trim();
				return orderedArray.indexOf(value);
			}

			Vi.Table.sort(th, getCellValue);

		}
		catch (jse) {
			console.error(jse);
		}
	}
	
	


