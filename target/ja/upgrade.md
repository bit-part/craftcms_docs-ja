# Craft 2 からのアップグレード

サイトを Craft 3 にアップグレードするための最初のステップは、CMS 自体をアップデートすることです。

## アップグレードのための準備

はじめる前に、次のことを確認してください。

- あなたは[Craft 3 の変更点](changes-in-craft-3.md)を確認しました。
- あなたのサーバーは Craft 3 の[**最小要件**](requirements.md)（Craft 3 には PHP 7 以降が必要で、 PHP 割当メモリが少なくとも 256MB 必要です）を満たしています。
- あなたのサイトは、少なくとも **Craft 2.6.2788** が実行されています。
- なんらかの問題が起こった場合に備えて、**データベースをバックアップ**してあります。
- **Composer** をインストールしてあります。（[インストールガイド](installation.md)のステップ1を参照）

上記リストをすべて満たしているなら、アップグレードプロセスを続行できます。

## Craft のアップグレード

[既存のディレクトリ構成を維持する](#if-you-want-to-keep-your-current-directory-structure)か、新規の Craft 3 インストールに似た[新しい構成へ切り替える](#if-you-want-your-directory-structure-to-resemble-a-new-craft-3-project)かによって、Craft のアップデートには2つの方法があります。

いくつかの理由から、新しい構造への移行が一般的に推奨されています。

- ドキュメントは全般的に新しい構造を想定しています。
- データベースの認証情報のような機密性の高い情報は、Git にコミットしない `.env` ファイルに格納される（[PHP dotenv](https://github.com/vlucas/phpdotenv) を利用）ため、より安全です。
- `craft` 実行可能ファイルが付属しているため、ターミナルから様々な CLI 機能を利用できます。

### 既存のディレクトリ構成を維持したい場合は

サイトのディレクトリ構成を大幅に変更することなく Craft をアップデートするには、次の手順に従ってください。

この最後にある（他の領域のドキュメント内で参照されている）"プロジェクトルート"は `craft/` ディレクトリであり、その親ディレクトリ_ではない_ことに注目してください。

1. ターミナルを開き `craft/` ディレクトリに移動してください。

       cd /path/to/project/craft

2. Craft 3 を読み込むための次のコマンドを実行してください。（これは数分かかります）

       composer require craftcms/cms:^3.0.0

   メモ：システムに PHP 7 がインストールされていないと Composer が不満を言うかもしれません。しかし、別途インストールされた PHP（例えば MAMP や Vagrant）上で Craft を実行するつもりで、問題ないと判っているのであれば `--ignore-platform-reqs` フラグを使ってください。

3. すべてのファイルがあるべき場所に配置されたら、`public/index.php` ファイルを開き、次の行を探してください。

   ```php
   // Do not edit below this line
   ```

   そして、それ以下の行をすべて置き換えてください。

   ```php
   defined('CRAFT_BASE_PATH') || define('CRAFT_BASE_PATH', realpath($craftPath));

   if (!is_dir(CRAFT_BASE_PATH.'/vendor')) {
      exit('Could not find your vendor/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
   }

   require_once CRAFT_BASE_PATH.'/vendor/autoload.php';
   $app = require CRAFT_BASE_PATH.'/vendor/craftcms/cms/bootstrap/web.php';
   $app->run();
   ```

4. ブラウザでコントロールパネルの URL（例：`http://example.dev/admin`）にアクセスします。アップデートのプロンプトが表示されたら、すべてが正しく実行されています！「Finish up（完了）」ボタンをクリックしてデータベースを更新してください。

5. 古い `craft/app/` ディレクトリを削除してください。それは、もはや必要ありません。Craft 3 は `vendor/craftcms/cms/` に配置されています。

> メモ：`craft/` ディレクトリがサーバーの公開ディレクトリ（例：`public_html/` 内）にある場合、新しい `craft/vendor/` ディレクトリがウェブトラフィックから保護されるよう確認する必要があります。サーバーが Apache を実行している場合、ディレクトリ内に `.htaccess` ファイルを作成し、内容を `Deny from all` としてください。

### 新しい Craft 3 プロジェクトのようなディレクトリ構造にしたい場合は

新しい Craft 3 プロジェクト（[PHP dotenv](https://github.com/vlucas/phpdotenv) をベースとした設定を含む）と同様のディレクトリ構成でサイトをセットアップする場合、次のガイドに従ってください。

1. [インストールガイド](installation.md)のステップ1からステップ2に従ってください。（Craft 2 プロジェクトと同じ場所ではなく、新しい場所に Craft 3 プロジェクトを作成する必要があります。）

2. `.env` ファイルにデータベース接続設定を定義します。手動でファイルを編集するか、ターミナルの新しいプロジェクトルートディレクトリから `./craft setup` コマンドを実行します。

   > 【メモ】デフォルトのテーブル接頭辞は「空」になりましたが、`craft_` が使われていることに注意してください。テーブルの現在の接頭辞がそれである場合、`DB_TABLE_PREFIX="craft_"` をセットしてください。

3. 古い `craft/config/general.php` ファイルのすべての設定を新しいプロジェクトの `config/general.php` ファイルにコピーします。

4. 古い `craft/config/license.key` ファイルを新しいプロジェクトの `config/` フォルダにコピーします。

5. 古いテンプレートを `craft/templates/` から新しいプロジェクトの `templates/` ディレクトリにコピーします。

6. `public/index.php` ファイルに何らかの変更を加えていた場合、それらを新しいプロジェクトの `web/index.php` ファイルにコピーします。

7. 古い `public/` ディレクトリに含まれるすべてのファイルを新しいプロジェクトの `web/` ディレクトリにコピーします。

8. 新しいプロジェクトの `web/` ディレクトリを参照するよう、ウェブサーバーの設定をアップデートします。

9. ブラウザでコントロールパネルの URL（例：`http://example.dev/admin`）にアクセスします。アップデートのプロンプトが表示されたら、すべてが正しく実行されています！「Finish up（完了）」ボタンをクリックしてデータベースを更新してください。

これで Craft 2 プロジェクトから Craft 3 へのアップグレードが完了しました。[Craft 3 の変更点](changes-in-craft-3.md)を確認する時間を設けてください。

