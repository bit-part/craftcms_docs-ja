リレーション
=========

Craft は、エレメントを互いに関連付けるための強力なエンジンを持っています。関連フィールドタイプを利用して、それらの関連性を作成します。

Craft は次の5つの関連フィールドタイプがあります。

* [アセットフィールド](assets-fields.md)
* [カテゴリフィールド](categories-fields.md)
* [エントリフィールド](entries-fields.md)
* [タグフィールド](tags-fields.md)
* [ユーザーフィールド](users-fields.md)

他のフィールドタイプと同様に、これらを[セクション](sections-and-entries.md#sections)、[ユーザー](users.md)、[アセット](assets.md)、[カテゴリグループ](categories.md)、[タググループ](tags.md)、および[グローバル設定]({globals.md)のフィールドレイアウトに追加できます。

## 専門用語

Craft のリレーションを操作する前に、それがテンプレート記法に関連するため、次の用語を把握することが重要です。

それぞれのリレーションは2つのエレメントを必要とします。

* **ソース**エレメント - 他のエレメントを選択した関連フィールドを持つもの
* **ターゲット**エレメント - ソースによって選択されたエレメント

これは実際にどのように見えるのでしょう？

（エントリフィールド経由で）関連する要素を選択したドリンクレシピ向けのエントリがある場合、エレメントに次のようにラベル付けします。

* ドリンクレシピエントリ：ソース
* 原材料：ターゲット

これを設定するために、エントリフィールドタイプの新しいフィールドを作成し、「原材料」という名前を付け、ソース（利用可能なエレメントが原材料セクションに存在するとします）から「原材料」を選択し、それぞれのレシピが必要とする多くの原材料を選択できるようリミット欄を空白のままにします。

これで、それぞれのドリンクエントリに新しい「原材料」フィールドから原材料を割り当てることができます。

## テンプレート記法

リレーションフィールドをセットアップすると、テンプレート内で関連するエレメントを出力するためのオプションを見ることができます。

### ソースエレメントを経由したターゲットエレメントの取得

「ドリンク」エントリを出力している以下の例のように、すでにテンプレート内でソースレメントを保持している場合は、他のフィールドの値にアクセスするのと同じ方法、すなわちハンドルによって、特定のフィールドのターゲットエレメントにアクセスできます。

ソースの関連フィールドのハンドル（`ingredients`）を呼び出すと、そのフィールドのターゲットエレメントをフィールドに定義された順番で出力することができる Element Criteria Model が返ります。

ドリンクレシピの原材料リストを出力したい場合は、次のようにします。

```twig
{% if drink.ingredients|length %}
 
 <h3>Ingredients</h3>
 
 <ul>
 {% for ingredient in drink.ingredients %}
 <li>{{ ingredient.title }}</li>
 {% endfor %}
 </ul>

{% endif %}
```

エレメントタイプでサポートされている追加パラメータを付加することもできます。

```twig
{% for ingredient in drink.ingredients.section('ingredients') %}
 <li>{{ ingredient.title }}</li>
{% endfor %}
```

### `relatedTo` パラメータ

アセット、カテゴリ、エントリ、ユーザー、およびタグは、それぞれ `relatedTo` パラメータをサポートし、あらゆる種類のとんでもないことを可能にします。

最も単純な書式としては、次のいずれかを渡すことができます。

* [craft\elements\Asset](https://docs.craftcms.com/api/v3/craft-elements-asset.html)、[craft\elements\Category](https://docs.craftcms.com/api/v3/craft-elements-category.html)、[craft\elements\Entry](https://docs.craftcms.com/api/v3/craft-elements-entry.html)、[craft\elements\User](https://docs.craftcms.com/api/v3/craft-elements-user.html)、または [craft\elements\Tag](https://docs.craftcms.com/api/v3/craft-elements-tag.html) オブジェクト
* エレメントの ID
* エレメントオブジェクト、および／または、 ID の配列

それによって、ソースかターゲットかに関わらず、Craft は与えられたエレメントに関連するすべてのエレメントを返します。

```twig
{% set relatedDrinks = craft.entries.section('drinks').relatedTo(drink).all() %}
```

もう少し具体的であることを望むなら、`relatedTo` は次のプロパティを含むオブジェクトも受け入れます。

* `element`, `sourceElement`、または `targetElement`
* `field` _（オプション）_
* `sourceLocale` _（オプション）_

最初のプロパティのキーは、取得したいものにあわせてセットしてください。

* 返されるエレメントが、渡したエレメントとソースまたはターゲットのどちらで関連付くかを気にしない場合は、`element`を使用します
* 与えられたエレメントのソースとして関連付くエレメントだけを見つけたい場合は、`sourceElement` を使用します
* 与えられたエレメントのターゲットとして関連付くエレメントだけを見つけたい場合は、`targetElement` を使用します

特定のフィールドで作成されたリレーションにスコープを制限する場合は、`field` プロパティをセットします。フィールドハンドルかフィールド ID のいずれか（もしくは、ハンドル、および／または、ID の配列）をセットできます。

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
 sourceElement: drink,
 field: 'ingredients'
}) %}
```

特定のフィールドで作成されたリレーションにスコープを制限する場合は、`sourceLocale` プロパティをセットします（関連フィールドを翻訳可能に設定している場合のみ）。ロケール ID をここにセットします。

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
 sourceElement: drink,
 sourceLocale: craft.locale
}) %}
```

#### 行列を経由する

[行列](matrix-fields.md)フィールド内のソースエレメントに関連するエレメントを見つけたい場合は、行列フィールドのハンドルを `field` パラメータに渡します。複数の関連フィールドを持つ行列フィールドにある特定のフィールドだけをターゲットにしたい場合は、ドット表記を利用してブロックタイプのフィールドハンドルを指定できます。

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
 sourceElement: drink,
 field: 'ingredientsMatrix.relatedIngredient'
}).all() %}
```

#### 複数のリレーションの判定基準を渡す

複数のタイプのリレーションを組み合わせる必要がある場合があります。例えば、エスプレッソを含む現在のユーザーのお気に入りの飲み物をすべて出力するには、次のようになります。

```twig
{% set espresso = craft.entries.section('ingredients').slug('espresso').first() %}

{% set cocktails = craft.entries.section('drinks').relatedTo(['and',
 { sourceElement: currentUser, field: 'favoriteDrinks' },
 { targetElement: espresso, field: 'ingredients' }
]).all() %}
```

最初の引数（`'and'`）は、クエリがリレーションの判断基準と_すべて_一致しなければならないことを指定しています。リレーション判断基準の_いずれか_とマッチさせたい場合は、`'or'` を渡すことができます。
