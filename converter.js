const dc = [['a', '̂', '̬'], ['e', '̈', '̤'], ['i', '̍', '̩'], ['o', '̊', '̥'], ['u', '̆', '̯'], ['y', '̓', '̦']];
const dn = dc.length;
function isVowel(l) {
    return ['a', 'e', 'i', 'o', 'u', 'y'].includes(l);
}
function eng(str) {
    return str
        .replace(/ng/g, "ŋ")
        .replace(/nG/g, "ŋ")
        .replace(/Ng/g, 'Ŋ')
        .replace(/NG/g, 'Ŋ');
}
function transformInput(input) {
    for (let i = 0; i < input.length; i++) {
        if ((isVowel(input[i]) && isVowel(input[i + 1]) && !/^[a-zŋ]$/i.test(input[i + 2])) || (isVowel(input[i]) && isVowel(input[i + 1]) && !/^[a-zŋ]$/i.test(input[i - 1]))) {
            throw new Error("Words cannot start or end with two vowels");
        }
        if (isVowel(input[i].toLowerCase()))
            input = input.slice(0, i) + input[i].toLowerCase() + input.slice(i+1);;
    }


    let out = '';
    let sk = false;
    input = eng(input);
    for (let i = 0; i < input.length; i++) {
        if (!sk) {
            let c = input[i];
            if (isVowel(c)) {
                if (!isVowel(input[i - 1]) && /^[a-zŋ]$/i.test(input[i - 1]) && i > 0) {
                    for (let v = 0; v < dn; v++) {
                        c = c.split(dc[v][0]).join(dc[v][1]);
                    }
                } else {
                    sk = true;
                    for (let v = 0; v < dn; v++) {
                        c = c.split(dc[v][0]).join(dc[v][2]);
                    }
                    if (i + 1 < input.length) {
                        c = input[i + 1] + c;
                    }
                }
            }
            out += c;
        } else {
            sk = false;
        }
    }
    return out;
}
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
