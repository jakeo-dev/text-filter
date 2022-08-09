console.log('v1.0.1');
console.log('whats new: \n Fixed bug involving removing just the words');

let badList = [];
let final = '';
let rgx = '';

function enter() {
    if (badList.length < 1 || document.getElementById('input').value == '') {
        alert('Enter at least one word and text');
    } else {
        for (var i = 0; i < badList.length; i++) {
            if (document.getElementById('selectFilter').value == 1) {
                if (rgx == '') {
                    rgx = badList[i];
                } else {
                    rgx = `${rgx}|${badList[i]}`;
                }
            } else if (document.getElementById('selectFilter').value == 2) {
                if (rgx == '') {
                    rgx = `([^\\s]+${badList[i]}[^\\s]+|${badList[i]}[^\\s]+|[^\\s]+${badList[i]}|${badList[i]})(\\s|)`;
                } else {
                    rgx = `(${rgx}|[^\\s]+${badList[i]}[^\\s]+|${badList[i]}[^\\s]+|[^\\s]+${badList[i]}|${badList[i]})(\\s|)`;
                }
            }
        }

        var finalRgx = new RegExp(rgx, 'gi');
        final = document.getElementById('input').value.replace(finalRgx, '');
        // final = final.replace(/(\n\s*\n)+/g, '\n'); // removes multi lines breaks to one line break

        document.getElementById('finalText').innerText = final;

        if (final == '') {
            alert('Nothing to output');
        }
    }
}

function add() {
    if (document.getElementById('inp').value == '') {
        alert('Enter a word');
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

function changeFilter() {
    rgx = '';
}

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
    if (event.keyCode == 13 && document.getElementById('inp') === document.activeElement) {
        document.getElementById('addB').click(); // clicks enter
    }
}