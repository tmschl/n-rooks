var solveNRooks = function(n){

  

  // window.chessboardView.model.togglePiece(2,2)
  var placePiece = function(row, col) {
    this.get('board')[row][col].piece = !this.get('board')[row][col].piece;
  }

  //traverse entire board to find conflicts
  var checkForConflicts = function() {
    var chester = chessboardView.model;
    for (var r = 0; r < chester.get('n'); r++ ){
      for (var c = 0; c < chester.get('n'); c++){
        togglePiece(r, c);
        if(chester.hasRooksConflict){
          togglePiece(r,c);
        } else { 
          break;
        }
      }
    };
  }  
}