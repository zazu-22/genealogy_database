#!/bin/bash
# Script to run tests for the Genealogy Database System

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Genealogy Database System Test Runner ===${NC}\n"

# Check command arguments
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo "Usage: ./scripts/test.sh [options]"
  echo ""
  echo "Options:"
  echo "  --unit          Run only unit tests"
  echo "  --integration   Run only integration tests"
  echo "  --models        Run only model tests"
  echo "  --db            Run only database tests"
  echo "  --utils         Run only utility tests"
  echo "  --coverage      Run tests with coverage report"
  echo "  --watch         Run tests in watch mode"
  echo "  --help, -h      Display this help message"
  echo ""
  exit 0
fi

# Parse command-line arguments
RUN_UNIT=false
RUN_INTEGRATION=false
RUN_MODELS=false
RUN_DB=false
RUN_UTILS=false
RUN_COVERAGE=false
RUN_WATCH=false
RUN_ALL=true

for arg in "$@"
do
  case $arg in
    --unit)
      RUN_UNIT=true
      RUN_ALL=false
      ;;
    --integration)
      RUN_INTEGRATION=true
      RUN_ALL=false
      ;;
    --models)
      RUN_MODELS=true
      RUN_ALL=false
      ;;
    --db)
      RUN_DB=true
      RUN_ALL=false
      ;;
    --utils)
      RUN_UTILS=true
      RUN_ALL=false
      ;;
    --coverage)
      RUN_COVERAGE=true
      ;;
    --watch)
      RUN_WATCH=true
      ;;
  esac
done

# Function to run tests
run_tests() {
  local test_command="npx jest"
  local test_pattern=$1
  
  if [ "$RUN_COVERAGE" = true ]; then
    test_command="$test_command --coverage"
  fi
  
  if [ "$RUN_WATCH" = true ]; then
    test_command="$test_command --watch"
  fi
  
  if [ -n "$test_pattern" ]; then
    test_command="$test_command --testMatch='$test_pattern'"
  fi
  
  echo -e "${BLUE}Running command:${NC} $test_command"
  eval $test_command
  
  # Check if tests passed
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ Tests completed successfully${NC}\n"
    return 0
  else
    echo -e "\n${RED}✗ Tests failed${NC}\n"
    return 1
  fi
}

# Run the requested tests
EXIT_CODE=0

if [ "$RUN_ALL" = true ]; then
  echo -e "${BLUE}Running all tests...${NC}\n"
  run_tests
  EXIT_CODE=$?
else
  # Run unit tests
  if [ "$RUN_UNIT" = true ]; then
    echo -e "${BLUE}Running unit tests...${NC}\n"
    run_tests "**/tests/unit/**/*.test.ts"
    [ $? -ne 0 ] && EXIT_CODE=1
  fi
  
  # Run integration tests
  if [ "$RUN_INTEGRATION" = true ]; then
    echo -e "${BLUE}Running integration tests...${NC}\n"
    run_tests "**/tests/integration/**/*.test.ts"
    [ $? -ne 0 ] && EXIT_CODE=1
  fi
  
  # Run model tests
  if [ "$RUN_MODELS" = true ]; then
    echo -e "${BLUE}Running model tests...${NC}\n"
    run_tests "**/tests/unit/models/**/*.test.ts"
    [ $? -ne 0 ] && EXIT_CODE=1
  fi
  
  # Run database tests
  if [ "$RUN_DB" = true ]; then
    echo -e "${BLUE}Running database tests...${NC}\n"
    run_tests "**/tests/unit/db/**/*.test.ts"
    [ $? -ne 0 ] && EXIT_CODE=1
  fi
  
  # Run utility tests
  if [ "$RUN_UTILS" = true ]; then
    echo -e "${BLUE}Running utility tests...${NC}\n"
    run_tests "**/tests/unit/utils/**/*.test.ts"
    [ $? -ne 0 ] && EXIT_CODE=1
  fi
fi

# Print summary
if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}All tests passed successfully!${NC}"
else
  echo -e "${RED}Some tests failed!${NC}"
fi

exit $EXIT_CODE