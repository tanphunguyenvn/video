#!/bin/sh
set -e

rm -f /rails/tmp/pids/server.pid

exec bundle exec "$@"