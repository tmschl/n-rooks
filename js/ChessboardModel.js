(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.setSimpleBoard(params.board);
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    setSimpleBoard: function(simpleBoard){
      this.set('board', this.makeBoardFromSimpleBoard(simpleBoard));
      this.set('n', this.get('board').length);
    },

    makeBoardFromSimpleBoard: function(simpleBoard){
      var that = this;
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: ((r+c)%2),
            inConflict: function(){
              // todo: how expensive is this inConflict() to compute?
              return (
                that.hasRowConflictAt(r) ||
                that.hasColConflictAt(c) ||
                that.hasUpLeftConflictAt(that._getUpLeftIndex(r, c)) ||
                that.hasUpRightConflictAt(that._getUpRightIndex(r, c))
              );
            }
          };
        }, this);
      }, this);
    },

    makeEmptyBoard: function(){
      var board = [];
      _.times(this.get('n'), function(){
        var row = [];
        _.times(this.get('n'), function(){
          row.push(false);
        }, this);
        board.push(row);
      }, this);
      return this.makeBoardFromSimpleBoard(board);
    },

    // we want to see the first row at the bottom, but html renders things from top down
    // So we provide a reversing function to visualize better
    reversedRows: function(){
      return _.extend([], this.get('board')).reverse();
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    _getUpLeftIndex: function(r, c){
      return r + c;
    },

    _getUpRightIndex: function(r, c){
      return this.get('n') - c + r - 1;
    },


    hasRooksConflict: function(){
      return this.hasAnyRowConflict() || this.hasAnyColConflict();
    },

    hasQueensConflict: function(){
      return this.hasRooksConflict() || this.hasAnyUpLeftConflict() || this.hasAnyUpRightConflict();
    },

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){  
      var rowConflict; 
      for(var r = 0; r < this.get('board').length; r++){
        rowConflict = this.hasRowConflictAt(r);
        if(rowConflict){
          return true;
        }
      };
      return false;
    },


    hasRowConflictAt: function(r){
      //for every row, return true if filter's return is 2 or greater      
      var twoTrue = _.filter(this.get('board')[r], function(square) {
        return square.piece
      });
      
      if(twoTrue.length >= 2){
        return true;      
      } else {
        return false;
      }    
    },
    
    hasAnyColConflict: function(){
      var colConflict; 
      
      for(var c = 0; c < this.get('board').length; c++){
        colConflict = this.hasColConflictAt(c);
        if(colConflict){
          return true;
        }
      };
      return false; 
    },

    hasColConflictAt: function(c){
      var zipArray = _.zip.apply(null, this.get('board'));

      var twoTrue = _.filter(zipArray[c], function(square){
        return square.piece;
      });

      if(twoTrue.length >= 2){
        return true;
      } else {
        return false;
      }
    },

    hasAnyUpLeftConflict: function(){
      // todo
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      // todo
    },

    hasAnyUpRightConflict: function(){
      // todo
    },

    hasUpRightConflictAt: function(upRightIndex){
      // todo
    }
  });

  this.ChessboardModel = ChessboardModel;

}());
