/**
 * Create and insert a table of squares of integers up to n.
 * 
 * @param {*} n Positive integer
 */
function tableOfSquares(n) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = '<var>n</var>';
    tr.append(th);
    th = document.createElement('th');
    th.innerHTML = '<var>n</var>&sup2;';
    tr.append(th);
    table.append(tr);
    return table;
}

function insertTable(parentElt, n) {
    console.log(parentElt, n);
    let lastChild = parentElt.lastElementChild;
    if (lastChild.tagName === 'table') {
        lastChild.remove();
    }
    parentElt.append(tableOfSquares(n));
}