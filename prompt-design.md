# Prompt Design — KB Medizintechnik / kbmedshop.ch

**Date :** 2026-06-06  
**Client :** KB Medizintechnik  
**Site :** kbmedshop.ch  
**Outil cible :** Claude Design / Figma Make  

---

## Contexte

Site e-commerce B2B pour une entreprise suisse de vente de matériel médical professionnel, spécialisée en équipements ORL. Deux logiques de commande : paiement direct pour les consommables, devis pour les équipements. Interface interne simple pour la petite équipe (commandes, devis, RDV commerciaux).

---

## Prompt

```
Crée un site web complet pour KB Medizintechnik, entreprise suisse de vente 
de matériel médical professionnel spécialisée en équipements ORL 
(oto-rhino-laryngologie). Site : kbmedshop.ch

---

## IDENTITÉ VISUELLE

- Nom : KB Medizintechnik
- Palette : blanc pur (#FFFFFF), bleu médical (#0066CC), bleu foncé (#003D7A), 
  accents gris clair (#F5F7FA), textes #1A1A2E
- Typographie : sans-serif moderne (Inter ou Geist), hiérarchie claire
- Style : épuré, minimaliste médical, rassurant, professionnel
- Iconographie : ligne fine, style médical moderne
- Coins arrondis doux (8-12px), ombres légères, beaucoup d'espace blanc
- Langue principale : français (site suisse, prévoir DE/EN switchable)

---

## STRUCTURE DU SITE

### 1. Page d'accueil
- Header sticky : logo KB Medizintechnik + nav principale + 
  bouton "Commander" CTA bleu + bouton "Espace équipe" discret en haut à droite
- Hero section : accroche professionnelle, sous-titre, 
  CTA double ("Voir le catalogue" / "Demander un devis"), 
  visuel cabinet ORL moderne
- Bandeau de réassurance : livraison Suisse rapide, conseil expert, 
  certifications CE, SAV
- Catégories produits en grille illustrée : 
  ORL, audiologie, endoscopie, consommables, hygiène/protection
- Section "Pourquoi KB Medizintechnik" : 3-4 arguments clés avec icônes
- Marques partenaires (logos niveaux de gris)
- Témoignages de praticiens (médecins, cabinets, cliniques)
- Footer : liens rapides, contact, certifications, mentions légales, 
  adresse suisse

### 2. Page "L'entreprise"
- Histoire, valeurs, engagement qualité
- Certifications et agréments médicaux suisses
- Partenaires et marques distribuées
- Zone de couverture (Suisse + frontaliers)

### 3. Boutique / Catalogue
- Filtres : catégorie, marque, prix CHF, disponibilité stock
- Grille produits : photo, nom, référence, prix HT (CHF), 
  badge "Commande rapide" ou "Sur devis"
- Page produit individuelle :
  - Photos multiples
  - Description technique complète
  - Fiche technique PDF téléchargeable
  - Stock en temps réel
  - DOUBLE ACTION selon le type de produit :
    * Petits consommables (gants, compresses, etc.) : 
      "Ajouter au panier" → paiement direct en ligne (carte, TWINT, virement)
    * Équipements et commandes importantes : 
      "Ajouter au devis" → formulaire devis avec quantité, 
      livraison souhaitée, notes

### 4. Système de devis
- Page "Mon devis" : récapitulatif des produits ajoutés, 
  champs coordonnées cabinet/clinique, numéro de bon de commande optionnel, 
  message libre
- Envoi du devis par email à KB Medizintechnik + confirmation automatique 
  au client
- Design clair du formulaire, adapté aux professionnels de santé

### 5. Panier et Checkout (paiement direct)
- Panier simplifié
- Checkout : adresse de livraison, facturation, 
  modes de paiement (carte bancaire, TWINT, virement bancaire)
- Confirmation de commande par email
- Adapté aux petites commandes récurrentes (consommables)

### 6. Page Contact
- Formulaire de contact
- Numéro direct + email professionnel
- Prise de RDV pour visite commerciale (module calendrier ou lien externe)
- Adresse et zone d'intervention

---

## ESPACE ÉQUIPE (accès interne simplifié)

Login sécurisé, tout le personnel voit tout (pas de rôles différenciés).
Design cohérent avec le site, interface claire et lisible sur desktop et tablette.

### Dashboard
- KPIs simples : commandes du jour, CA du mois, 
  demandes de devis en attente, RDV à venir
- Liste des dernières commandes et demandes de devis récentes

### Module Commandes
- Liste toutes les commandes avec statut visuel 
  (en attente, confirmée, expédiée, livrée)
- Détail de chaque commande, possibilité de changer le statut
- Export simple

### Module Devis
- Liste des demandes de devis reçues
- Statut : nouveau, traité, converti en commande
- Accès aux coordonnées du client pour rappel ou email

### Module RDV Commerciaux
- Calendrier des RDV avec les cabinets et cliniques
- Fiche contact rapide : nom cabinet, téléphone, dernière commande, notes
- Ajout/modification de RDV

---

## CONTRAINTES TECHNIQUES

- Responsive mobile-first
- Tablette : dashboard lisible et utilisable par les commerciaux en déplacement
- Accessibilité : contrastes suffisants, textes lisibles
- Suisse : prix en CHF, mentions légales adaptées, TWINT comme option de paiement
- Performance : chargement rapide, images optimisées

---

## LIVRABLES

1. Toutes les pages listées
2. États des composants (hover, actif, vide, erreur)
3. Version mobile des pages principales du site public
4. Version desktop + tablette du dashboard interne
5. Composants réutilisables : boutons, cartes produit, formulaires, 
   badges statut, modales de confirmation
```
