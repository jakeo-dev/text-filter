console.log('v1.0.4');
console.log('whats new: \n Minor design improvements');

let badList = [];
let final = '';
let rgx = '';
let finalRgx;
let filter = selectFilter.selectedIndex;
let longLim;

function enter() {
    if (filter === 0 || filter === 1) {
        if (badList.length < 1 || document.getElementById('input').value == '') {
            alert('Enter at least one word and text');
        } else {
            for (var i = 0; i < badList.length; i++) {
                if (filter === 0) {
                    if (rgx == '') {
                        rgx = badList[i];
                    } else {
                        rgx = `${rgx}|${badList[i]}`;
                    }
                } else if (filter === 1) {
                    if (rgx == '') {
                        rgx = `([^\\s]+${badList[i]}[^\\s]+|${badList[i]}[^\\s]+|[^\\s]+${badList[i]}|${badList[i]})(\\s|)`;
                    } else {
                        rgx = `(${rgx}|[^\\s]+${badList[i]}[^\\s]+|${badList[i]}[^\\s]+|[^\\s]+${badList[i]}|${badList[i]})(\\s|)`;
                    }
                }
            }

            regex();
        }

    } else if (filter === 2) {
        if (longLim == '' || longLim == undefined) {
            alert('Enter a character limit');
        } else {
            rgx = `\\w{${+longLim + +1},}`;
            regex();
        }
    }
}

function regex() {
    finalRgx = new RegExp(rgx, 'gi');
    final = document.getElementById('input').value.replace(finalRgx, '');
    // final = final.replace(/(\n\s*\n)+/g, '\n'); // removes multi lines breaks to one line break

    document.getElementById('finalText').innerText = final;

    if (final == '') {
        alert('Nothing to output');
    }
}

function add() {
    if (document.getElementById('inp').value == '') {
        alert('Enter a string');
    } else {
        var li = document.createElement('li');
        var inputValue = document.getElementById('inp').value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById('list').appendChild(li);

        document.getElementById('listDiv').style.display = 'flex';
        document.getElementById('addDiv').style.marginBottom = '15px';

        document.getElementById('inp').value = '';

        if (inputValue == '.' || inputValue == '+' || inputValue == '*' || inputValue == '\\' || inputValue == '/') {
            inputValue = `\\${inputValue}`
        }

        badList.push(inputValue);
    }
}

function addLim() {
    if (document.getElementById('inpLim').value == '') {
        alert('Enter a number');
    } else if (document.getElementById('inpLim').value % 1 !== 0 || document.getElementById('inpLim').value < 1) {
        alert('Enter a positive whole number');
    } else {
        longLim = document.getElementById('inpLim').value;
        document.getElementById('limit').innerText = longLim + ' characters maximum';

        document.getElementById('listDiv').style.display = 'flex';
        document.getElementById('limDiv').style.marginBottom = '15px';

        document.getElementById('inpLim').value = '';
    }
}

function changeFilter() {
    filter = selectFilter.selectedIndex;

    if (filter === 2) {
        document.getElementById('limDiv').style.display = 'flex';
        document.getElementById('addDiv').style.display = 'none';
        document.getElementById('list').style.display = 'none';
        document.getElementById('limit').style.display = 'block';
    } else {
        document.getElementById('limDiv').style.display = 'none';
        document.getElementById('addDiv').style.display = 'flex';
        document.getElementById('list').style.display = 'block';
        document.getElementById('limit').style.display = 'none';
    }

    rgx = '';
}

window.onload = changeFilter;

function copy() {
    navigator.clipboard.writeText(document.getElementById('finalText').innerText);

    document.getElementById('copyB').innerText = 'Copied';
}

document.getElementById("list").addEventListener("click", function (e) {
    var tgt = e.target;
    if (tgt.tagName.toUpperCase() == "LI") {
        tgt.parentNode.removeChild(tgt); // or tgt.remove();

        const index = badList.indexOf(tgt.innerText);
        if (index > -1) { // only splice array when item is found
            badList.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    if (badList.length < 1) {
        document.getElementById('listDiv').style.display = 'none';
        document.getElementById('addDiv').style.marginBottom = '30px';
    }
});

document.body.onkeyup = function (event) {
    if (event.keyCode == 13) {
        if (document.getElementById('inp') === document.activeElement) {
            document.getElementById('addB').click(); // clicks add
        } else if (document.getElementById('inpLim') === document.activeElement) {
            document.getElementById('addLim').click(); // clicks enter
        }
    }
}