
<?php

//Le nom du produit (jeu) que l'on souhaite utiliser Dans le dossier /products copier le jeu que vous souhaitez utiliser.
// 2016-12-17 b12
define('PRODUCT', 'satellina');

$gameOptions = array(
	'duration' => 60,
	'pointEarned' => 5,
    'pointLost' => 20,
	'pointToLevel1' => 100,
    'winningLevel' =>2,
    'timingTemps'=> false,
    'percentToNextLevel' => 1.5,
    'life' => 2,
    'pointBonus' => 5,
    //----------------------
    // special  parameters
    //---------------------- 
    // slow : 0.005,  fast : 0.04,  very fast: 0.07 
    'speed'  =>  0.01, // balloon speed
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
