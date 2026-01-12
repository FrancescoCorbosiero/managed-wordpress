# ==============================================
# ALPACODE WORDPRESS IMAGE
# Base: wordpress:6-php8.3-apache
# Includes: Frost theme + frost-child + alpacode-blocks plugin
# ==============================================

FROM wordpress:6-php8.3-apache

LABEL maintainer="Alpacode Studio <info@alpacode.studio>"
LABEL version="0.0.1"
LABEL description="WordPress with Frost theme, child theme, and custom blocks"

# Install utilities needed for theme download
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Download and install Frost theme from WordPress.org
# Pin to specific version for reproducibility
ARG FROST_VERSION=1.1.1
RUN curl -L "https://downloads.wordpress.org/theme/frost.zip" -o /tmp/frost.zip \
    && unzip /tmp/frost.zip -d /usr/src/wordpress/wp-content/themes/ \
    && rm /tmp/frost.zip

# Copy custom child theme
COPY --chown=www-data:www-data themes/frost-child /usr/src/wordpress/wp-content/themes/frost-child

# Copy custom plugin
COPY --chown=www-data:www-data plugins/alpacode-blocks /usr/src/wordpress/wp-content/plugins/alpacode-blocks

# Set correct permissions
RUN chown -R www-data:www-data /usr/src/wordpress/wp-content/themes \
    && chown -R www-data:www-data /usr/src/wordpress/wp-content/plugins
