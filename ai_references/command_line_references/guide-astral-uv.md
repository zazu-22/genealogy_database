# Complete Guide to Python Development Workflow with Astral UV

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Initial Project Setup](#2-initial-project-setup)
  - [2.1. Creating a New Project](#21-creating-a-new-project)
  - [2.2. Setting Up an Existing Project](#22-setting-up-an-existing-project)
- [3. Development Workflow](#3-development-workflow)
  - [3.1. Day-to-Day Development](#31-day-to-day-development)
  - [3.2. Running Your Code](#32-running-your-code)
  - [3.3. Adding New Dependencies](#33-adding-new-dependencies)
- [4. Package Dependencies Management](#4-package-dependencies-management)
  - [4.1. Managing Dependencies in pyproject.toml](#41-managing-dependencies-in-pyprojecttoml)
  - [4.2. Understanding the Lockfile System](#42-understanding-the-lockfile-system)
  - [4.3. Syncing vs. Locking](#43-syncing-vs-locking)
  - [4.4. Using Requirements Files (Alternative Method)](#44-using-requirements-files-alternative-method)
  - [4.5. Upgrading Dependencies](#45-upgrading-dependencies)
- [5. Testing Workflow](#5-testing-workflow)
  - [5.1. Setting Up Test Environments](#51-setting-up-test-environments)
  - [5.2. Integrating with CI/CD](#52-integrating-with-cicd)
- [6. Production Deployment](#6-production-deployment)
  - [6.1. Building Distribution Packages](#61-building-distribution-packages)
  - [6.2. Creating Reproducible Environments](#62-creating-reproducible-environments)
  - [6.3. Docker Deployment](#63-docker-deployment)
- [7. Multi-Environment Management](#7-multi-environment-management)
  - [7.1. Working with Feature Branches](#71-working-with-feature-branches)
  - [7.2. Testing Against Multiple Python Versions](#72-testing-against-multiple-python-versions)
  - [7.3. Configuration Management](#73-configuration-management)
- [8. Troubleshooting](#8-troubleshooting)
  - [8.1. Package Installation Issues](#81-package-installation-issues)
  - [8.2. Environment Problems](#82-environment-problems)
  - [8.3. Checking Package Metadata](#83-checking-package-metadata)
  - [8.4. Resolving Dependency Conflicts](#84-resolving-dependency-conflicts)
- [9. Quick Reference](#9-quick-reference)
  - [9.1. Common UV Commands](#91-common-uv-commands)
  - [9.2. Key Advantages Over Traditional Workflows](#92-key-advantages-over-traditional-workflows)

## 1. Introduction

Astral UV (formerly uv) is a modern Python package manager and build system that offers significant speed improvements over traditional tools like pip. This guide covers comprehensive workflows for efficiently managing Python projects using UV.

## 2. Initial Project Setup

### 2.1. Creating a New Project

```bash
# Create a new project
uv init project-name
cd project-name

# Or initialize in current directory
mkdir project-name
cd project-name
uv init
```

When you run `uv init`, UV creates the following files:
- `.python-version`: Specifies the Python version for your project
- `pyproject.toml`: Contains project metadata and dependencies
- `README.md`: Basic project documentation
- `main.py`: A simple starter file

### 2.2. Setting Up an Existing Project

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Create a virtual environment
uv venv

# Install the project and its dependencies
uv pip install -e "."  # Basic installation
uv pip install -e ".[dev]"  # With development dependencies
```

The `-e` flag installs the package in "editable" mode, creating a link to your source code rather than copying it. This allows you to modify your code without reinstalling.

## 3. Development Workflow

### 3.1. Day-to-Day Development

Most of the time, no reinstallation is needed when making changes to your code. This is due to the editable installation (`-e` flag), which makes Python look directly at your source files.

Traditionally, you would need to manually reinstall the package when:
- Dependencies change in pyproject.toml
- Package structure changes (new modules added)
- Entry points or scripts change
- Build configuration changes

However, if you consistently use `uv run` to execute your code (as recommended in the section below), UV will automatically detect these changes and handle the necessary updates without requiring manual intervention. This automation is one of UV's key advantages over traditional Python workflows.

If you need to manually reinstall for any reason:

```bash
# Manual reinstallation when necessary
uv pip install -e ".[dev]"
```

### 3.2. Running Your Code

UV provides a convenient way to run your code with automatic environment management:

```bash
# Preferred method - automatically handles environment synchronization
uv run your_script.py [arguments]

# Alternative method
uv sync
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
python your_script.py [arguments]
```

**Important:** The `uv run` command automatically verifies that your lockfile matches your pyproject.toml and that your environment matches your lockfile. If any discrepancies are detected (such as dependency changes or package structure changes), UV will automatically update your environment before executing your command. This eliminates the need to manually determine when reinstallation is necessary.

### 3.3. Adding New Dependencies

```bash
# Add runtime dependencies
uv add requests

# Add with version constraint
uv add 'requests==2.31.0'

# Add development dependencies
uv add pytest --group dev
```

Each `uv add` command will:
1. Update your pyproject.toml
2. Update your lockfile
3. Install the package in your environment

## 4. Package Dependencies Management

### 4.1. Managing Dependencies in pyproject.toml

```toml
[project]
name = "your-project"
version = "0.1.0"
description = "Your project description"
dependencies = [
    "requests>=2.28.0",
    "pyyaml>=6.0"
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "black>=23.0.0",
    "mypy>=1.0.0"
]
```

The `pyproject.toml` file defines your project's metadata and dependencies with flexible version constraints. This is your primary configuration file for the project.

### 4.2. Understanding the Lockfile System

UV uses a lockfile (`uv.lock`) to ensure consistent environments:

- **Automatic Creation**: The lockfile is generated automatically the first time you run a project command like `uv run`, `uv sync`, or `uv lock`
- **No Manual Setup Required**: You don't need to take any special actions to activate or configure the lockfile system
- **Precise Dependency Versions**: While `pyproject.toml` contains broad requirements (like `requests>=2.28.0`), the lockfile records the exact resolved versions of all dependencies and sub-dependencies
- **Automatic Updates**: The lockfile is automatically updated when:
  - Dependencies in `pyproject.toml` change
  - You run `uv lock` explicitly
  - You use `uv add` or `uv remove` to manage dependencies
  - You execute `uv run` and UV detects that the lockfile needs updating
- **Cross-Platform Compatibility**: The lockfile ensures consistent installations across different machines and operating systems

**Best Practices**:
- Commit the lockfile to version control
- Never edit the lockfile manually
- Let UV manage it automatically through its commands

### 4.3. Syncing vs. Locking

There are two related but distinct concepts in UV's workflow:

1. **Locking** (creating/updating the lockfile):
   ```bash
   # Explicitly update the lockfile
   uv lock
   
   # Lock with specific package updates
   uv lock --upgrade-package requests
   ```

2. **Syncing** (making your environment match the lockfile):
   ```bash
   # Synchronize environment with lockfile
   uv sync
   
   # The uv run command performs sync automatically before execution
   uv run your_script.py
   ```

### 4.4. Using Requirements Files (Alternative Method)

For projects using traditional requirements files instead of UV's native lockfile:

```bash
# Lock dependencies to requirements.txt
uv pip compile pyproject.toml -o requirements.txt

# Lock with development dependencies
uv pip compile pyproject.toml --extra dev -o requirements-dev.txt

# Install from locked requirements
uv pip sync requirements.txt
```

### 4.5. Upgrading Dependencies

```bash
# Upgrade a specific package
uv lock --upgrade-package requests

# Upgrade all packages
uv pip compile pyproject.toml -o requirements.txt --upgrade
```

## 5. Testing Workflow

### 5.1. Setting Up Test Environments

For consistent testing across different environments:

```bash
# Create a clean test environment
uv venv test-env
uv pip install -e ".[dev]" --python ./test-env/bin/python

# Run tests
uv run --python ./test-env/bin/python -- pytest
```

### 5.2. Integrating with CI/CD

To ensure reproducible CI/CD pipelines:

```bash
# Installation in CI environment (example GitHub Actions workflow)
- name: Set up Python
  uses: actions/setup-python@v4
  with:
    python-version: '3.10'
    
- name: Install UV
  run: curl -LsSf https://astral.sh/uv/install.sh | sh

- name: Install dependencies
  run: |
    uv venv
    uv pip sync requirements.txt
```

## 6. Production Deployment

### 6.1. Building Distribution Packages

```bash
# Build source and wheel distributions
uv build

# The built packages will be in the dist/ directory
ls dist/
```

### 6.2. Creating Reproducible Environments

```bash
# Create a requirements.txt with pinned versions
uv pip compile pyproject.toml -o requirements.txt

# Create a production environment
uv venv prod-env
uv pip sync requirements.txt --python ./prod-env/bin/python
```

### 6.3. Docker Deployment

For containerized deployments:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install UV
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Copy requirements first for better caching
COPY requirements.txt .

# Create a virtual environment and install dependencies
RUN uv venv /app/venv \
    && /app/venv/bin/pip install --no-deps -r requirements.txt

# Copy application code
COPY . .

# Set the Python path to use our venv
ENV PATH="/app/venv/bin:$PATH"

CMD ["python", "main.py"]
```

## 7. Multi-Environment Management

### 7.1. Working with Feature Branches

```bash
# Create a new environment for a feature branch
git checkout feature-branch
uv venv .venv-feature
uv pip install -e ".[dev]" --python ./.venv-feature/bin/python

# Run with feature branch environment
uv run --python ./.venv-feature/bin/python your_script.py
```

### 7.2. Testing Against Multiple Python Versions

```bash
# Create environments for different Python versions
uv venv py39-env --python 3.9
uv venv py310-env --python 3.10

# Install your package in each environment
uv pip install -e ".[dev]" --python ./py39-env/bin/python
uv pip install -e ".[dev]" --python ./py310-env/bin/python

# Run tests in each environment
uv run --python ./py39-env/bin/python -- pytest
uv run --python ./py310-env/bin/python -- pytest
```

### 7.3. Configuration Management

UV supports configuration through `uv.toml` or the `[tool.uv]` section in `pyproject.toml`:

```toml
# In pyproject.toml
[tool.uv]
# UV-specific settings go here

# Example: Set a custom index
[[tool.uv.index]]
url = "https://my-private-index.com/simple"
default = true
```

## 8. Troubleshooting

### 8.1. Package Installation Issues

If you encounter issues with package installation:

```bash
# Check for conflicts in the environment
uv pip check

# Try with build isolation disabled (for problematic packages)
uv pip install --no-build-isolation package-name

# Enable verbose output for debugging
UV_LOG=debug uv pip install package-name
```

### 8.2. Environment Problems

If your environment seems broken or inconsistent:

```bash
# Recreate the virtual environment
rm -rf .venv
uv venv
uv pip install -e ".[dev]"

# Verify the environment
uv pip list
```

### 8.3. Checking Package Metadata

```bash
# Display information about installed packages
uv pip show package-name
```

### 8.4. Resolving Dependency Conflicts

```bash
# Use overrides for problematic dependencies
echo "problematic-package>=2.0" > overrides.txt
uv pip compile requirements.in --override overrides.txt -o requirements.txt
```

## 9. Quick Reference

### 9.1. Common UV Commands

| Command | Purpose |
|---------|---------|
| `uv venv` | Create a virtual environment |
| `uv add package-name` | Add a dependency to your project |
| `uv run script.py` | Run a script with automatic environment verification |
| `uv sync` | Synchronize environment with lockfile |
| `uv lock` | Update lockfile |
| `uv pip check` | Verify integrity of installed packages |
| `uv build` | Create distribution packages |
| `uv pip list` | List installed packages |

### 9.2. Key Advantages Over Traditional Workflows

1. **Faster Installation**: UV is significantly faster than pip for dependency resolution and installation
2. **Automatic Environment Management**: `uv run` ensures your environment always matches your dependencies
3. **Integrated Lockfile System**: Native dependency locking without additional tools
4. **Simplified Workflow**: Fewer manual steps to maintain a consistent environment
5. **Better Dependency Resolution**: More reliable resolution of complex dependency trees

---

This reference document covers the essential workflows for Python development with Astral UV. For more detailed information on specific commands and options, refer to the [official UV documentation](https://github.com/astral-sh/uv).
