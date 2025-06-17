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

## 機能一覧

### 地域名称から座標（緯度・経度）を取得

地域名称（地名）を入力として、生成AIを利用して緯度・経度を取得します。

#### リクエスト例

```bash
curl -X POST https://your-webapp/GetLocationCoordinates \
-H "Content-Type: application/json" \
-d '{"data":{"locationName":"東京タワー"}}'
```

#### レスポンス例

```json
{
  "locationName": "東京タワー",
  "latitude": 35.6586,
  "longitude": 139.7454
}
```

#### テスト実行

テストスクリプトを実行して機能を確認できます：

```bash
cd functions
npx ts-node tests/locationToCoordinatesTest.ts
```
