# エレメントクエリ

エレメントクエリは、Craft でエレメントを取得するためにチューニングされた[クエリビルダー](http://www.yiiframework.com/doc-2.0/guide-db-query-builder.html)です。いくつのカスタムパラメータがあり、エレメントを取得するのに必要な実際の SQL クエリの複雑さをすべて抽象化します。生データでなく、エレメントモデルを返します。

## エレメントクエリの作成

PHP と Twig 両方のコードで、エレメントクエリを作成できます。次の通りです。

| エレメントタイプ | PHP | Twig |
| ------------- | ------------------------------------- | ---------------------- |
| アセット | `\craft\elements\Asset::find()` | `craft.assets()` |
| カテゴリ | `\craft\elements\Category::find()` | `craft.categories()` |
| エントリ | `\craft\elements\Entry::find()` | `craft.entries()` |
| 行列ブロック | `\craft\elements\MatrixBlock::find()` | `craft.matrixBlocks()` |
| タグ | `\craft\elements\Tag::find()` | `craft.tags()` |
| ユーザー | `\craft\elements\User::find()` | `craft.users()` |

## パラメータの設定

作成したエレメントクエリには、パラメータをセットすることができます。

利用可能なパラメータは、エレメントタイプによって異なります。Craft の組み込みエレメントタイプでサポートされているパラメータの一覧は、次の通りです。

- [アセット](element-query-params/asset-query-params.md)
- [カテゴリ](element-query-params/category-query-params.md)
- [エントリ](element-query-params/entry-query-params.md)
- [行列ブロック](element-query-params/matrix-block-query-params.md)
- [タグ](element-query-params/tag-query-params.md)
- [ユーザー](element-query-params/user-query-params.md)

パラメータは、次のように連結したメソッドコールとしてセットする必要があります。

#### PHP

```php
use craft\elements\Entry;

$query = Entry::find()
 ->section('news')
 ->limit(10);
```

#### Twig

```twig
{% set query = craft.entries()
 .section('news')
 .limit(10) %}
```

### パラメータの一括設定

次のように、パラメータを一括設定することもできます。

#### PHP

```php
use craft\elements\Entry;

$query = Entry::find();
\Craft::configure($query, [
 'section' => 'news',
 'limit' => 10
]);
```

#### Twig

```twig
{% set query = craft.entries({
 section: 'news',
 limit: 10
}) %}
```

### パラメータ値の構文

ほんとんどのパラメータ値は、エレメントクエリの条件として適用される前に、[craft\helpers\Db::parseParam()](https://docs.craftcms.com/api/v3/craft-helpers-db.html#parseParam()-detail) を通して処理されます。そのメソッドは、次のようなことを可能にします。

- `['and', 'value1', 'value2']`
- `['or', 'value1', 'value2']`
- `['value1', 'value2']` _（暗黙の `'or'`）_
- `':empty:` _（`null`、または、空の文字列かどうかのチェック）_
- `':notempty:'` _（`':empty:'` の反対）_
- `'not value'`
- `'!= value'`
- `'<= value'`
- `'>= value'`
- `'< value'`
- `'> value'`
- `'= value'`
- `'*value*'`
- `'not *value*'`

### カスタムフィールドのパラメータ

コアのパラメータに加えて、ほとんどのカスタムフィールドは独自のパラメータもサポートしています。

```twig
{% set query = craft.entries()
 .section('news')
 .myCustomFieldHandle('param-value')
 .all() %}
``

## Executing Element Queries

Once you’ve defined your parameters on the query, there are multiple methods available to execute it, depending on the data you need back.

### `exists()`

Returns whether any elements match the query.

#### PHP

```php
use craft\elements\Entry;

$exists = Entry::find()
 ->section('news')
 ->slug('hello-world')
 ->exists();
```

#### Twig

```twig
{% set exists = craft.entries()
 .section('news')
 .slug('hello-world')
 .exists() %}
```

### `count()`

クエリにマッチしたエレメントの総数を返します。

#### PHP

```php
use craft\elements\Entry;

$count = Entry::find()
 ->section('news')
 ->count();
```

#### Twig

```twig
{% set count = craft.entries()
 .section('news')
 .count() %}
```

### `all()`

配列内のすべてのエレメントを返します。

> 【メモ】 `asArray` パラメータを `true` にセットしている場合、エレメントはエレメントオブジェクトではなく、生の配列として表されます。

#### PHP

```php
use craft\elements\Entry;

$entries = Entry::find()
 ->section('news')
 ->limit(10)
 ->all();
```

#### Twig

```twig
{% set entries = craft.entries()
 .section('news')
 .limit(10)
 .all() %}
```

### `one()`

最初にマッチするエレメントを返します。存在しない場合は、`null` を返します。

> 【メモ】`asArray` パラメータが `true` にセットされている場合エレメントはエレメントオブジェクトではなく、生の配列として表されます。

#### PHP

```php
use craft\elements\Entry;

$entry = Entry::find()
 ->section('news')
 ->slug('hello-world')
 ->one();
```

#### Twig

```twig
{% set entry = craft.entries()
 .section('news')
 .slug('hello-world')
 .one() %}
```

### `nth()`

マッチした `n` 番目のエレメントを返します。存在しない場合は、`null` を返します。`n` は 0 からはじまるため、`nth(0)` は最初のエレメントを `nth(1)` は2番目のエレメントを取得する点に注意してください。

> 【メモ】`asArray` パラメータが `true` にセットされている場合エレメントはエレメントオブジェクトではなく、生の配列として表されます。

#### PHP

```php
use craft\elements\Entry;

$entry = Entry::find()
 ->section('news')
 ->nth(4);
```

#### Twig

```twig
{% set entry = craft.entries()
 .section('news')
 .nth(4) %}
```

### `ids()`

マッチしたエレメントの ID の配列を返します。

#### PHP

```php
use craft\elements\Entry;

$entryIds = Entry::find()
 ->section('news')
 ->ids();
```

#### Twig

```twig
{% set entryIds = craft.entries()
 .section('news')
 .ids() %}
```

### `column()`

すべての配列の最初のカラム値を返します。

> 【メモ】 デフォルトでは、最初のカラムはエレメントの ID になりますが、`select()` パラメータでカスタマイズすることができます。

#### PHP

```php
use craft\elements\Entry;

$uris = Entry::find()
 ->section('news')
 ->select('uri')
 ->column();
```

#### Twig

```twig
{% set uris = craft.entries()
 .section('news')
 .select('uri')
 .column() %}
```

### `scalar()`

最初にマッチしたエレメントの最初のカラム値を返します。

> 【メモ】デフォルトでは、最初のカラムはエレメントの ID になりますが、`select()` パラメータでカスタマイズすることができます。

#### PHP

```php
use craft\elements\Entry;

$uri = Entry::find()
 ->section('news')
 ->slug('hello-world')
 ->select('uri')
 ->scalar();
```

#### Twig

```twig
{% set uri = craft.entries()
 .section('news')
 .slug('hello-world')
 .select('uri')
 .scalar() %}
```

### 集計メソッド

次のメソッドは、マッチしたエレメントの最初のカラムで集計メソッドを実行し、その結果を返します。

- `sum()` – 最初のカラムのすべての値の合計を返します
- `average()` – 最初のカラムのすべての値の平均値を返します
- `min()` – 最初のカラムのすべての値の最小値を返します
- `max()` – 最初のカラムのすべての値の最大値を返します

> 【メモ】 デフォルトでは、最初のカラムはエレメントの ID になりますが、`select()` パラメータでカスタマイズすることができます。

#### PHP

```php
use craft\elements\Entry;

$sum = Entry::find()
 ->section('news')
 ->select('field_someNumberField')
 ->sum();
```

#### Twig

```twig
{% set sum = craft.entries()
 .section('news')
 .select('field_someNumberField')
 .sum() %}
```

