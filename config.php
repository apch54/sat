
<?php

//Le nom du produit (jeu) que l'on souhaite utiliser Dans le dossier /products copier le jeu que vous souhaitez utiliser.
// 2016-12-17 b12
define('PRODUCT', 'satellina');

$gameOptions = array(
	'duration' => 60,
	'pointEarned' => 10,
    'pointLost' => 5,
	'pointToLevel1' => 200,
    'winningLevel' =>2,
    'timingTemps'=> false,
    'percentToNextLevel' => 1.5,
    'life' => 3,
    'pointBonus' => 5,
    //----------------------
    // special  parameters
    //----------------------
    // on stage tank velocity.x  (pxl/sec) 
    // slow : 30,  fast : 60,  very fast: 100 px/sec, even more for a suicide play)
    'tank_vx'  =>  30,    
    'rambo_vx' =>  80,  // player velocity.x   (pxl/sec) 
    //----------------------

    'winCallback' => 'http://www.google.com',
    'loseCallback' => 'http://www.google.com',
    'facebook' => false,
    'gold' => false,
    'rewardText' => 'YOU GET YOUR REWARD',
    'freegame_enabled' => false,
    'slideFullscreen' => true

);
//REGIEREPLACE
