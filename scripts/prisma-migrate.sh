#!/bin/bash

# Function to convert string to PascalCase
toPascalCase() {
  local input="$1"
  echo "$input" | awk '{ for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2)); }1'
}

# Prompt user for migration name
read -p "Enter migration name: " migration_name

# Check if migration_name is not empty
if [ -z "$migration_name" ]; then
  echo "Error: Migration name cannot be empty."
  exit 1
fi

# Convert migration_name to PascalCase
pascal_case_name=$(toPascalCase "$migration_name")

# Execute Prisma migrate command
npx prisma migrate dev --name "$pascal_case_name"