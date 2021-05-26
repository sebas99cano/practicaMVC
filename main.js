(function () {
  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  self.Board.prototype = {
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    },
  };
})();

(function () {
  self.Bar = function (x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
  };
  self.Bar.prototype = {
    down: function () {},
    up: function () {},
  };
})();

(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  };
  self.BoardView.prototype = {
    draw: function () {
      console.log("entra a la funcion del for");
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];
        draw(this.ctx, el);
      }
    },
  };
  function draw(ctx, element) {
    console.log(element);
    //verificamos que el elemento no este vacio y que tenga la propiedad kind, para identificar que es un rectangulo en este caso
    if (element !== null && element.hasOwnProperty("kind")) {
      console.log("entra al switch");
      switch (element.kind) {
        case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
      }
    }
  }
})();

self.addEventListener("load", main);

function main() {
  console.log("Hola mundo");
  var board = new Board(800, 400);
  var bar = new Bar(20, 100, 40, 100, board);
  var bar2 = new Bar(700, 100, 40, 100, board);
  var canvas = document.getElementById("canvas");
  var board_view = new BoardView(canvas, board);
  board_view.draw();
}
