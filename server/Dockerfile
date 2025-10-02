FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# Clean up cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy all project files
COPY . .

# Create necessary directories for Laravel and set permissions
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set directory permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 777 /var/www/storage /var/www/bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
