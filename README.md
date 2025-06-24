# zenn_ai_agent_hackathon_2_backend
zenn_ai_agent_hackathon_2のバックエンドです。

```bash
gcloud auth login
gcloud config set project <projectID>
export GOOGLE_GENAI_API_KEY=<apikey>
export GOOGLE_MAPS_API_KEY=<your_maps_api_key>
firebase functions:secrets:set GOOGLE_MAPS_API_KEY
```

## 実行コマンド

```bash
npx ts-node src/index.ts
```

## デプロイコマンド

```bash
firebase deploy --only functions
```

## 自動デプロイ

このリポジトリでは、GitHub Actions を使用して自動デプロイが設定されています。`main` ブランチにマージされると、Firebase Functions が自動的にデプロイされます。

### 必要な GitHub Secrets

自動デプロイを機能させるには、以下の GitHub Secrets を設定する必要があります：

- `FIREBASE_TOKEN`: Firebase CLI の認証トークン（`firebase login:ci` コマンドで取得）
- `GOOGLE_GENAI_API_KEY`: Google Generative AI API キー

### GitHub Secrets の設定方法

1. リポジトリの Settings タブに移動
2. 左側のメニューから "Secrets and variables" > "Actions" を選択
3. "New repository secret" ボタンをクリックして必要なシークレットを追加

## 通信

```bash
curl -X POST https://your-webapp \
-H "Content-Type: application/json" \
-d '{"data":{}}'
```
