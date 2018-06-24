# `{% css %}`

`{% css %}` タグは、ページの `<head>` に `<style>` タグを登録するために使用できます。

```css
{% css %}
 .content {
 color: {{ entry.textColor }};
 }
{% endcss %}
```

::: tip
タグを [yii\web\View::registerCss()](http://www.yiiframework.com/doc-2.0/yii-web-view.html#registerCss()-detail) の中で呼び出し、グローバルな `view` 変数経由でアクセスすることもできます。

```twig
{% set styles = ".content { color: #{entry.textColor}; }" %}
{% do view.registerCss(styles) %}
```

:::

## パラメータ

`{% css %}` タグは、次のパラメータをサポートしています。

### `with`

`<style>` タグに含めるべき、HTML 属性。

```twig
{% css with {type: 'text/css'} %}
```

属性は [yii\helpers\Html::renderTagAttributes()](http://www.yiiframework.com/doc-2.0/yii-helpers-basehtml.html#renderTagAttributes()-detail) によってレンダリングされます。

