# 概要

このリポジトリは、Craft CMS documentation を日本語に翻訳するプロジェクトです。

# 翻訳を始めるには

本プロジェクトでは翻訳メモリソフト [OmegaT](http://www.omegat.org/ja/omegat.html) を利用して作業を進めます。  
OmegaT の「チーム機能」を利用するため、当リポジトリとの同期は自動で行なわれます。

## 注意：プラグインが必要です

OmegaT の翻訳ソースに Markdown を指定するにあたって `okapiFiltersForOmegaT` プラグインが必要です。  
下記などを参考に、事前にプラグインをインストールしておいてください。

**【天使降臨】OmegaTにOkapiプラグインを入れてXLF/XLIFFファイルを使う方法 - WSBIWSBI**  
[http://wsbi.net/omegaT_angel](http://wsbi.net/omegaT_angel)

## 注意：名前を設定してください

作業前に OmegaT の環境設定ダイアログで `チーム` を選び、`名前または ID` を確認してください。  
ここで入力された値はコミットメッセージに `Translated by {{名前または ID}}` の形で挿入されるため、公開しても問題ない内容にしておきましょう。

## 1. 翻訳プロジェクトのダウンロード

OmegaT を起動後、メニューから `プロジェクト > チームプロジェクトをダウンロード...` を選択します。

`チームプロジェクト` ダイアログの `リポジトリ URL` には `git@github.com:bit-part/craftcms_docs-ja.git` または `https://github.com/bit-part/craftcms_docs-ja.git` と入力します。OmegaT のバージョンによりチームプロジェクトの Git が `HTTPS` 固定の場合がありますので、注意してください。

`ローカルフォルダー` には保存先の任意のディレクトリを指定してください。`確定` ボタンをクリックすると、保存先に当リポジトリのクローンが生成されます。

2回目以降は、ローカルフォルダにある `omegat.project` をダブルクリックするとプロジェクトを直接開くことができます。

## 2. 翻訳ソースの取得

本家の公式リポジトリから、英語版の Markdown ファイル一式を取得します。

* [Craft CMS documentation](https://github.com/craftcms/docs)

取得した `docs` ディレクトリをローカルフォルダの `source` ディレクトリの中に移動し、以下の変更を加えます。

* `docs/ja` ディレクトリに含まれるすべてのディレクトとファイルを削除
* `docs/.vuepress` を削除
* `docs/ja` を除く、すべてのディレクトリとファイルを `docs/ja` に移動

これによって、元の英文ファイルをソースとする日本語版の翻訳が可能となります。

翻訳ソースに変更を加えた場合は、メニューの `プロジェクト > 再読み込み` を実行し、アップデートしてください。

## 3. 翻訳する

OmegaT でプロジェクトを開くと「翻訳対象ファイル一覧」ウィンドウが表示されます。その中から翻訳したいファイルを選択し、メインウィンドウで文節ごとの翻訳をしてください。

## 4. コミットとGitHubリポジトリへの反映

初めてプロジェクトを保存すると `認証` ダイアログが表示される場合がありますので、GitHub のユーザー名とパスワードを入力してください。ただし、何も変更がない場合は2回目以降の保存時となります。

# 参考

OmegaT 日本語化プロジェクトの Wiki を参考にしてください。

[OmegaT のチーム機能の使い方](https://sourceforge.net/p/omegat-jp/wiki/Team_Project_howto/)

# 翻訳ソース

翻訳のベースとなるドキュメントの著作権は Craft CMS 開発チームにあります。

* [Craft CMS documentation](https://github.com/craftcms/docs)

公式リポジトリの Contributor として参加させてもらっていますので、当プロジェクトで修正された内容を確認後にコミットします。（※反映時期については、一任ください。）

# 誤訳について

翻訳にあたり意訳を含む場合があるため、本来の翻訳としては不適切な表現があるかもしれません。  
誤りや気になる表現などは Issue でのフィードバックにご協力ください。

# OmegaT で訳文ファイルを出力後、調整が必要なファイルについて

リストの項目内に `TIPS` や `ソースコード` を含む場合、インデントがずれてしまう影響で、表示が崩れる可能性があります。  
OmegaT の設定で調整できないようでしたら、訳文ファイルを生成後に手動で調整してください。

なお、確認している修正が必要なファイルは以下の通りです。

* target/ja/category-fields.md
* target/ja/dev/tags/cache.html
* target/ja/extend/coding-guidelines.html
* target/ja/routing.html
* target/ja/upgrade.md

`target/ja/extend/coding-guidelines.html` のみ、「インターフェース 対 実装クラス」と「条件」のインライン表記部分のバッククォートも修正が必要です。

# 管理者

Toru Kokubun <https://twitter.com/BUN>

# 謝辞

この README は、[Perl 6ドキュメント日本語化プロジェクト](https://github.com/yamato/perl6doc-jp)の内容を参考にさせていただきました。
