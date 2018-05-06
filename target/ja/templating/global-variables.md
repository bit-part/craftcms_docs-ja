# グローバル変数

ありとあらゆるテンプレートでは、次の変数を読み込むことができます。

## `craft`

様々なヘルパーファンクションやオブジェクトのアクセスポイントを提供する [craft\web\twig\variables\CraftVariable](https://docs.craftcms.com/api/v3/craft-web-twig-variables-craftvariable.html) オブジェクト。

### `craft.app`

メインの [craft\web\Application](https://docs.craftcms.com/api/v3/craft-web-application.html) インスタンス（PHP コード内で `Craft::$app` と記述したときに取得できるもの）への参照は、`craft.app` 経由でテンプレートでも利用可能です。

> 【メモ】`craft.app` 経由でアクセスすることは、高度な進化だと考えられます。他の Twig 特有の変数やファンクションよりもセキュリティの上で意味があります。さらに、Craft のメジャーバージョン間で生じる互換性を破る変更に、テンプレートを反応させやすくするでしょう。

```twig
{% if craft.app.config.general.devMode %}
 <p>This site is running in Dev Mode.</p>
{% endif %}
```

## `currentSite`

[craft\models\Site](https://docs.craftcms.com/api/v3/craft-models-site.html) オブジェクトで表される、リクエストされたサイト。

```twig
{{ currentSite.name }}
```

現在のサイトと同じグループのすべてのサイトは、`currentSite.group.sites` 経由でアクセスすることができます。

```twig
<nav>
 <ul>
 {% for site in currentSite.group.sites %}
 <li><a href="{{ alias(site.baseUrl) }}">{{ site.name }}</a></li>
 {% endfor %}
 </ul>
</nav>
```

## `currentUser`

[craft\elements\User](https://docs.craftcms.com/api/v3/craft-elements-user.html) オブジェクトで表される、現在ログインしているユーザー。誰もログインしていない場合は、`null`。

```twig
{% if currentUser %}
 Welcome, {{ currentUser.friendlyName }}!
{% endif %}
```

## `loginUrl`

[loginPath](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#$loginPath-detail) コンフィグ設定に基づく、サイトのログインページの URL。

```twig
{% if not currentUser %}
 <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

## `logoutUrl`

[logoutPath](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#$logoutPath-detail) コンフィグ設定に基づく、Craft ユーザーのログアウト URL。ここに遷移した後、Craft はユーザーをホームページへ自動的にリダイレクトします。「ログアウト_ページ_」といったものはありません。

```twig
{% if currentUser %}
 <a href="{{ logoutUrl }}">Logout</a>
{% endif %}
```

## `now`

現在の日付と時刻がセットされた [DateTime](http://php.net/manual/en/class.datetime.php) オブジェクト。

```twig
Today is {{ now|date('M j, Y') }}.
```

## `POS_BEGIN`

定数 [craft\web\View::POS_BEGIN](https://docs.craftcms.com/api/v3/craft-web-view.html#constants) の Twig 対応のコピー。

## `POS_END`

定数 [craft\web\View::POS_END](https://docs.craftcms.com/api/v3/craft-web-view.html#constants) の Twig 対応のコピー。

## `POS_HEAD`

定数 [craft\web\View::POS_HEAD](https://docs.craftcms.com/api/v3/craft-web-view.html#constants) の Twig 対応のコピー。

## `POS_LOAD`

定数 [craft\web\View::POS_LOAD](https://docs.craftcms.com/api/v3/craft-web-view.html#constants) の Twig 対応のコピー。

## `POS_READY`

定数 [craft\web\View::POS_READY](https://docs.craftcms.com/api/v3/craft-web-view.html#constants) の Twig 対応のコピー。

## `siteName`

「設定 > サイト」で定義されている、サイトの名前。

```twig
<h1>{{ siteName }}</h1>
```

## `siteUrl`

サイトの URL。

```twig
<link rel="home" href="{{ siteUrl }}">
```

## `SORT_ASC`

PHP 定数 `SORT_ASC` の Twig 対応のコピー。

## `SORT_DESC`

PHP 定数 `SORT_DESC` の Twig 対応のコピー。

## `SORT_FLAG_CASE`

PHP 定数 `SORT_FLAG_CASE` の Twig 対応のコピー。

## `SORT_LOCALE_STRING`

PHP 定数 `SORT_LOCALE_STRING` の Twig 対応のコピー。

## `SORT_NATURAL`

PHP 定数 `SORT_NATURAL` の Twig 対応のコピー。

## `SORT_NUMERIC`

PHP 定数 `SORT_NUMERIC` の Twig 対応のコピー。

## `SORT_REGULAR`

PHP 定数 `SORT_REGULAR` の Twig 対応のコピー。

## `SORT_STRING`

PHP 定数 `SORT_STRING` の Twig 対応のコピー。

## `systemName`

「設定 > 一般」で定義されている、システム名。

## `view`

テンプレートを駆動している [craft\web\View](https://docs.craftcms.com/api/v3/craft-web-view.html) インスタンスへの参照。

## グローバル設定の変数

それそれのサイトの[グローバル設定](../globals.md)は、ハンドルにちなんで命名されたグローバル変数としてテンプレートで利用可能です。

それらは、[craft\elements\GlobalSet](https://docs.craftcms.com/api/v3/craft-elements-globalset.html) オブジェクトとして表されます。

```twig
<p>{{ companyInfo.companyName }} was established in {{ companyInfo.yearEstablished }}.</p>
```

