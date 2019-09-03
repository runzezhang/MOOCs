# Pull in the from the official nginx image.
FROM nginx:1.15
# Hi, this is Nick from the future. I had to come in and edit the nginx version
# which no longer matches the video. That's because the GPG key expired with
# nginx 1.9, so now we're using 1.15. Everything works the same.

# Optionally set a maintainer name to let people know who made this image.
MAINTAINER Nick Janetakis <nick.janetakis@gmail.com>

# We'll need curl within the nginx image.
RUN apt-get update && apt-get install -y --no-install-recommends curl \
      && rm -rf /var/lib/apt/lists/*

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

# Copy over the custom nginx and default configs.
COPY configs/nginx.conf /etc/nginx/nginx.conf
COPY configs/default.conf /etc/nginx/conf.d/default.conf

# Allow us to customize the entrypoint of the image.
COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]
