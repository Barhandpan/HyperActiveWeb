const container = document.getElementsByClassName('grid-container')
let dragged = null;
let draggedParent = null;
let isWhiteTurn = true;
let anotherTurn = false;
let lastDraggedPiece;
let dropzoneAfterEat = false;
let AllDropZones;
startGame()
function startGame(){
    for(let i = 0; i<8 ;i++){
        for(let j = 0; j<8;j++){
            const box = document.createElement('div');
            box.classList.add('box');
            const piece = document.createElement('div');
            container[0].appendChild(box)
            box.setAttribute('column',((i*8+j) % 8))
            box.setAttribute('row',parseInt((i*8+j)/8))
            initializeBoard(i,j,box,piece)
            dragAndDrop(piece,box)       
        }                    
    }
}
function toggleDragAndDrop(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
       const piece = box.querySelector('.black-soldier, .white-soldier')
       if(piece)
            dragAndDrop(piece,box)
    });
}
function initializeBoard(row,column,box,piece){ 
    let setID = 100;
    addEventListeners()
    function helpBuildTheBoard(myColor){       
    piece.classList.add(myColor)
    piece.setAttribute('id',`${setID}`)
    setID++;
    const box = document.getElementsByClassName('box');
    box[(row*8+column)].id = (row*8+column);
    box[(row*8+column)].appendChild(piece)                                      
    box[(row*8+column)].setAttribute('occupied',true)
    }       
        if(row%2===0){
                    if(column%2 === 0)
                box.classList.add('white');
            else{
                box.classList.add('black');
                if(row<3)
                    helpBuildTheBoard('black-soldier')
                if(row>2 && row<5)
                    appendEmptyBox(row,column)
                if(row>5)
                    helpBuildTheBoard('white-soldier')              
            }
        }
        else{
            container[0].appendChild(box)
            if(column%2 === 0){
                box.classList.add('black');
                if(row<3)
                    helpBuildTheBoard('black-soldier')
                if(row>2 && row<5)
                    appendEmptyBox(row,column)
                if(row>4)
                    helpBuildTheBoard('white-soldier')                                  
            }
            else
                box.classList.add('white'); 
        }
}
function appendEmptyBox(row,column){
    const box = document.getElementsByClassName('box');
    box[(row*8+column)].id = (row*8+column);                   
    box[(row*8+column)].setAttribute('occupied',false)
}
function dragAndDrop(piece,box){
    piece.draggable = true; 
    piece.addEventListener("dragstart", (event) => {
        dragged = event.target;
        draggedParent = dragged.parentNode
        AllDropZones = document.querySelectorAll('.dropzone')
        if(anotherTurn && AllDropZones.length > 1)
            dropzoneAfterEat = true; 
    });
    box.addEventListener("dragover", (event) => {
      event.preventDefault();
      const row = parseInt((dragged?.parentNode?.id)/8)
      const column = parseInt((dragged?.parentNode?.id)%8)
      const targetRow = parseInt(box.getAttribute('row'))
      const targetColumn = parseInt(box.getAttribute('column'))
      if ( !anotherTurn && event.target.className === "box black" && event.target.childNodes.length === 0 && islegalMove(isWhiteTurn,row,targetRow,column,targetColumn)) {
            box.classList.add("dropzone")
      }
    });
    box.addEventListener("dragleave", (event) => {
        if (event.target.classList.contains("dropzone") && !anotherTurn){
          event.target.classList.remove("dropzone");        
        }
    });
    box.addEventListener("drop", (event) => {
        event.preventDefault();
        if (event.target.className === "box black dropzone" && (!anotherTurn || (anotherTurn && lastDraggedPiece === dragged))) {
            const boardBeforeDrop = setTheBoard()
            dragged.parentNode.removeChild(dragged);            
            event.target.appendChild(dragged);
            draggedParent.setAttribute('occupied',false)
            event.target.setAttribute('occupied',true)
            event.target.classList.remove('dropzone')
            if(dropzoneAfterEat){
                AllDropZones = document.querySelectorAll('.dropzone')
                for(let i = 0; i<AllDropZones.length;i++)
                    AllDropZones[i].classList.remove('dropzone') 
            }
            let madeKingThisTurn;
            let isThereMoreMoves = true;
            const targetBox = event.target
            const draggedRow = parseInt(draggedParent.getAttribute('row'))
            const draggedColumn = parseInt(draggedParent.getAttribute('column'))
            const eventRow = parseInt(targetBox.getAttribute('row'))
            const eventColumn = parseInt(targetBox.getAttribute('column'))
            if(eventRow + 1 === draggedRow || eventRow - 1 === draggedRow)
                isWhiteTurn? burnPieces(-1,'white-soldier','black-soldier',boardBeforeDrop,'king-white'):burnPieces(1,'black-soldier','white-soldier',boardBeforeDrop,'king-black')
            if(eventRow === 7 || eventRow === 0 && !(dragged.classList.contains('king-black')) && !(dragged.classList.contains('king-white')))
                madeKingThisTurn = createKing(isWhiteTurn,eventRow,eventColumn)    
            if(eventRow + 2 === draggedRow || eventRow - 2 === draggedRow){
                removePiece(eventRow,eventColumn,draggedRow,draggedColumn)
                    if(!madeKingThisTurn){
                        anotherTurn = isMultipleEatAvailable(eventRow,eventColumn)
                        lastDraggedPiece = dragged
                    }
                    else
                        anotherTurn = false;              
            }   
            if(!anotherTurn){
                isWhiteTurn = !isWhiteTurn
                const turnMassage = document.getElementById('turn-massage')
                isWhiteTurn?turnMassage.innerHTML = "White's Turn":turnMassage.innerHTML = "Black's Turn"
            }
            isWhiteTurn?isThereMoreMoves = noMoreMoves('white-soldier'): isThereMoreMoves = noMoreMoves('black-soldier')
            if(madeKingThisTurn)
                madeKingThisTurn = !madeKingThisTurn
            let numberOfWhitePiecesLeft = document.querySelectorAll('.white-soldier').length
            let numberOfBlackPiecesLeft = document.querySelectorAll('.black-soldier').length
            if(!anotherTurn){
                if(isThereMoreMoves && numberOfBlackPiecesLeft > 0 && numberOfWhitePiecesLeft > 0)                                 
                    toggleDragAndDrop()
                else{
                    endGameIfGameOver(numberOfWhitePiecesLeft,numberOfBlackPiecesLeft)
                }                   
            }
        }
    });
    function endGameIfGameOver(numberOfWhitePiecesLeft,numberOfBlackPiecesLeft){
        let gameOver = false;
        if(numberOfBlackPiecesLeft === 0){
            announceGameOver('White Color Wins!')
            gameOver = true;
        }
        if(numberOfWhitePiecesLeft === 0){
            announceGameOver('Black Color Wins!')
            gameOver = true;
        }
        if(!gameOver)
            announceGameOver(isWhiteTurn?'Black Color Won The Game Because White Has No More Available Moves!':'White Color Won The Game Because Black Has No More Available Moves!')
    }
    function removePiece(eventRow,eventColumn,draggedRow,draggedColumn){
        function insideRemovePiece(x,y){ 
            if( eventRow === draggedRow +x && eventColumn === draggedColumn +y){
                const pieceToRemove = document.querySelector(`.box[row="${draggedRow+x/2}"][column="${draggedColumn+y/2}"]`)
                pieceToRemove.removeChild(pieceToRemove.children[0])
                pieceToRemove.setAttribute('occupied',false)
            }
        }
        insideRemovePiece(2,2)
        insideRemovePiece(2,-2)
        insideRemovePiece(-2,2)
        insideRemovePiece(-2,-2)
    }
    function isMultipleEatAvailable(eventRow,eventColumn){
        let multipleEat = true;
        const backRightSideOccupiedByOpponent = document.querySelector(`.box[row="${eventRow+1}"][column="${eventColumn+1}"]`)
        const backLeftSideOccupiedByOpponent = document.querySelector(`.box[row="${eventRow+1}"][column="${eventColumn-1}"]`)
        const RightSideOccupiedByOpponent = document.querySelector(`.box[row="${eventRow-1}"][column="${eventColumn+1}"]`)
        const LeftSideOccupiedByOpponent = document.querySelector(`.box[row="${eventRow-1}"][column="${eventColumn-1}"]`)
        const checkEatBackRightSide = document.querySelector(`.box[row="${eventRow+2}"][column="${eventColumn+2}"]`)
        const checkEatBackLeftSide = document.querySelector(`.box[row="${eventRow+2}"][column="${eventColumn-2}"]`)
        const checkEatLeftSide = document.querySelector(`.box[row="${eventRow-2}"][column="${eventColumn-2}"]`)
        const checkEatRightSide = document.querySelector(`.box[row="${eventRow-2}"][column="${eventColumn+2}"]`)
        let foundAvailableEat = false;
        function markAvailableMovesWhileMultipleEat(opponentColor,myColor){
            function getEachSideAvailableMove(freesBox,occupiedBox){
                if(freesBox?.getAttribute('occupied') === 'false' && occupiedBox.children[0]?.classList.contains(opponentColor) && dragged.classList.contains(myColor)){
                    freesBox.classList.add('dropzone')
                    foundAvailableEat = true;  
                }                     
            }
            getEachSideAvailableMove(checkEatBackLeftSide,backLeftSideOccupiedByOpponent)
            getEachSideAvailableMove(checkEatBackRightSide,backRightSideOccupiedByOpponent)
            getEachSideAvailableMove(checkEatLeftSide,LeftSideOccupiedByOpponent)
            getEachSideAvailableMove(checkEatRightSide,RightSideOccupiedByOpponent)
            if(foundAvailableEat)
                return true;
            return false;
        }
        if(isWhiteTurn)
            multipleEat = markAvailableMovesWhileMultipleEat('black-soldier','white-soldier')
        else
            multipleEat = markAvailableMovesWhileMultipleEat('white-soldier','black-soldier')
        return multipleEat;                
    }
    function islegalMove(isWhiteTurn,row,targetRow,column,targetColumn) {
        let isLegal = false;
        function getLegalMove(i,y,opponentColor,myColor,king){
            if(row - i === targetRow &&  (column === targetColumn + 1 || column === targetColumn - 1) && dragged.classList.contains(myColor))
                return true
            if(row + i === targetRow && (column === targetColumn + 1 || column === targetColumn - 1) && dragged.classList.contains(king) && dragged.classList.contains(myColor))
                return true
            const RightSideOccupiedByOpponent = document.querySelector(`.box[row="${row-i}"][column="${column+1}"]`)
            const LeftSideOccupiedByOpponent = document.querySelector(`.box[row="${row-i}"][column="${column-1}"]`)
            const backRightSideOccupiedByOpponent = document.querySelector(`.box[row="${row+i}"][column="${column+1}"]`)
            const backLeftSideOccupiedByOpponent = document.querySelector(`.box[row="${row+i}"][column="${column-1}"]`)
            function eachSideLegalMove(sideOccupiedByOpponent,x,isKing=false){
                if((sideOccupiedByOpponent?.children[0]?.classList.contains(opponentColor))){
                    y= isKing?y*(-1):y
                    if(row - y === targetRow && (column + x === targetColumn))
                       isLegal = true                               
                }
            }
           eachSideLegalMove(RightSideOccupiedByOpponent,2)
           eachSideLegalMove(LeftSideOccupiedByOpponent,-2)
           eachSideLegalMove(backLeftSideOccupiedByOpponent,-2,true)
           eachSideLegalMove(backRightSideOccupiedByOpponent,2,true)
            return isLegal
        }
        if(isWhiteTurn)
            return  getLegalMove(1,2,'black-soldier','white-soldier','king-white') 
        else
            return getLegalMove(-1,-2,'white-soldier','black-soldier','king-black')      
    }
}
 function addEventListeners(){
    const drawBox = document.getElementById('draw-box')
    const buttonCloseDrawBox = document.getElementById('button-close-draw-box')
    const buttonAcceptDraw = document.getElementById('button-accept-draw')
    buttonAcceptDraw.addEventListener('click',() => {
    container[0].className = 'none'
    drawBox.className = 'end-game'  
    drawBox.innerHTML = 'The Game Ended With A Draw'
})
buttonCloseDrawBox.addEventListener('click',() =>{
    drawBox.className = 'none'
})
drawBox.addEventListener('click',(event) => {
    event.stopPropagation();
})
}
function offerDraw(){
    const drawMassage = document.getElementById('draw-massage')
    isWhiteTurn? drawMassage.innerHTML = 'White Offer You a Draw Do You Accept?':drawMassage.innerHTML = 'Black Offer You a Draw Do You Accept?'
    const drawBox = document.getElementById('draw-box')
    drawBox.className = 'modal-box'
}
function resign(){
    const drawBox = document.getElementById('draw-box')
    container[0].className = 'none'
    drawBox.className = 'end-game'  
    isWhiteTurn? drawBox.innerHTML = 'White Resigned':drawBox.innerHTML = 'Black Resigned'
}
function announceGameOver(opponentColor){
    const drawBox = document.getElementById('draw-box')
    container[0].className = 'none'
    drawBox.className = 'end-game'  
    drawBox.innerHTML = `${opponentColor}`
    return true;
}
function noMoreMoves(myColor){   
    let board = setTheBoard();   
    let isAvailableMove = false;
    const allMyPieces = document.querySelectorAll(`.${myColor}`)
    for(let i = 0; i<allMyPieces.length;i++){
        const pieceRow = parseInt(allMyPieces[i].parentNode.getAttribute('row'))
        const pieceColumn = parseInt(allMyPieces[i].parentNode.getAttribute('column'))
        function isThereMoreMovesAvailable(pieceRow,pieceColumn,opponentColor,x,y,isAvailableMove,board,king){
            if(isInBoard(pieceRow + x,pieceColumn + y) &&!board[pieceRow + x][pieceColumn+y])
                isAvailableMove = true
            if(isInBoard(pieceRow + x,pieceColumn - y) &&!board[pieceRow + x][pieceColumn-y])
                isAvailableMove = true
            if(isInBoard(pieceRow + x*2,pieceColumn + y*2) && board[pieceRow + x][pieceColumn + y]?.className === opponentColor && !board[pieceRow + x*2][pieceColumn+y*2])
                isAvailableMove = true
            if(isInBoard(pieceRow + x*2,pieceColumn - y*2) && board[pieceRow + x][pieceColumn - y]?.className === opponentColor && !board[pieceRow + x*2][pieceColumn-y*2])
                isAvailableMove = true
            if(isInBoard(pieceRow - x,pieceColumn + y) &&!board[pieceRow - x][pieceColumn+y] && allMyPieces[i].classList.contains(king))
                isAvailableMove = true
            if(isInBoard(pieceRow - x,pieceColumn - y) &&!board[pieceRow - x][pieceColumn-y] && allMyPieces[i].classList.contains(king))
                isAvailableMove = true
            if(isInBoard(pieceRow - x*2,pieceColumn + y*2) && board[pieceRow - x][pieceColumn + y]?.classList.contains(opponentColor) && !board[pieceRow - x*2][pieceColumn+y*2] && allMyPieces[i].classList.contains(king))
                isAvailableMove = true
            if(isInBoard(pieceRow - x*2,pieceColumn - y*2) && board[pieceRow - x][pieceColumn - y]?.classList.contains(opponentColor) && !board[pieceRow - x*2][pieceColumn-y*2] && allMyPieces[i].classList.contains(king))
                isAvailableMove = true
            return isAvailableMove;
        }
        if(isWhiteTurn){                       
            isAvailableMove = isThereMoreMovesAvailable(pieceRow,pieceColumn,'black-soldier', -1, 1,isAvailableMove,board,'king-white')
            if(isAvailableMove)
                return true;  
        }
        else{
            isAvailableMove = isThereMoreMovesAvailable(pieceRow,pieceColumn,'white-soldier', 1, 1,isAvailableMove,board,'king-black')
            if(isAvailableMove)
                return true;      
        }
    }
    return isAvailableMove
}
function setTheBoard(){   
    let board = [[],[],[],[],[],[],[],[]]
    for(let i = 0; i<8; i++){
        for(let j = 0; j<8;j++){
                const pieceColor = document.querySelector(`.box[row="${i}"][column="${j}"]`).children[0]
                if(pieceColor)
                    board[i][j] = pieceColor;
                else
                    board[i][j] = null;
        }
    }
    return board  
}
function isInBoard(row, column){
        if (row < 8 && row >= 0 && column < 8 && column >= 0)
            return true;
        return false;
    }   
function burnPieces(x,myColor,opponentColor,board,king){  
    for(let i = 0; i<8;i++){
        for(let j = 0; j<8; j++){
            if(board[i][j]?.className === myColor ||board[i][j]?.className === (`${myColor} ${king}`)){
                function burnThePiece(){
                    const pieceToBurn = board[i][j]
                    pieceToBurn?.parentNode.setAttribute('occupied',false)
                    pieceToBurn?.remove()
                }
                if( isInBoard(i+x*2,j-x*2) &&board[i+x][j-x]?.classList.contains(opponentColor) && !board[i+x*2][j-x*2])
                    burnThePiece()
                if( isInBoard(i+x*2,j+x*2) && board[i+x][j+x]?.classList.contains(opponentColor) && !board[i+x*2][j+x*2])
                    burnThePiece()
                if( isInBoard(i-x*2,j+x*2) &&board[i-x][j+x]?.classList.contains(opponentColor) && !board[i-x*2][j+x*2] && board[i][j].classList.contains(king))
                    burnThePiece()
                if( isInBoard(i-x*2,j-x*2) && board[i-x][j-x]?.classList.contains(opponentColor) && !board[i-x*2][j-x*2] && board[i][j].classList.contains(king))
                    burnThePiece()
            }
        }
    }
}
function createKing(isWhiteTurn,eventRow,eventColumn){
    const makeThisPieceKing = document.querySelector(`.box[row="${eventRow}"][column="${eventColumn}"]`)
    if(isWhiteTurn && eventRow === 0){
        makeThisPieceKing.children[0].classList.add('king-white')
        return true
    }
    if(!isWhiteTurn && eventRow === 7){
        makeThisPieceKing.children[0].classList.add('king-black')
        return true
    }
    return false
}