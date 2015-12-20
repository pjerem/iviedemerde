# iViedermerde

Ce repository contient ma réponse à l'énoncé de test à l'embauche d'iAdvize.

## Ma réponse
Pour répondre a cet énnoncé, j'ai choisi d'écrire une librairie capable d'extraire
des données depuis n'importe quelle URL en utilisant des sélecteurs jQuery.

***Cette librairie a été développée pour l'occasion et fait donc partie intégrante du test.***

Vous la trouverez ici : https://github.com/pjerem/shoveljs

Ce repository contient : 
- Un serveur utilisant Express et servant l'API demandée.
- Un script dont l'utilitée est basiquement d'utiliser ShovelJS pour récupérer les données.

##Utilisation
```bash
git clone https://github.com/pjerem/iviedemerde.git
cd iviedemerde
npm install

#Puis lancer uniquement l'une des commandes suivantes:
npm start # Lance l'extraction de données sur VDM, puis le serveur
./extract-vdm.js --help # Outil permettant de lancer une extraction manuelle (sait-on jamais ...)
npm test # Lance les tests.
```
## Rappel de l'énoncé
Ci dessous un simple copier-coller de l'énoncé auquel je me permet d'ajouter quelques remarques. Il m'a en effet été proposé de répondre à cet énoncé avec n'importe quel langage et framework de mon choix. 

Mon choix s'est donc porté sur :
* ECMAScript, dans sa bonne vieille version 5
* Express

### Description du test
Ce test a pour but de mettre en oeuvre une application permettant 2 choses :
* Permettre à l’aide d’une ligne de commande, d’aller chercher les 200 derniers enregistrements du site “Vie de merde” et de les stocker. (Champs à récupérer: Contenu, Date et heure, et auteur)
* Permettre la lecture des enregistrements précedemment récupérés à l’aide d’une API REST au format JSON

### Eléments requis
* Vous devez utiliser GIT pour versionner vos fichiers
* Vous devez utiliser Composer pour gérer vos dépendances **En JS, on utilisera plutôt NPM :) **
* Vous devez tester unitairement votre code
* Vous devez mettre à disposition votre code via Github
* Vous ne devez pas utiliser l’API du site “Vie de Merde” pour récuperer les informations
