# How to Preview the Website Locally

This is a Jekyll static site. Here's how to preview it locally on Windows, Linux, or macOS:

## Prerequisites

### Installing Ruby

Choose your operating system:

#### Windows

1. **Install Ruby using winget** (Windows Package Manager):
   ```powershell
   winget install RubyInstallerTeam.RubyWithDevKit.3.3 --accept-package-agreements --accept-source-agreements
   ```
   
   **OR** download manually:
   - Download from: https://rubyinstaller.org/
   - Choose the Ruby+Devkit version for Windows
   - During installation, check "Add Ruby executables to your PATH"

2. **Verify installation**:
   ```powershell
   ruby --version
   ```

#### Linux (Ubuntu/Debian)

1. **Install Ruby and build dependencies**:
   ```bash
   sudo apt update
   sudo apt install ruby-full build-essential zlib1g-dev
   ```

2. **Verify installation**:
   ```bash
   ruby --version
   ```

**For other Linux distributions:**
- **Fedora/RHEL**: `sudo dnf install ruby ruby-devel gcc make`
- **Arch Linux**: `sudo pacman -S ruby`
- **openSUSE**: `sudo zypper install ruby-devel gcc make`

#### macOS

1. **Using Homebrew** (recommended):
   ```bash
   brew install ruby
   ```

2. **OR using the system Ruby** (usually pre-installed):
   ```bash
   ruby --version
   ```
   
   Note: If you use Homebrew, you may need to add it to your PATH. Add this to your `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
   ```

3. **Install Xcode Command Line Tools** (if not already installed):
   ```bash
   xcode-select --install
   ```

### Installing Bundler

Bundler usually comes with Ruby, but if needed:

```bash
gem install bundler
```

**Windows**: Run in PowerShell  
**Linux/Mac**: Run in your terminal

## Steps to Preview

These steps work on all platforms:

1. **Navigate to the project directory**:
   ```bash
   cd path/to/auralis-partners.github.io
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```
   This will install Jekyll and all required gems from the Gemfile.

3. **Start the Jekyll server**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**:
   - The site will be available at: `http://localhost:4000`
   - Jekyll will automatically rebuild when you make changes to files

## Optional: Watch for Changes

The `jekyll serve` command automatically watches for file changes and rebuilds. To see verbose output:
```bash
bundle exec jekyll serve --verbose
```

To specify a different port:
```bash
bundle exec jekyll serve --port 4001
```

## Troubleshooting

- **If `bundle` command is not found**: Make sure Ruby is installed and added to your PATH
  - **Windows**: Restart your terminal or run: `refreshenv`
  - **Linux/Mac**: Make sure Ruby's bin directory is in your PATH (usually `/usr/local/bin` or `~/.gem/ruby/x.x.x/bin`)
  
- **If port 4000 is in use**: Use a different port with `bundle exec jekyll serve --port 4001`

- **If dependencies fail**: Try running `bundle update` first

- **Linux: "zlib not found" error**: Install zlib development headers:
  ```bash
  sudo apt install zlib1g-dev  # Ubuntu/Debian
  ```

- **macOS: "Unable to build native extensions"**: Make sure Xcode Command Line Tools are installed:
  ```bash
  xcode-select --install
  ```

- **Permission errors on Linux/Mac**: Avoid using `sudo` with gem install. If needed, use a Ruby version manager like `rbenv` or `rvm`

## Stop the Server

Press `Ctrl+C` (or `Cmd+C` on Mac) in the terminal to stop the Jekyll server.

## Additional Resources

- Jekyll Documentation: https://jekyllrb.com/docs/
- Ruby Installation Guide: https://www.ruby-lang.org/en/documentation/installation/
