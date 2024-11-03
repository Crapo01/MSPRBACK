
# DEPLOIEMENT D'UNE NOUVELLE INSTANCE REACT VITE:

Cloner le repo.

Aller à la racine du site cd MSPRFRONT

npm install

pour installer toutes les dependances:

"dependencies": {

    "react": "^18.2.0", 

    "bootstrap": "^5.3.3",

    "leaflet": "^1.9.4",

    "leaflet-routing-machine": "^3.2.12",

    "react-bootstrap": "^2.10.3",

    "react-dom": "^18.3.1",

    "react-html-parser": "^2.0.2",

    "react-leaflet": "^4.2.1",

    "react-router-dom": "^6.23.1"
  },

  # lancement de l'app+serveur applicatif

  Aller à la racine du site et lancer dans la console:  
  npm run dev 

  # BUILD de l'app pour deploiement WEB

  Aller à la racine du site et lancer dans la console:
  npm run build

  le build est dans le dossier dist

  # deploiement sur serveur WEB

  transferer l'ensemble du dossier dist via  filezilla dans le dossier HTDOCS du serveur web
  
