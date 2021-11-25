### 環境構築手順
- dockerコンテナのbuildと立ち上げを行う

```:ターミナル
$ docker compose build
$ docker compose up -d
```

- Laravelのパッケージインストールを行う
 - src/backendにvendorフォルダが出来たことを確認。

```:ターミナル
$ docker compose exec backend bash
```

```:backendコンテナ内
# composer install
# exit
```

- Reactのパッケージインストールを行う
 - src/frontendにnode_modulesフォルダが出来たことを確認。

```:ターミナル
$ cd src/frontend
$ yarn install
```

- データベースの準備を行う

```:ターミナル
$ docker compose exec db bash
```

```:dbコンテナ内
# mysql -u root -p
// パスワードを聞かれるので、passと入力
mysql> CREATE DATABASE laravel;
mysql> exit
# exit
```

```:ターミナル
$ docker compose exec backend bash
```

```:backendコンテナ内
# php artisan migrate
# php artisan db:seed
```

- Reactアプリを立ち上げる

```:ターミナル
$ cd src/frontend
$ yarn start
```