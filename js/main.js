
(function ($) {
    "use strict";
})(jQuery);

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortTableRowsByColumn( table, columnIndex, ascending ) {
    
    const rows = Array.from( table.querySelectorAll( ':scope > tbody > tr' ) );
    console.log(rows)
    rows.sort( ( x, y ) => {
    
        const xValue = x.cells[columnIndex].textContent;
        const yValue = y.cells[columnIndex].textContent;
        
        // const xNum = parseFloat( xValue );
        // const yNum = parseFloat( yValue );
        // console.log(xValue, yValue)
        // console.log(xValue - yValue)
        console.log(xValue.localeCompare(yValue))
        return ascending ? ( xValue.localeCompare(yValue) ) : ( yValue.localeCompare(xValue) );
    } );
    console.log(rows)
    for( let row of rows ) {
        table.tBodies[0].appendChild( row );
    }
    console.log(table.tBodies)
}

function onColumnHeaderClicked( ev ) {
    
    const th = ev.currentTarget;
    const table = th.closest( 'table' );
    const thIndex = Array.from( th.parentElement.children ).indexOf( th );

    

    const ascending = !( 'sort' in th.dataset ) || th.dataset.sort != 'asc';

    sortTableRowsByColumn( table, thIndex, ascending );

    const allTh = table.querySelectorAll( ':scope > thead > tr > th' );
    console.log(allTh)
    for( let th2 of allTh ) {
        th2.innerText = th2.innerText.split(/[∧∨]/)[0]
        delete th2.dataset['sort'];
    }
 
    th.dataset['sort'] = ascending ? 'asc' : 'desc'

    colind = th.innerText.indexOf('∧') || th.innerText.indexOf('∨')
    test = th.innerText.split(/[∧∨]/)
    console.log(test)
    columnName = test[0]
    //th.innerText.substr(0,(th.innerText.indexOf('∧') || th.innerText.indexOf('∨')))
   // console.log(columnName)
    if(columnName == ""){
        th.innerText = ascending ? th.innerText + " ∧" : th.innerText + " ∨";
    }
    else{
        th.innerText = ascending ? columnName + " ∧" : columnName + " ∨";
    }
}