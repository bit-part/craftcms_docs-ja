検索
=========

このバーが表示されている場所ならどこでも、エレメントを検索できます。

![検索バー](images/searching-search-bar.png)

## サポートする構文

Craft は次の検索構文をサポートしています。

<table>
 <thead>
 <tr>
 <th>この検索によって</th>
 <th>こちらのエレメントが見つかるでしょう</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>salty</td>
 <td>「salty」という単語を含んでいる</td>
 </tr>
 <tr>
 <td>body:salty</td>
 <td>‘body’ フィールドに「salty」を含む</td>
 </tr>
 <tr>
 <td>salty dog</td>
 <td>「salty」と「dog」の両方を含んでいる</td>
 </tr>
 <tr>
 <td>body:salty body:dog</td>
 <td>‘body’ フィールドに「salty」と「dog」の両方を含む</td>
 </tr>
 <tr>
 <td>salty OR dog</td>
 <td>「salty」または「dog」のいずれか（または、両方）を含んでいる</td>
 </tr>
 <tr>
 <td>body:salty OR body:dog</td>
 <td>‘body’ フィールドに「salty」または「dog」のいずれかを含む</td>
 </tr>
 <tr>
 <td>salty -dog</td>
 <td>「salty」を含むが「dog」を含んでいない</td>
 </tr>
 <tr>
 <td>body:salty -body:dog</td>
 <td>‘body’ フィールドに「salty」を含むが「dog」を含まない</td>
 </tr>
 <tr>
 <td>"salty dog"</td>
 <td>正確なフレーズとして「salty dog」を含んでいる</td>
 </tr>
 <tr>
 <td>body:"salty dog"</td>
 <td>‘body’ フィールドに正確なフレーズとして「salty dog」を含む</td>
 </tr>
 <tr>
 <td>salty locale:en_us</td>
 <td>‘en_us’ ロケールに「salty」を含んでいる</td>
 </tr>
 <tr>
 <td>sal*</td>
 <td>「sal」ではじまる単語を含んでいる</td>
 </tr>
 <tr>
 <td>*ty</td>
 <td>「ty」で終わる単語を含んでいる</td>
 </tr>
 <tr>
 <td>*alt*</td>
 <td>「alt」を含む単語を含んでいる</td>
 </tr>
 <tr>
 <td>body:sal*</td>
 <td>‘body’ フィールドが「sal」ではじまる単語を含む</td>
 </tr>
 <tr>
 <td>body::salty*</td>
 <td>‘body’ フィールドが「salty」ではじまる</td>
 </tr>
 <tr>
 <td>body::"salty dog"</td>
 <td>‘body’ フィールドに「salty dog」がセットされ、それ以外のものがない</td>
 </tr>
 <tr>
 <td>body:*</td>
 <td>‘body’ フィールドに<em>なんらかの</em>値を含む</td>
 </tr>
 </tbody>
</table>

> コンフィグ設定の [defaultSearchTermOptions](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#$defaultSearchTermOptions-detail) で、検索語のデフォルトの振る舞いを変更することができます。詳細については、[Enabling Fuzzy Search by Default](https://craftcms.com/support/enabling-fuzzy-search-by-default) を参照してください。

## 特定エレメントの属性を検索する

アセット、カテゴリ、エントリ、ユーザー、およびタグは、それぞれ独自の属性を追加して検索することができます。

* **アセット**
   * filename
   * extension
   * kind

* **カテゴリ**
   * title
   * slug

* **エントリ**
   * title
   * slug

* **ユーザー**
   * username
   * firstName
   * lastName
   * fullName (firstName + lastName)
   * email

* **タグ**
   * title

## テンプレート記法

[craft.assets](https://craftcms.com/docs/templating/craft.assets)、[craft.entries](https://craftcms.com/docs/templating/craft.entries)、[craft.tags](https://craftcms.com/docs/templating/craft.tags)、および [craft.users](https://craftcms.com/docs/templating/craft.users) は、検索クエリを指定したエレメントの絞り込みに利用できる `search` パラメータをサポートしています。

検索クエリは、次の2つの方法で指定できます。

```twig
{% set query = craft.request.getParam('q') %}

{# Pass the search query directly into the search param: #}
{% set results = craft.entries({
 search: query
}).all() %}

{# Or pass it along with some custom search term options: #}
{% set results = craft.entries({
 search: {
 query: query,
 subLeft: true,
 subRight: true
 }
}).all() %}
```

後者のルートを選択する場合、`query` プロパティは必須となる点に注意してください。その他に、コンフィグ設定の [defaultSearchTermOptions](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#$defaultSearchTermOptions-detail) で利用可能なすべてのキーを使用できます。

### スコアによる検索結果の順位付け

検索結果をベストマッチからワーストマッチの順に並び替えたい場合は、`order` パラメータに `'score'` をセットすることもできます。

```twig
{% set results = craft.entries({
 search: query,
 order: 'score'
}).all() %}
```

この場合、返されるすべてのエレメントに `searchScore` 属性がセットされ、それぞれの検索スコアを知ることができます。

> 動的な検索結果をリスト化する完全な例については、[検索フォーム](templating/examples/search-form.md)チュートリアルを参照してください。

## 検索インデックスの再構築

Craft は検索インデックスを可能な限り最新に保つよう、最善を尽くしています。しかし、その一部を不正確にするかもしれない可能性がいくつかあります。検索インデックスが最新かつ最高データでないと疑われる場合は、設定にある検索インデックスの再構築ツールで Craft に再構築されることができます。

