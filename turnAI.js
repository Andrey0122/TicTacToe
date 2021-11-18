function turnAI() {

    let x = 4, y =4;

    if (first == 'computer' && AIStepNumber == 0){
        x = 0;
        y = 0;
    }
    
    // Проверяем, есть ли два нолика и пустая клетка на одной линии. 
    // Если есть, занимаем пустую клетку.
    checkLines('O');
    checkDiagonals('O');

    if (x == 4){
    // Проверяем, есть ли два крестика и пустая клетка на одной линии. 
    // Если есть, занимаем пустую клетку.
        checkLines('X');
        checkDiagonals('X');
        if ((eq(0, 0, 'X') &&  eq(2, 2, 'X') || eq(0, 2, 'X') && eq(2, 0, 'X'))  && pc == 'smart'){
            if (eq(1, 0, ' ')){
                x = 1;
                y = 0;
            }
            if (eq(1, 2, ' ')){
                x = 1;
                y = 2;
            }
        }
    } 
    if (x == 4){
        // Проверяем, свободна ли средняя клетка.
        // Если свободна, занимаем её.
        if (eq(1, 1, ' ')) {
            x = 1;
            y = 1;
        }

        // Проверяем, можем ли устроить "вилку" в угловой клетке
        if (x == 4){
            checkCornerForks('O');
        }
           // Проверяем каждый угол, возможна ли "вилка" у крестиков следующим ходом
        if (x == 4){
            checkCornerForks('X');
        }

        //  Занимаем свободную угловую клетку  
        if (x == 4){
            for (let each of Corners){
                if (eq(each[0], each[1], ' ')){
                    x = each[0];
                    y = each[1];
                }
            }
        }
        // Если нет, занимаем любую боковую клетку. 
        if (x == 4){
            for (let each of Sides){
                if (eq(each[0], each[1], ' ')){
                    x = each[0];
                    y = each[1];
                }
            }
        }
    }        

    mTab.rows[x].cells[y].innerHTML = 'O';
    AIStepNumber++;
    if (checkWin('O')){
        setTimeout(function(){
            alert('Компьютер победил.. болельщики рыдают');
            resTab.rows[1].cells[2].innerHTML++;
            newRoundConfirmation();   
        }, 100);
    } else if (isTableFull()){
            setTimeout(function(){
            alert('Боевая ничья... болельщики чешут в затылке...');
            newRoundConfirmation(); 
            }, 100);
        } else {
            turnHuman();
            }   

    function checkLines(sign){
        for (let i = 0; i < 3; i++) {
            if (eq(i, 0, ' ') && eq(i, 1, sign) && eq(i, 2, sign)) {
                x = i; 
                y = 0; 
                break;
            }
            if (eq(i, 0, sign) && eq(i, 1, ' ') && eq(i, 2, sign)) {
                x = i; 
                y = 1; 
                break;
            }
            if (eq(i, 0, sign) && eq(i, 1, sign) && eq(i, 2, ' ')) {
                x = i; 
                y = 2; 
                break;
            }
            if (eq(0, i, ' ') && eq(1, i, sign) && eq(2, i, sign)) {
                x = 0; 
                y = i; 
                break;
            }
            if (eq(0, i, sign) && eq(1, i, ' ') && eq(2, i, sign)) {
                x = 1; 
                y = i; 
                break;
            }
            if (eq(0, i, sign) && eq(1, i, sign) && eq(2, i, ' ')) {
                x = 2; 
                y = i; 
                break;
            }                  
        }    
    }

    function checkDiagonals(sign){
        // Проверка диагоналей на возможность выстроить 3 в ряд
            if (eq(0, 0, ' ') && eq(1, 1, sign) && eq(2, 2, sign)) {
                x = 0; 
                y = 0; 
            }
            if (eq(0, 0, sign) && eq(1, 1, ' ') && eq(2, 2, sign)) {
                x = 1; 
                y = 1; 
            }
            if (eq(0, 0, sign) && eq(1, 1, sign) && eq(2, 2, ' ')) {
                x = 2; 
                y = 2; 
            }
            if (eq(2, 0, ' ') && eq(1, 1, sign) && eq(0, 2, sign)) {
                x = 2; 
                y = 0; 
            }
            if (eq(2, 0, sign) && eq(1, 1, ' ') && eq(0, 2, sign)) {
                x = 1; 
                y = 1; 
            }
            if (eq(2, 0, sign) && eq(1, 1, sign) && eq(0, 2, ' ')) {
                x = 0; 
                y = 2; 
            }	            
        }
    function checkCornerForks(sign){
        if (pc == 'dumb'){
            return;
        }
        // проверка угловых клеток на возможность "вилки"
        if (eq(0, 0, ' ')){
            let potential = 0;
            if ((eq(0, 1, ' ') && eq(0, 2, sign)) || (eq(0, 1, sign) && eq(0, 2, ' '))){
                potential++;
            }
            if ((eq(1, 1, ' ') && eq(2, 2, sign)) || (eq(1, 1, sign) && eq(2, 2, ' '))){
                potential++;
            }
            if ((eq(1, 0, ' ') && eq(2, 0, sign)) || (eq(1, 0, sign) && eq(2, 0, ' '))){
                potential++;
            }
            if (potential > 1){
                x = 0;
                y = 0;
                return;
            } 
        } 
        if (eq(0, 2, ' ')){
            let potential = 0;
            if ((eq(0, 0, ' ') && eq(0, 1, sign)) || (eq(0, 0, sign) && eq(0, 1, ' '))){
                potential++;
            }
            if ((eq(1, 1, ' ') && eq(2, 0, sign)) || (eq(1, 1, sign) && eq(2, 0, ' '))){
                potential++;
            }
            if ((eq(1, 2, ' ') && eq(2, 2, sign)) || (eq(1, 2, sign) && eq(2, 2, ' '))){
                potential++;
            }
            if (potential > 1){
                x = 0;
                y = 2;
                return;
            } 
        } 
        if (eq(2, 2, ' ')){
            let potential = 0;
            if ((eq(2, 0, ' ') && eq(2, 1, sign)) || (eq(2, 0, sign) && eq(2, 1, ' '))){
                potential++;
            }
            if ((eq(1, 1, ' ') && eq(0, 0, sign)) || (eq(1, 1, sign) && eq(0, 0, ' '))){
                potential++;
            }
            if ((eq(1, 2, ' ') && eq(0, 2, sign)) || (eq(1, 2, sign) && eq(0, 2, ' '))){
                potential++;
            }
            if (potential > 1){
                x = 2;
                y = 2;
                return;
            } 
        } 
        if (eq(2, 0, ' ')){
            let potential = 0;
            if ((eq(2, 1, ' ') && eq(2, 2, sign)) || (eq(2, 1, sign) && eq(2, 2, ' '))){
                potential++;
            }
            if ((eq(1, 1, ' ') && eq(0, 2, sign)) || (eq(1, 1, sign) && eq(0, 2, ' '))){
                potential++;
            }
            if ((eq(1, 0, ' ') && eq(0, 0, sign)) || (eq(1, 0, sign) && eq(0, 0, ' '))){
                potential++;
            }
            if (potential > 1){
                x = 2;
                y = 0;
                return;
            } 
        } 
        
    }
}

