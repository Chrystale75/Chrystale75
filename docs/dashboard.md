# Tableau de bord par critère/indicateur

Ce document définit la structure du tableau de bord permettant de suivre chaque critère et indicateur avec un état et des liens vers les preuves associées.

## Structure des données
- **Critère** : groupe d'indicateurs (ex. « Gouvernance », « Sécurité », « Accessibilité »).
- **Indicateur** : élément mesurable rattaché à un critère.
- **États possibles** :
  - `OK` : conforme avec preuve validée.
  - `À compléter` : informations ou preuves manquantes.
  - `Risque` : non-conformité ou dérive identifiée.
- **Preuve** : fichier, lien ou entrée de journal d'audit justifiant l'état.

## Modèle technique recommandé
| Champ                 | Type              | Notes |
|-----------------------|-------------------|-------|
| `id`                  | UUID              | Identifiant unique de l'indicateur |
| `critere`             | string            | Clé du critère |
| `intitule`            | string            | Nom de l'indicateur |
| `description`         | text              | Rappel du besoin et du contrôle |
| `etat`                | enum              | `OK`, `À compléter`, `Risque` |
| `justification`       | text              | Commentaire court expliquant l'état |
| `preuveUrls`          | array<string>     | Liens vers fichiers ou entrées du journal d'audit |
| `responsable`         | string            | Personne en charge de l'indicateur |
| `dateMiseAJour`       | datetime          | Horodatage de la dernière mise à jour |

## Expérience utilisateur
- Vue en tableau filtrable par critère, état, responsable et date de mise à jour.
- Couleurs :
  - Vert pour `OK`
  - Orange pour `À compléter`
  - Rouge pour `Risque`
- Chaque ligne offre un bouton « Voir preuves » ouvrant la liste des pièces (fichiers, liens, références de journal d'audit).
- Bouton « Ajouter/Mettre à jour » pour modifier l'état, la justification et rattacher des preuves.
- Export CSV/Excel du tableau filtré pour partage rapide.

## Règles métiers
- Un indicateur marqué `OK` doit contenir au moins une preuve validée.
- Un indicateur en `Risque` doit avoir une action corrective renseignée et une date cible.
- Historiser les changements d'état dans le journal d'audit (utilisateur, date, ancien/nouvel état, commentaire).

## Intégration avec les preuves
- Les liens de preuves doivent pointer vers :
  - Le pack d’audit exportable (PDF/ZIP) quand le fichier est déjà archivé.
  - Les pièces jointes stockées (ex. S3, dossier partagé) avec contrôle d'accès.
  - Les entrées du journal d'audit pour tracer les validations.

## Indicateurs suggérés
- Gouvernance : existence du responsable conformité, cycle de revue trimestriel.
- Accessibilité : taux de pages conformes RGAA, rapport d’audit, plan d'action.
- Sécurité : journalisation active, politique de mots de passe, sauvegardes testées.
- Satisfaction : délai de traitement des réclamations, taux de résolution.
