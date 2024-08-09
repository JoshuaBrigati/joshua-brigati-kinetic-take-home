#!/bin/bash
set -e

echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  echo "Waiting for database connection..."
  sleep 2
done

echo "Database is ready!"

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting the application..."
npm start