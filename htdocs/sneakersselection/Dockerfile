FROM wordpress:6-php8.3-apache

# Copy Shoptimizer theme
COPY --chown=www-data:www-data ./shoptimizer /var/www/html/wp-content/themes/shoptimizer

# Copy Shoptimizer child theme
COPY --chown=www-data:www-data ./shoptimizer-child /var/www/html/wp-content/themes/shoptimizer-child

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/shoptimizer-child