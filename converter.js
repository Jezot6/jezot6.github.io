const dc = [['a','̂','̬'],['e','̈','̤'],['i','̍','̩'],['o','̊','̥'],['u','̆','̯'],['y','̓','̦']];
const dn = dc.length;
function isVowel(l) {
    return ['a','e','i','o','u','y'].includes(l);
}
function transformInput(input) {
    if (input.length >= 2) {
        if (isVowel(input[0]) && isVowel(input[1]) || isVowel(input[input.length-2]) && isVowel(input[input.length-1])) {
            throw new Error("Input cannot start or end with two vowels");
        }
    }
}
function eng(str) {
                    str.replace(/ng/g, "ŋ");
                    str.replace(/nG/g, "ŋ");
                    str.replace(/Ng/g, 'Ŋ')
                    str.replace(/NG/g, 'Ŋ')
}

    let out = '';
    let sk = false;

    for (let i = 0; i < input.length; i++) {
        if (!sk) {
            let c = eng(input[i]);
            if (isVowel(c)) {
                if (!isVowel(input[i-1]) && /^[a-z]$/i.test(input[i-1]) && i > 0) {
                    for (let v = 0; v < dn; v++) {
                        c = c.split(dc[v][0]).join(dc[v][1]);
                    }
                } else {
                    sk = true;
                    for (let v = 0; v < dn; v++) {
                        c = c.split(dc[v][0]).join(dc[v][2]);
                    }
                    if (i + 1 < input.length) {
                        c = eng(input[i+1]) + c;
                    }
                }
            }
            out += c;
        } else {
            sk = false;
        }
    }
    return out;

// UI Elements
const inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.placeholder = 'Romanized:';
inputBox.style.marginRight = '10px';

const outputBox = document.createElement('textarea');
outputBox.rows = 4;
outputBox.cols = 40;
outputBox.readOnly = true;
outputBox.style.display = 'block';
outputBox.style.marginTop = '10px';

const copyButton = document.createElement('button');
copyButton.textContent = 'Copy to Clipboard';

const errorBox = document.createElement('div');
errorBox.style.color = 'red';
errorBox.style.marginTop = '10px';

document.body.appendChild(inputBox);
document.body.appendChild(copyButton);
document.body.appendChild(outputBox);
document.body.appendChild(errorBox);

function updateOutput() {
    errorBox.textContent = '';
    try {
        const result = transformInput(inputBox.value);
        outputBox.value = result;
    } catch (e) {
        outputBox.value = '';
        errorBox.textContent = e.message;
    }
}

inputBox.addEventListener('input', updateOutput);


copyButton.addEventListener('click', () => {
    if (outputBox.value) {
        navigator.clipboard.writeText(outputBox.value);
    }
});
