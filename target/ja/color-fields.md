色フィールド
============

色フィールドでは、現在のカラーのプレビューが付いた16進数のカラー入力を提供します。`<input type="color">` をサポートしているブラウザでは、プレビューのクリックでブラウザのカラーピッカーを開きます。

## テンプレート記法

テンプレート内でカラーフィルドを呼び出すと、[craft\fields\data\ColorData](https://docs.craftcms.com/api/v3/craft-fields-data-colordata.html) オブジェクトが返ります。カラーが選択されていなければ、`null` を返します。

```twig
{% if entry.linkColor %}
 <style type="text/css">
 .content a {
 color: {{ entry.linkColor.getHex() }};
 }
 </style>
{% endif %}
```

