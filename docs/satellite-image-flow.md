# 地名から衛星画像を取得する Genkit Flow

このドキュメントでは、地名から座標を生成AIで取得し、その座標から衛星画像を取得する Genkit Flow の使用方法について説明します。

## 概要

このフローは以下の処理を行います：

1. 入力された地名を生成AI（Gemini）を使用して緯度・経度に変換
2. 取得した座標を使用して Google Static Maps API から衛星画像を取得
3. 衛星画像のURL、座標情報、および元の地名を返却

## 使用方法

### Firebase Functions として呼び出す

```javascript
// クライアントサイドのコード例
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const getSatelliteImage = httpsCallable(functions, "GetSatelliteImage");

// 基本的な使用法
getSatelliteImage({ placeName: "東京タワー" })
  .then((result) => {
    const data = result.data;
    console.log("画像URL:", data.imageUrl);
    console.log("座標:", data.coordinates);
  })
  .catch((error) => {
    console.error("エラー:", error);
  });

// オプションパラメータを指定する場合
getSatelliteImage({
  placeName: "富士山",
  zoom: 12,        // ズームレベル（1-21）
  mapType: "hybrid", // "satellite" または "hybrid"
  size: "800x600"  // 画像サイズ（幅x高さ）
})
  .then((result) => {
    // 結果の処理
  });
```

### 入力パラメータ

| パラメータ | 型 | 必須 | デフォルト値 | 説明 |
|------------|------|----------|--------------|-------------|
| placeName | string | はい | - | 衛星画像を取得したい場所の名前 |
| zoom | number | いいえ | 15 | ズームレベル（1-21）。値が大きいほど拡大表示 |
| mapType | string | いいえ | "satellite" | マップタイプ。"satellite"（衛星画像のみ）または"hybrid"（衛星画像+道路名など） |
| size | string | いいえ | "600x400" | 画像サイズ（幅x高さ）をピクセル単位で指定 |

### 出力データ

```typescript
{
  imageUrl: string;       // 衛星画像のURL
  coordinates: {
    latitude: number;     // 緯度
    longitude: number;    // 経度
    confidence: "high" | "medium" | "low";  // 座標の信頼度
    placeName: string;    // AIが理解した地名
  };
  originalPlaceName: string;  // 元の入力地名
}
```

## 注意事項

1. 座標変換は生成AIを使用しているため、精度は完璧ではありません。特に曖昧な地名や複数存在する地名の場合は注意が必要です。
2. Google Static Maps APIは無料利用の場合、1日あたりのリクエスト数に制限があります。
3. 本番環境での利用には、Google Maps Platform APIキーの取得と設定が推奨されます。

## テスト方法

リポジトリに含まれるテストスクリプトを使用して機能をテストできます：

```bash
cd functions
npm run test:satellite
```

## 将来の改善点

- 外部のジオコーディングAPIを使用した高精度な座標取得
- 画像のキャッシュ機能
- 複数の衛星画像プロバイダ対応