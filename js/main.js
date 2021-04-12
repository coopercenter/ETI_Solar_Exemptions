
(function ($) {
    "use strict";
})(jQuery);

function myFunction() {
    // Declare variables
    clearCheckboxes();
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.title
            //txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function mySearchFunction(){
    var input = document.getElementById("mySearchInput");
    var filter = input.value.toUpperCase();
    var search_bar = document.getElementById("select_locality");
    console.log(input, filter, search_bar);
    var li = search_bar.getElementsByTagName("li");
    console.log(li)

    for (i = 0; i < li.length; i++){
        var textValue = li[i].innerText
        if(textValue){
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

function eventListenerCheckboxes(){
    var list = document.getElementById("select_locality");
    var checked = list.getElementsByClassName("form-check-input");
    //var boxes = checked.getElementsByTagName("input")
    for(i = 0; i < checked.length; i++){
        checked[i].addEventListener('click', updateTable);
    }
}

function updateTable(){
    clearSearch();
    var list = document.getElementById("select_locality");
    var checkedList = list.getElementsByClassName("form-check-input");
    var tr = document.getElementById("data-table").getElementsByTagName("tr");
    var checkedLocalities = new Set();
    var numChecked = 0;

    for(i = 0; i < checkedList.length; i++){
        if(checkedList[i].checked){
            numChecked += 1;
            checkedLocalities.add(checkedList[i].parentElement.innerText.substring(1))
        }
    }
    if (numChecked != 0) {
        for( i = 0; i < tr.length; i++){
            var td = tr[i].getElementsByTagName("td")[0]
            if (td){
                console.log(td.innerText)
                console.log(checkedLocalities)
                console.log(checkedLocalities.has(td.innerText))
                if(checkedLocalities.has(td.innerText)){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            }
        }
    }
    if (numChecked == 0){
        for( i = 0; i < tr.length; i++){
            tr[i].style.display = "";
        }
    }
}

function clearCheckboxes(){
    var list = document.getElementById("select_locality");
    var checkedList = list.getElementsByClassName("form-check-input");

    for(i = 0; i < checkedList.length; i++){
        checkedList[i].checked = false;
    }
}

function clearSearch(){
    input = document.getElementById("myInput");
    input.value = "";
}


function sortTableRowsByColumn( table, columnIndex, ascending ) {
    
    const rows = Array.from( table.querySelectorAll( ':scope > tbody > tr' ) );
    rows.sort( ( x, y ) => {
    
        const xValue = x.cells[columnIndex].title;
        const yValue = y.cells[columnIndex].title;
        return ascending ? ( xValue.localeCompare(yValue) ) : ( yValue.localeCompare(xValue) );
    } );
    for( let row of rows ) {
        table.tBodies[0].appendChild( row );
    }
}

function onColumnHeaderClicked( ev ) {
    
    const th = ev.currentTarget;
    const table = th.closest( 'table' );
    const thIndex = Array.from( th.parentElement.children ).indexOf( th );

    

    const ascending = !( 'sort' in th.dataset ) || th.dataset.sort != 'asc';

    sortTableRowsByColumn( table, thIndex, ascending );

    const allTh = table.querySelectorAll( ':scope > thead > tr > th' );
    for( let th2 of allTh ) {
        th2.innerText = th2.innerText.split(/[∧∨]/)[0]
        delete th2.dataset['sort'];
    }
 
    th.dataset['sort'] = ascending ? 'asc' : 'desc'

    colind = th.innerText.indexOf('∧') || th.innerText.indexOf('∨')
    test = th.innerText.split(/[∧∨]/)
    columnName = test[0]
    if(columnName == ""){
        th.innerText = ascending ? th.innerText + " ∧" : th.innerText + " ∨";
    }
    else{
        th.innerText = ascending ? columnName + " ∧" : columnName + " ∨";
    }
}

eventListenerCheckboxes();