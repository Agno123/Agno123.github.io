// Vänta tills hela dokumentet har laddats
document.addEventListener('DOMContentLoaded', function () {
    // Hämta referenser till LCD-displayen och tangentbordet
    let lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');

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
                } else {
                    lcd.value += value;
                }
            });
        });
    }

    // Funktion som rensar displayen
    function clearLcd () {lcd.value = '';}

    // Funktion som räknar ut ett uttryck med +, -, x, /
    function calculate(value) {
        let chars = value.split(/([+\-x/])/); // Dela upp uttrycket i siffror och operatorer
        let result = parseFloat(chars[0]); // Startvärdet är det första talet
    
        // Loopa igenom operatorer och efterföljande tal
        for (let i = 1; i < chars.length; i += 2) {
            let operator = chars[i];
            let nextNumber = parseFloat(chars[i + 1]);
    
            // Utför rätt beräkning beroende på operator
            switch(operator) {
                case '+': result += nextNumber; break;
                case '-': result -= nextNumber; break;
                case 'x': result *= nextNumber; break;
                case '/': result /= nextNumber; break;
            }
        }
        return result;
    }

    // Kör funktionen som aktiverar knapparna
    addDigit();
});
