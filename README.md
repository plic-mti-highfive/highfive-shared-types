# 📦 HighFive Shared Types

Ce dépôt contient l'ensemble des interfaces, types et enums TypeScript partagés pour tout l'écosystème HighFive (Frontend React, Backend NestJS, Backend Hocuspocus).

**L'objectif :** Avoir une source unique de vérité. Si un modèle de base de données ou un payload WebSocket change, tout le monde est au courant instantanément grâce au compilateur TypeScript.

## 🚀 1. Configuration Locale (Pré-requis)

Ce paquet est **privé** et hébergé sur le registre de GitHub Packages (pas sur le registre public NPM).
Pour pouvoir l'installer sur votre machine, vous devez configurer `pnpm` avec un jeton d'accès GitHub.

### Étape A : Créer un Personal Access Token (PAT)

1. Allez sur GitHub > Settings > Developer settings > Personal access tokens > **Tokens (classic)**.
2. Cliquez sur **Generate new token (classic)**.
3. Nommez-le (ex: `HighFive Local Dev`).
4. Cochez **UNIQUEMENT** la permission `read:packages`.
5. Générez et copiez le token (il commence par `ghp_...`).

### Étape B : Configurer votre machine (Une fois pour toutes)

Pour ne jamais risquer de commit votre token par erreur, nous allons le configurer **globalement** sur votre ordinateur.

Ouvrez votre terminal et éditez le fichier de configuration global de NPM (situé dans votre dossier utilisateur) :

- Sur Mac/Linux : `nano ~/.npmrc`
- Sur Windows : Éditez `C:\Users\VotreNom\.npmrc`

Ajoutez ces deux lignes exactes en remplaçant par votre token :

```text
@plic-mti-highfive:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ghp_VOTRE_TOKEN_ICI
```

## 💻 2. Installation dans vos projets

Une fois votre PC configuré, allez dans votre projet (Front ou Back) et lancez :

```bash
pnpm add @plic-mti-highfive/shared-types
```

**Utilisation dans le code :**

```typescript
import { UserRole, CanvasTokenPayload } from '@plic-mti-highfive/shared-types'
```

## 🛠️ 3. Comment ajouter ou modifier des types ?

1. Clonez ce dépôt sur votre machine.
2. Modifiez ou ajoutez vos types dans le dossier `src/`.
3. Assurez-vous d'exporter vos nouveaux types dans les fichiers `index.ts` (système de _Barrel exports_).
4. **Mettez à jour la version** dans le `package.json` (ex: passage de `1.0.0` à `1.0.1`).
5. Commitez et pushez sur `main`.

🤖 **Magie de la CI/CD :** Vous n'avez rien d'autre à faire. GitHub Actions va automatiquement compiler le TypeScript et publier la nouvelle version sur GitHub Packages.

---

## 🐳 4. Build Docker en local

Nos applications utilisent Docker. Pour des raisons de sécurité, nous utilisons **Docker BuildKit (secrets)** pour ne laisser aucune trace du token dans l'image finale.

Si vous devez faire un `docker build` en local sur une application qui dépend de `shared-types` (ex: le backend), Docker aura besoin de votre token pour passer la barrière GitHub.

**Comment build en local :**

1. Exposez votre token GitHub dans votre terminal :

```bash
export GITHUB_TOKEN="ghp_VOTRE_TOKEN_ICI"
```

2. Lancez le build en passant le token comme secret BuildKit :

```bash
docker build --secret id=github_token,env=GITHUB_TOKEN -t nom-de-votre-image .
```

_(Note : En CI/CD sur GitHub Actions, cette étape est 100% automatisée via les permissions inter-dépôts, vous n'avez rien à configurer)._
