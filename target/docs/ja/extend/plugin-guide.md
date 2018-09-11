# How to Build a Plugin

[[toc]]

## 準備

プラグイン作成に取り組む前に、いくつかのことを決めておく必要があります。

- **Package name** – Used to name your Composer package for the plugin. （詳細については、[documentation][package name] を参照してください。）これが Craft のプラグインだと識別する手助けになるため、2番目のセグメント（`/` の後）に接頭辞 `craft-` を付けることをお勧めします。例えば `pixelandtonic/craft-recipes` のような形です。
- **Namespace** – The root namespace that your plugin’s classes will live in. （詳細については、[PSR-4] オートローディング仕様を参照してください。）これは `craft\` ではじめるべき *ではない* ことに注意してください。あなたやデベロッパーを識別する何かを使用してください。
- **プラグインハンドル** – Craft のエコシステム内でプラグインを一意に識別する何か。（プラグインハンドルは、文字ではじまり、小文字の英字、数字、および、ダッシュのみでなければなりません。`kebab-cased` にすべきです。）
- **プラグイン名** – コントロールパネル内でプラグインを何と呼ぶか。

## 基本ファイル構造の設定

プラグインを作るため、コンピュータのどこかに新しいディレクトリを作成してください。一般的なアプローチは、Craft プロジェクトと並ぶ `~/dev/` フォルダに保管することです。

```
~/dev/
├── my-project.test/
│   └── ...
└── my-plugin/
    ├── CHANGELOG.md
    ├── LICENSE.md
    ├── README.md
    ├── composer.json
    └── src/
        └── Plugin.php
```

The name of your plugin directory doesn’t matter. 簡単に識別できるものを選んでください。

::: tip
数クリックでプラグインの土台を作成できる [pluginfactory.io](https://pluginfactory.io/) を利用してください。
:::

## composer.json

Create a `composer.json` file at the root of your plugin directory, and use this template as a starting point:

```json
{
  "name": "package/name",
  "description": "Your plugin’s package description",
  "version": "1.0.0",
  "type": "craft-plugin",
  "keywords": ["some", "keywords", "here"],
  "license": "MIT",
  "authors": [
    {
      "name": "Developer Name",
      "homepage": "https://developer-website.tld"
    }
  ],
  "support": {
    "email": "email@developer-website.tld",
    "issues": "https://github.com/developer/repo/issues?state=open",
    "source": "https://github.com/developer/repo",
    "docs": "https://github.com/developer/repo"
  },
  "require": {
    "craftcms/cms": "^3.0.0"
  },
  "autoload": {
    "psr-4": {
      "namespace\\prefix\\": "src/"
    }
  },
  "extra": {
    "handle": "plugin-handle",
    "name": "Plugin Name"
  }
}
```

次の項目を置き換えてください。

- `package/name` をパッケージ名にします。
- `Developer Name` をあたなの名前、または、プラグインが帰属する組織名にします。
- `https://developer-website.tld` with the URL to the website the developer name should link to in the Control Panel.
- `email@developer-website.tld` with your support email.
- `developer/repo` with the actual GitHub account and repository names where the plugin will live.
- `namespace\\prefix\\` with your namespace prefix. (Use double-backslashes because this is JSON, and note this must end with `\\`.)
- `plugin-handle` をプラグインハンドルにします。
- `Plugin Name` をプラグイン名にします。

If you’d prefer to release your plugin with the [Craft license](https://craftcms.github.io/license/) rather than [MIT](https://opensource.org/licenses/MIT), change the `license` value to `"proprietary"`.

`extra` オブジェクトにセットできるプロパティの完全なリストは、次の通りです。

- `handle` – The plugin handle _(required)_.
- `class` – The [Plugin class](#the-plugin-class) name. 設定されていない場合、インストーラーはそれぞれの `autoload` パスのルートで `Plugin.php` ファイルを探します。
- `basePath` – プラグインのソースファイルへのベースパス。[Yii alias]（例： `@vendorname/foo`） としてフォーマットされた `autoload` 名前空間の1つからはじめることができます。設定されてない場合、プライマリプラグインクラスを含むディレクトリが使用されます。
- `name` – プラグイン名。設定されていない場合、（ベンダー接頭辞なしの）パッケージ名が使用されます。
- `version` - プラグインのバージョン。設定されていない場合、現在のパッケージバージョンが使用されます。
- `schemaVersion` – プラグインスキーマのバージョン。
- `description` – プラグインの説明。設定されていない場合、メインの `description` プロパティが使用されます。
- `developer` – 開発者の名前。設定されていない場合、（`authors` プロパティ経由で）最初の作者の `name` が使用されます。
- `developerUrl` – 開発者の URL。設定されていない場合、`homepage` プロパティ、または、（`authors` プロパティ経由で）最初の作者の `homepage` が使用されます。
- `developerEmail` – サポートのメールアドレス。設定されていない場合、`support.email` プロパティが使用されます。
- `documentationUrl` – プラグインのドキュメントの URL。設定されていない場合、`support.docs` プロパティが使用されます。
- `sourceLanguage` – プラグインのソース言語（デフォルトは `en-US`）。
- `hasSettings` – プラグインの設定があるかどうか（`true` または `false`）。
- `hasCpSection` – コントロールパネルにプラグイン独自のセクションを持つかどうか（`true` または `false`）。
- `components` – プラグイン上に存在するべき [component configs] を定義するオブジェクト。

::: tip
Composer が厳密に要求しているわけではありませんが、プラグインを開発する際にいくつかのことが簡単に行えるよう、`composer.json` へ明示的に `version` を設定することをお勧めします。そして、アップデートし続けることを忘れないでください！
:::

::: warning
If you’re updating a Craft 2 plugin, make sure to remove the `composer/installers` dependency if it has one.
:::

## The Plugin Class

The `src/Plugin.php` file is your plugin’s entry point for the system. すべてのリクエスト開始時に、インスタンスが作られます。`init()` メソッドはイベントリスナーやそれ自体の初期化を必要とする他のステップを登録するのに最適な場所です。

このテンプレートを `Plugin.php` ファイルの出発点として使用してください。

```php
<?php
namespace ns\prefix;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        parent::init();

        // Custom initialization code goes here...
    }
}
```

`ns\prefix` を実際のプラグインの名前空間接頭辞に置き換えてください。

## Craft プロジェクトへのプラグインの読み込み

Craft にプラグインを表示するには、Craft プロジェクトの Composer 依存としてインストールする必要があります。そのためには複数の方法があります。

### Path Repository

開発中にプラグインを動作させる最も簡単な方法は、他の依存関係と同様に `vendor/` フォルダへシンボリックリンクするよう Composer に伝える [path repository][path] を利用することです。

設定するには、Craft プロジェクトの `composer.json` ファイルを開き、次の変更を加えます。

- [minimum-stability](https://getcomposer.org/doc/04-schema.md#minimum-stability) を `"dev"` に設定します。
- [prefer-stable](https://getcomposer.org/doc/04-schema.md#prefer-stable) を `true` に設定します。
- 新しく [path repository](https://getcomposer.org/doc/05-repositories.md#path) レコードを追加し、プラグインのルートディレクトリを指定します。

```json
{
  "minimum-stability": "dev",
  "prefer-stable": true,
  "repositories": [
    {
      "type": "path",
      "url": "../my-plugin"
    }
  ]
}
```

::: tip
`url` 値にプラグインのソースディレクトリを絶対パスまたは相対パスで設定します。（サンプルの `../my-plugin` は、プロジェクトフォルダーと並んでプラグインのフォルダが存在することを前提としています。）
:::

ターミナル上で Craft プロジェクトへ移動し、Composer にプラグインの追加を伝えてください。（`composer.json` ファイルでプラグインに付けたパッケージ名と同じものを使用してください。）

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

Composer のインストールログは、シンボリックリンク経由でパッケージがインストールされたことを表示するでしょう。

```
- Installing package/name (X.Y.Z): Symlinking from ../my-plugin
```

::: warning
One caveat of `path` Composer repositories is that Composer may ignore `path`-based dependencies when you run `composer update`. So any time you change anything in `composer.json`, such as your plugin’s dependency requirements or its plugin information, you might need to completely remove and re-require your plugin in your project for those changes to take effect.

```bash
# go to the project directory
cd /path/to/my-project.test

# remove the plugin package
composer remove package/name

# re-require the plugin package
composer require package/name
```

:::

### Packagist

プラグインを一般公開する準備ができたら、新しい Composer パッケージを [Packagist](https://packagist.org/) に登録してください。そうすれば、Composer の `require` コマンドにパッケージ名を渡すだけで、他のパッケージと同様にインストールできます。

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

## プラグインアイコン

プラグインは「設定 > プラグイン」ページに表示されるアイコンを提供できます。

![The Settings → Plugins page in Craft’s Control Panel.](../images/plugin-index.png)

プラグインアイコンは、プラグインのソースディレクトリ（例：`src/`）のルートに `icon.svg` として保存された、正方形の SVG ファイルでなければいけません。

プラグインが [コントロールパネルのセクション](cp-section.md) を持つ場合は、プラグインのソースディレクトリのルートに `icon-mask.svg` ファイルを保存することによって、グローバルナビゲーション項目にカスタムアイコンを付けることもできます。このアイコンにはストロークを含めることができず、常に（アルファ透明度に関して）ソリッドカラーで表示されることに注意してください。

[Yii Modules]: https://www.yiiframework.com/doc/guide/2.0/en/structure-modules
[models]: https://www.yiiframework.com/doc/guide/2.0/en/structure-models
[active record classes]: https://www.yiiframework.com/doc/guide/2.0/en/db-active-record
[controllers]: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
[application components]: https://www.yiiframework.com/doc/guide/2.0/en/structure-application-components
[package name]: https://getcomposer.org/doc/04-schema.md#name
[two hardest things]: https://twitter.com/codinghorror/status/506010907021828096
[PSR-4]: https://www.php-fig.org/psr/psr-4/
[Yii alias]: https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases
[component configs]: https://www.yiiframework.com/doc/guide/2.0/en/structure-application-components
[path]: https://getcomposer.org/doc/05-repositories.md#path

