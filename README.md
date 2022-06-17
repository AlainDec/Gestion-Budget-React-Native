# 16-GestionBudget

INSTALLATION 
------------

https://reactnative.dev/docs/environment-setup

installer chocolatey : https://chocolatey.org/install#individual
pour cela il faut installer powershell, qui vérifie les soures provenant d'internet
https://github.com/PowerShell/PowerShell/releases/tag/v7.2.4
revenir sur chocolatey, taper ligne de commande :
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

retour sur https://reactnative.dev/docs/environment-setup
installer nodeJs et JDK11
choco install -y nodejs-lts openjdk11

Vérifier version node :
$ node -v

Vérifier version JDK :
$ java -version

Installer Android Studio

Configurer variables d'environnement :(variable système)
ANDROID_HOME : C:\Users\Geogalion\AppData\Local\Android\Sdk

Ouvrir un nouveau powershell et vérifier que la variable ANDROID_HOME est présente :
$ Get-ChildItem -Path Env:\

Ajouter dnas le path des variables windows : 
%LOCALAPPDATA%\Android\Sdk\platform-tools

Créer le projet 
$ npx react-native init p16GestionBudget --template react-native-template-typescript
$ cd p16GestionBudget 

Lancer le projet
$ npx react-native run-android

Si erreur sur chemin de JAVA_HOME, le corriger, fermer powershell et relancer la ligne de commande.
Si problème d'espace mémoire VM, le plus simple est de supprimer Java
Vérifier aussi les mises à jour Windows

Pour lancer le projet sur émulateur :
- lancer android studio, créer un device qu'on choisi, et l'exécuter
puis en ligne de commande :
$ npx react-native start
$ npx react-native run-android
On peut fermer android studio, l'émulateur est lancé.

Pour lancer le projet sur téléphone :
- connecter le cable, accepté les indications sur le mobile
Voir si le mobile est bien connecté :
$ adb devices
Lancer l'app :
$ npx react-native run-android


AJOUT DES MODULES
-----------------

>   module.exports = {
>     presets: ['module:metro-react-native-babel-preset'],
>     env: {
>       production: {
>         plugins: ['react-native-paper/babel'],
>       },
>     },
>   };

$ npm install @react-navigation/native @react-navigation/native-stack

navigations avec la barre en bas

$ npm install @react-navigation/bottom-tabs

$ npm install --save react-native-vector-icons

Choisir une icône : https://ionic.io/ionicons  ou encore pour plus de choix : https://oblador.github.io/react-native-vector-icons/

Problèmes de compilation, ajout des installations suivantes :

$ npm install @react-navigation/native

$ npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

$ npm i --save-dev @types/react-native-vector-icons

Editer le fichier android/app/build.gradle (MAIS PAS android/build.gradle)
et ajouter en bas : 

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

Gestion des monnaies en fonction des langues, installer Intl

$ npm install intl

et les importer comme ceci :

import 'intl';

import 'intl/locale-data/jsonp/fr';

Gestion des formulaires avec React Hook Form

$ npm install react-hook-form

Gestion des règles de validations des formulaires avec YUP

$ npm i yup

Yup a besoin d'un resolver et donc de sa librairie :

$ npm install @hookform/resolvers

Ajout du datepicker pour saisir la date des opérations

$ npm i @react-native-community/datetimepicker

Ajout du champ input select/option

$ npm i @react-native-picker/picker

Ajout de la librairie graphique Chart Kit

$ npm i react-native-chart-kit

$ npm i react-native-svg
