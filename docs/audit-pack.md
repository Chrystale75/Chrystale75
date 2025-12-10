# Pack d’audit exportable (PDF/ZIP)

Spécifications pour générer un pack complet incluant les preuves, le journal d’audit, les procédures et les bilans.

## Contenu minimum
- **Résumé exécutif** : objectifs, périmètre, dates clés, équipe.
- **Journal d’audit** : traçabilité des actions (création/validation de preuves, changements d’état des indicateurs).
- **Preuves** : pièces jointes et liens exportés en structure arborescente par critère/indicateur.
- **Procédures** : documents à jour (gestion des réclamations, accessibilité, amélioration continue).
- **Bilans et constats** : synthèse des écarts, risques, actions correctives et dates cibles.

## Format d’export
- **ZIP** :
  - `index.pdf` (ou `index.html` si rendu web avant conversion) comme porte d’entrée.
  - Dossiers `preuves/<critere>/<indicateur>/` pour les pièces.
  - Fichier `journal.csv` ou `journal.json` pour le log horodaté.
  - Dossier `procedures/` pour les procédures officielles.
- **PDF** :
  - Généré à partir du rendu HTML du tableau de bord et des bilans.
  - Table des matières, pagination, horodatage et signature numérique optionnelle.

## Génération
- Bouton « Exporter le pack d’audit » accessible depuis le tableau de bord.
- Tâche asynchrone (file de messages) pour éviter les timeouts sur de gros volumes.
- Statut d’export affiché dans l’UI avec lien de téléchargement à expiration contrôlée.

## Sécurité et traçabilité
- Accès restreint aux rôles « Auditeur » et « Administrateur ».
- Chaque export enregistre : utilisateur, date, périmètre, statut, URL du paquet généré.
- Hash des fichiers (SHA-256) dans un manifeste pour garantir l’intégrité.

## Tests d’acceptation
- Génération ZIP contenant au moins un critère avec indicateurs et preuves.
- Journal d’audit exporté et lisible.
- Procédures incluses et horodatage cohérent.
- Téléchargement contrôlé par permissions.
