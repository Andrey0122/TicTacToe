function mTabClickHandler(e){
  let elem = e.target; 
    if(elem.nodeName != "TD") {
    alert(elem.nodeName);
    return;
    }
    if (elem.innerHTML == " ") {        
        elem.innerHTML = 'X';
        console.log(elem.innerHTML);
        if (checkWin('X')){
            setTimeout(function(){
                alert('Вы победили... гремят фанфары!');
                resTab.rows[1].cells[0].innerHTML++;
                newRoundConfirmation();   
            }, 100);
        }
        else if (isTableFull()){
                setTimeout(function(){
                    alert('Боевая ничья... болельщики чешут в затылке...');
                    newRoundConfirmation(); 
                }, 100);
                } else {
                turnAI();
             }
    } 
    else alert('ни одно условие не выполняется!!!!!'); 
}

function turnHuman(){
    mTab.addEventListener("click", mTabClickHandler, {once:true});   
}

function eq(rowN, colN, sign){
    return mTab.rows[rowN].cells[colN].innerHTML == sign;
}

        
function checkWin(sign){
    for (let i=0; i<3; i++){
            if (eq(i, 0, sign) && eq (i, 1, sign)  && eq(i, 2, sign)){
                mTab.rows[i].cells[0].style.backgroundColor = 'red';
                mTab.rows[i].cells[1].style.backgroundColor = 'red';
                mTab.rows[i].cells[2].style.backgroundColor = 'red';            
                return true;
            }
            if (eq(0,i, sign) && eq(1, i, sign) && eq(2, i, sign)){
                mTab.rows[0].cells[i].style.backgroundColor = 'red';
                mTab.rows[1].cells[i].style.backgroundColor = 'red';
                mTab.rows[2].cells[i].style.backgroundColor = 'red';
                return true;
            }
        }
        if (eq(0, 0, sign) && eq(1, 1, sign) && eq(2, 2, sign)){
            mTab.rows[0].cells[0].style.backgroundColor = 'red';
            mTab.rows[1].cells[1].style.backgroundColor = 'red';
            mTab.rows[2].cells[2].style.backgroundColor = 'red';            
            return true;
        }
        if (eq(2, 0, sign) && eq(1, 1, sign) && eq(0, 2, sign)){
            mTab.rows[2].cells[0].style.backgroundColor = 'red';
            mTab.rows[1].cells[1].style.backgroundColor = 'red';
            mTab.rows[0].cells[2].style.backgroundColor = 'red';            
            return true;
        }  
}

function isTableFull() {
    for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++)
            if (eq(row, col, ' '))
                return false;
    return true;
}

function newRoundConfirmation(){
    if (confirm('Хотите сыграть еще партию?')){
        AIStepNumber = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                console.log(i, j, mTab.rows[i].cells[j].innerHTML);
                mTab.rows[i].cells[j].innerHTML = ' ';
                mTab.rows[i].cells[j].style.backgroundColor = 'white'; 
            }
        }
        if (first == 'man'){
            turnHuman();
        } else{
            turnAI();
        }       
    } else {
        window.close();
    }  

}

let pc, first;
const Corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
const Sides = [[0, 1], [1, 0], [1, 2], [2, 1]];
let AIStepNumber = 0;
let inputs = document.getElementsByName('first');
for (let each of inputs){
    each.addEventListener('click', function(){
        console.log('click!');
        for (let each of inputs){
            if (each.checked){
                console.log('checked');
                switch (each.value){
                    case 'man' : 
                    first = 'man';
                    if (AIStepNumber == 0){
                        turnHuman();
                    }
                    console.log('man') ;
                    break;
                    case 'computer' : 
                    first = 'computer';
                    if (AIStepNumber == 0){
                        turnAI();
                    }
                    console.log('computer') ;
                }     
            } 
        }
    });
}
let inputs1 = document.getElementsByName('pc');

function checkPCPower(){
    console.log('click!');
        for (let each of inputs1){
            if (each.checked){
                console.log('checked');
                switch (each.value){
                    case 'smart' : pc = 'smart'
                    console.log('smart') ;
                    break;
                    case 'dumb' : pc = 'dumb';
                    console.log('dumb');
                }     
            } 
        }
}

for (let each of inputs1){
    each.addEventListener('click', checkPCPower);
}
checkPCPower();

      


        