# Use the barebones version of Ruby 2.3.
FROM ruby:2.3-slim

# Optionally set a maintainer name to let people know who made this image.
MAINTAINER Nick Janetakis <nick.janetakis@gmail.com>

# Install dependencies:
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
# - libpq-dev: Communicate with postgres through the postgres gem
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
      build-essential nodejs libpq-dev

# Set an environment variable to store where the app is installed to inside
# of the Docker image. The name matches the project name out of convention only.
ENV INSTALL_PATH /dockerzon
RUN mkdir -p $INSTALL_PATH

# This sets the context of where commands will be ran in and is documented
# on Docker's website extensively.
WORKDIR $INSTALL_PATH

# Ensure gems are cached and only get updated when they change. This will
# drastically increase build times when your gems do not change.
COPY Gemfile Gemfile

# We want binstubs to be available so we can directly call sidekiq and
# potentially other binaries as command overrides without depending on
# bundle exec.
RUN bundle install --binstubs

# Copy in the application code from your work station at the current directory
# over to the working directory.
COPY . .

# Provide a dummy DATABASE_URL to Rails so it can pre-compile assets.
RUN bundle exec rake RAILS_ENV=production DATABASE_URL=postgresql://user:pass@127.0.0.1/dbname SECRET_TOKEN=dummytoken assets:precompile

# Ensure the static assets are exposed through a volume so that nginx can read
# in these values later.
VOLUME ["$INSTALL_PATH/public"]

# The default command that gets ran will be to start the Puma server.
CMD bundle exec puma -C config/puma.rb
