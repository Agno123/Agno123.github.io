// Vänta tills hela dokumentet har laddats
document.addEventListener('DOMContentLoaded', function () {
    // Hämta referenser till LCD-displayen och tangentbordet
    let lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');
    let operatorExist = false;

    // Tar tecken och tittar om det är ett av de tecknena
    function isOperator(tecken) {
        return ['+', '-', 'x', '/', '*'].includes(tecken); // Om tecken inkluderar ett av de, alltså är så returneras true, annars false
    }
        
    // Funktion som lägger till klick-händelser på varje knapp
    function addDigit () {
        let buttons = keyBoard.querySelectorAll('button');

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                let value = button.innerText;

                // Rensa displayen om "clear"-knappen trycks
                if (button.id === 'clear') {
                    clearLcd();
                // Beräkna resultatet om "enter"-knappen trycks
                } else if (button.id === 'enter') {
                    lcd.value = calculate(lcd.value);
                // Annars lägg till tecknet i displayen
                }
                else {
                    if (lcd.value.length === 0 && isOperator(value)) {
                    return; // Returnera inget, GÖR INGET
                } else {
                    lcd.value += value; // Skriv in det valda talet
                }


                }
            });
        });
    }

    
    // Funktion som rensar displayen
    function clearLcd () {lcd.value = '';}

        // Funktion som räknar ut ett uttryck med +, -, x, /
    function calculate(value) {
        value = value.replace(/,/g, '.'); // Byt ut kommatecken mot punkt för beräkning

        // Dela upp uttrycket i siffror och operatorer (t.ex. ["3", "+", "5", "x", "2"])
        let parts = value.split(/([+\-x/])/);

        // Först hanterar vi multiplikation och division
        let highPriority = [];
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];

            if (part === 'x' || part === '/') {
                let prev = parseFloat(highPriority.pop());
                let next = parseFloat(parts[++i]);
                let result = (part === 'x') ? prev * next : prev / next;
                highPriority.push(result.toString());
            } else {
                highPriority.push(part);
            }
        }

        // Nu hanterar vi addition och subtraktion
        let result = parseFloat(highPriority[0]);
        for (let i = 1; i < highPriority.length; i += 2) {
            let operator = highPriority[i];
            let nextNumber = parseFloat(highPriority[i + 1]);

            if (operator === '+') {
                result += nextNumber;
            } else if (operator === '-') {
                result -= nextNumber;
            }
        }

        // Returnera svaret, avrundat om det är decimaltal
        return Number.isInteger(result) ? result.toString() : result.toFixed(3);
    }
    addDigit();    // Kör funktionen som aktiverar knapparna
});
