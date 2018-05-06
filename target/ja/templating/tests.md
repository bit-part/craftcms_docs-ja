# テスト

[Twig に付随する](http://twig.sensiolabs.org/doc/tests/index.html)テンプレートタグに加えて、Craft がいくつか独自のものを提供します。

## `instance of`

オブジェクトが別のオブジェクトまたはクラスのインスタンスかどうかを返します。

```twig
{% if element is instance of 'craft\\elements\\Entry' %}
 <h1>{{ entry.title }}</h1>
{% endif %}
```

## `missing`

指定されたオブジェクトが [MissingComponentInterface](https://docs.craftcms.com/api/v3/craft-base-missingcomponentinterface.html) のインスタンスかどうかを返します。型が見つからないコンポーネントを表すために使用されるインターフェースです。

```twig
{% if field is missing %}
 <p>😱</p>
{% endif %}
```

