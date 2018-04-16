# 概要

このリポジトリは、Craft CMS documentation を日本語に翻訳するプロジェクトです。

# 翻訳を始めるには

本プロジェクトでは翻訳メモリソフト [OmegaT](http://www.omegat.org/ja/omegat.html) を利用して作業を進めます。  
OmegaT の「チーム機能」を利用するため、当リポジトリとの同期は自動で行なわれます。

## 注意：プラグインが必要です

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

取得したファイルをローカルフォルダの `source` ディレクトリに移動し、以下の変更を加えます。

* `README.md` を `README.ja.md` にリネームした上で、Markdown に含まれるリンク URL の `(en/` を `(ja/` に置換
* `en` ディレクトリを `ja` ディレクトリに変更

翻訳ソースに変更を加えた場合は、メニューの `プロジェクト > 再読み込み` を実行し、アップデートしてください。 

なお、任意のタイミングでソースをこのリポジトリに含めるかもしれません。
その際は OmegaT が同期したタイミングでローカルの `source` を上書きしますので、あらかじめご了承ください。

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

具体的な時期は未定ですが、ある程度まとまった時点で本家にプルリクエストを送る想定です。

# 誤訳について

翻訳にあたり意訳を含む場合があるため、本来の翻訳としては不適切な表現があるかもしれません。  
誤りや気になる表現などは Issue でのフィードバックにご協力ください。

# 管理者

Toru Kokubun <https://twitter.com/BUN>

# 謝辞

この README は、[Perl 6ドキュメント日本語化プロジェクト](https://github.com/yamato/perl6doc-jp)の内容を参考にさせていただきました。