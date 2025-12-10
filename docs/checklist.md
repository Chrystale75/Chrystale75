# Checklist d’audit interne

Cette checklist structurée permet d’assigner des actions, suivre les échéances et tracer l’avancement.

## Modèle de données
| Champ                | Type            | Notes |
|----------------------|-----------------|-------|
| `id`                 | UUID            | Identifiant unique de la tâche |
| `categorie`          | string          | Ex. Préparation, Conduite, Clôture |
| `intitule`           | string          | Tâche à réaliser |
| `description`        | text            | Détails et attentes |
| `responsable`        | string          | Personne assignée |
| `echeance`           | date            | Date limite |
| `priorite`           | enum            | Basse / Normale / Haute |
| `statut`             | enum            | `À faire`, `En cours`, `Bloqué`, `Fait` |
| `preuves`            | array<string>   | URLs ou identifiants de preuves |
| `commentaires`       | text            | Notes de suivi |
| `dateMiseAJour`      | datetime        | Pour l’historique |

## Workflow
1. Création depuis le tableau de bord ou une vue dédiée « Audit interne ».
2. Assignation obligatoire avec notification (email/Slack) et échéance.
3. Suivi visuel : Kanban ou tableau filtrable par responsable, statut et échéance.
4. Rappel automatique 48h avant l’échéance ; escalade si en retard.
5. Chaque clôture de tâche doit référencer au moins une preuve ou un commentaire justifiant la validation.

## Exemples de tâches
- Préparation : définir le périmètre, collecter les politiques applicables, planifier les interviews.
- Conduite : vérifier les journaux, tester les contrôles d’accès, valider les sauvegardes.
- Clôture : rédiger le bilan, valider les actions correctives, archiver le pack d’audit.

## Critères de succès
- 100 % des tâches critiques atteintes avant la date d’audit.
- Aucun élément marqué « Bloqué » plus de 3 jours sans commentaire.
- Correspondance entre checklist et indicateurs du tableau de bord.
