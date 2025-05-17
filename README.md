# zenn_ai_agent_hackathon_2_backend
zenn_ai_agent_hackathon_2のバックエンドです。

```bash
gcloud auth login
gcloud config set project <projectID>
export GOOGLE_GENAI_API_KEY=<apikey>
```

## 実行コマンド

```bash
npx ts-node src/index.ts
```

## デプロイコマンド

```bash
firebase deploy --only functions
```

## 通信

```bash
curl -X POST https://your-webapp \
-H "Content-Type: application/json" \
-d '{"data":{}}'
```
