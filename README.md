# zenn_ai_agent_hackathon_2_backend
zenn_ai_agent_hackathon_2のバックエンドです。

```bash
gcloud auth login
gcloud config set project <projectID>
export GOOGLE_GENAI_API_KEY=<apikey>
```

## 機能

### 画像生成 (Imagen 3)

テキストプロンプトから高品質な画像を生成するAPIを提供しています。詳細は[画像生成ドキュメント](./docs/image-generation.md)を参照してください。

#### 使用例

```typescript
// クライアントアプリケーションからの呼び出し例
const result = await generateImage({
  prompt: "桜の咲く日本庭園、池には鯉が泳いでいる、写実的なスタイル"
});
console.log(result.imageUrl); // 生成された画像のURL
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
