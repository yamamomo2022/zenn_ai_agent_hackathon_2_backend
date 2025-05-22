# GitHub Actions 自動デプロイフロー

このドキュメントでは、本プロジェクトで実装されている GitHub Actions を使用した自動デプロイフローについて説明します。

## 概要

GitHub Actions を使用して、`main` ブランチへのマージをトリガーに Firebase Functions を自動的にデプロイするワークフローを実装しています。これにより、手動でのデプロイ作業が不要になり、開発効率が向上します。

## ワークフローの詳細

自動デプロイのワークフローは `.github/workflows/deploy.yml` ファイルで定義されています。

### トリガー

以下のイベントが発生した際にワークフローが実行されます：

- `main` ブランチへのプッシュ（マージを含む）
- 手動実行（GitHub Actions インターフェースから）

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:  # 手動実行を有効化
```

### 実行環境

ワークフローは Ubuntu の最新バージョン上で実行されます：

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
```

### 実行ステップ

ワークフローは以下のステップで構成されています：

1. **リポジトリのチェックアウト**：
   - 最新のコードをチェックアウトします

2. **Node.js のセットアップ**：
   - Node.js v22 をインストールします
   - npm のキャッシュを設定して依存関係のインストールを高速化します

3. **依存関係のインストール**：
   - `functions` ディレクトリ内で `npm ci` を実行して依存関係をインストールします

4. **Firebase CLI のインストール**：
   - Firebase コマンドラインツールをグローバルにインストールします

5. **Firebase Functions のデプロイ**：
   - `firebase deploy --only functions` コマンドを実行してデプロイを行います
   - このステップでは、`firebase.json` に定義されている predeploy スクリプト（lint と build）も自動的に実行されます

## 必要な環境変数とシークレット

ワークフローを正常に実行するには、以下の GitHub Secrets を設定する必要があります：

- `FIREBASE_TOKEN`：Firebase CLI の認証トークン
  - 取得方法：`firebase login:ci` コマンドを実行して取得できます

- `GOOGLE_GENAI_API_KEY`：Google Generative AI API キー
  - プロジェクトで使用している Google Generative AI の API キー

## シークレットの設定方法

1. GitHub リポジトリの "Settings" タブに移動
2. 左側のメニューから "Secrets and variables" > "Actions" を選択
3. "New repository secret" ボタンをクリックして必要なシークレットを追加

## トラブルシューティング

デプロイに失敗した場合は、以下を確認してください：

1. GitHub Actions のログを確認して具体的なエラーメッセージを特定する
2. 必要なシークレットが正しく設定されているか確認する
3. `firebase.json` の設定が正しいか確認する
4. ローカル環境で `firebase deploy --only functions` コマンドを実行して、同じエラーが発生するか確認する

## 手動デプロイ

自動デプロイが失敗した場合や、特定のバージョンをデプロイしたい場合は、従来通り手動でデプロイすることも可能です：

```bash
firebase deploy --only functions
```