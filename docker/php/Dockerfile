FROM php:7.3-apache

COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

RUN apt-get update  \
    && apt-get -y install \
    git \
    zip \
    unzip \
    vim \
    && docker-php-ext-install pdo_mysql bcmath mbstring \
    && a2enmod rewrite

WORKDIR /var/www/html

EXPOSE 80