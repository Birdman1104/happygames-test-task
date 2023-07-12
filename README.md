### Test task for HappyGames LLC

  Данное тестовое задание передано мне исключительно для оценки моих знаний и навыков.  
  This test task was given to me exclusively for testing my knowledge and skills.

### Project Architecture
  Everything starts at `App.js` where I created the PIXI application for the game. It has `PixiStage`, which contains the main views for the game `GameView`, `UIView`, `ForegroundView`.
  There is `Head` where I keep all the data, which is used in the game. When the game starts, data for the first level is being loaded. While the first level is being played, data for the second level is being loaded. When you play one level, the data for the next level is being loaded behind the scenes.

  I used `@armathai/lego`[https://github.com/armathai/lego] to implement event system and to setup the core logic for MVC. 
  I used `@armathai/grid`[https://github.com/armathai/pixi-grid] to speed up the resize process.

  
