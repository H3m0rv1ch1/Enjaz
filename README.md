# Enjaz App - Team Performance Tracking System

<div align="center">
  <img src="Public/icon/icon.svg" alt="Enjaz Logo" width="128" height="128">
  
  <h3>🚀 Comprehensive system for team performance tracking, task management, and interaction evaluation with a modern and easy touch</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Tauri](https://img.shields.io/badge/Tauri-2.0-24C8DB.svg)](https://tauri.app/)
  [![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg)](https://www.typescriptlang.org/)
  [![GitHub release](https://img.shields.io/github/v/release/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/releases)
  [![GitHub stars](https://img.shields.io/github/stars/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/stargazers)
  
</div>

---

## 📋 Overview

**Enjaz** is an advanced desktop application built with **Tauri** and **React**, specifically designed to help managers and team leaders track their team members' performance in a professional and efficient way.

🎯 **Goal**: Simplify team management and performance evaluation through a modern and easy-to-use interface

💡 **Special**: Full Arabic language support with professional RTL design and advanced export capabilities

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎯 Team Management
- ✅ Add and manage team members easily
- ✅ Track each member's information in one place
- ✅ Quick search interface to find members
- ✅ Delete and edit member data

### 📊 Performance Evaluation
- ✅ Set interaction levels (Active, Intermediate, Beginner)
- ✅ Add detailed notes for each member
- ✅ Numerical rating system from 1-10
- ✅ Track performance development

</td>
<td width="50%">

### ✅ Task Management
- ✅ Create general tasks for the team
- ✅ Track each member's completion of different tasks
- ✅ Easy interface to update task status
- ✅ Delete and edit tasks

### 📄 Report Export
- ✅ Export PDF reports ready for printing
- ✅ Export Excel data for advanced analysis
- ✅ Professional report design
- ✅ Automatic file naming with date

</td>
</tr>
</table>

### 🎨 Outstanding User Experience
- 🌟 **Modern Interface**: Contemporary and responsive design
- 🇸🇦 **Arabic Support**: Full Arabic language support with professional RTL layout
- 🎯 **Onboarding Tour**: Interactive guide for new users
- 📱 **Responsive**: Works smoothly on all screen sizes
- ⚡ **Fast**: High performance with Tauri

## 🛠️ Technologies Used

<div align="center">

| Technology | Version | Description |
|------------|---------|-------------|
| ![Tauri](https://img.shields.io/badge/Tauri-2.0-24C8DB?style=for-the-badge&logo=tauri) | 2.0 | Desktop application framework |
| ![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react) | 18.3 | User interface library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript) | 5.8 | Typed programming language |
| ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss) | Latest | CSS framework |
| ![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite) | 6.2 | Build and development tool |

</div>

### 📚 Additional Libraries
- **@react-pdf/renderer**: For PDF file generation
- **XLSX**: For Excel file export
- **Lucide React**: Icon library
- **React Router**: For page navigation
- **UUID**: For generating unique identifiers

## 📦 Installation and Setup

### 🔧 Prerequisites

<table>
<tr>
<td align="center">
<img src="https://nodejs.org/static/images/logo.svg" width="50"><br>
<strong>Node.js</strong><br>
Version 18+
</td>
<td align="center">
<img src="https://www.rust-lang.org/static/images/rust-logo-blk.svg" width="50"><br>
<strong>Rust</strong><br>
For development
</td>
<td align="center">
<img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" width="50"><br>
<strong>Git</strong><br>
For version control
</td>
</tr>
</table>

### ⚡ Quick Installation

```bash
# 1. Clone the project
git clone https://github.com/H3m0rv1ch1/enjaz.git
cd enjaz

# 2. Install dependencies
npm install

# 3. Run the application
npm run tauri:dev
```

### 🏗️ Production Build

```bash
# Build the application for distribution
npm run tauri:build

# You'll find the files in:
# src-tauri/target/release/bundle/
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend development server |
| `npm run tauri:dev` | Run application with Tauri |
| `npm run build` | Build frontend |
| `npm run tauri:build` | Build complete application |
| `npm run preview` | Preview build |

## 📁 Project Structure

```
enjaz/
├── src-tauri/              # Tauri files
│   ├── src/               # Rust code
│   ├── icons/             # Application icons
│   └── tauri.conf.json    # Tauri configuration
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard
│   ├── WelcomePage.tsx    # Welcome page
│   ├── MemberCard.tsx     # Member card
│   ├── AddMemberForm.tsx  # Add member form
│   ├── TaskManagerCard.tsx # Task management
│   ├── OnboardingTour.tsx # Onboarding tour
│   └── PDFDocument.tsx    # PDF generator
├── utils/                 # Helper utilities
├── Public/               # Public files
│   ├── icon/             # Icons
│   └── manifest.json     # PWA settings
├── types.ts              # TypeScript definitions
├── constants.ts          # Constants
└── App.tsx              # Main component
```

## 🎯 How to Use

<div align="center">

### 🚀 Get Started in 4 Simple Steps

</div>

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.icons8.com/fluency/96/add-user-group-man-man.png" width="64"><br>
<strong>1. Add Members</strong><br>
Use the "Add New Member" form to insert your team names
</td>
<td align="center" width="25%">
<img src="https://img.icons8.com/fluency/96/task.png" width="64"><br>
<strong>2. Manage Tasks</strong><br>
Add required tasks through the "Task Management" section
</td>
<td align="center" width="25%">
<img src="https://img.icons8.com/fluency/96/rating.png" width="64"><br>
<strong>3. Evaluate Performance</strong><br>
Set interaction levels and add detailed notes
</td>
<td align="center" width="25%">
<img src="https://img.icons8.com/fluency/96/export.png" width="64"><br>
<strong>4. Export Reports</strong><br>
Get PDF or Excel reports ready for use
</td>
</tr>
</table>

### 📋 Detailed Guide

<details>
<summary><strong>📝 Member Management</strong></summary>

- Add new members easily
- Edit existing member data
- Delete unwanted members
- Quick search for members

</details>

<details>
<summary><strong>✅ Task Management</strong></summary>

- Create general tasks for the team
- Track completion status of each task
- Update task status (completed/incomplete)
- Delete finished tasks

</details>

<details>
<summary><strong>📊 Performance Evaluation</strong></summary>

- **Interaction Levels**: Active, Intermediate, Beginner
- **Notes**: Add detailed comments
- **Numerical Rating**: From 1 to 10
- **Tracking**: Monitor performance development

</details>

<details>
<summary><strong>📄 Reports</strong></summary>

- **PDF**: Professional report ready for printing
- **Excel**: Organized data for analysis
- **Auto-naming**: With current date
- **Design**: Professional unified template

</details>

## 🤝 Contributing

<div align="center">

### 💡 We Welcome Your Contributions!

[![Contributors](https://img.shields.io/github/contributors/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/pulls)

</div>

### 🚀 How to Contribute

```bash
# 1. Fork the project
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/enjaz.git

# 3. Create a new branch
git checkout -b feature/amazing-feature

# 4. Make your changes and push
git commit -m 'Add some amazing feature'
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

### 📋 Types of Contributions Welcome

- 🐛 **Bug Fixes**: Improve stability
- ✨ **New Features**: Add useful functionality  
- 📚 **Documentation**: Improve explanations and guides
- 🎨 **Design**: Enhance user interface
- 🌍 **Translation**: Support additional languages
- ⚡ **Performance**: Improve speed and efficiency

See [Contributing Guide](CONTRIBUTING.md) for complete details.

## 🐛 Issue Reporting and Support

<div align="center">

[![Issues](https://img.shields.io/github/issues/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/issues)
[![Closed Issues](https://img.shields.io/github/issues-closed/H3m0rv1ch1/enjaz.svg)](https://github.com/H3m0rv1ch1/enjaz/issues?q=is%3Aissue+is%3Aclosed)

</div>

### 🆘 How to Get Help

| Issue Type | Action |
|------------|--------|
| 🐛 **Application Bug** | [Open Bug Report](https://github.com/H3m0rv1ch1/enjaz/issues/new?template=bug_report.md) |
| 💡 **Feature Suggestion** | [Open Feature Request](https://github.com/H3m0rv1ch1/enjaz/issues/new?template=feature_request.md) |
| ❓ **General Question** | [Open Discussion](https://github.com/H3m0rv1ch1/enjaz/discussions) |
| 📖 **Documentation Issue** | [Open Issue](https://github.com/H3m0rv1ch1/enjaz/issues/new) |

### 🔍 Before Reporting an Issue

- ✅ Make sure the issue hasn't been reported before
- ✅ Try restarting the application
- ✅ Make sure you're using the latest version
- ✅ Gather system information (OS, browser, version)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

<div align="center">

<img src="https://github.com/H3m0rv1ch1.png" width="100" height="100" style="border-radius: 50%;">

### **H3m0rv1ch1**

[![GitHub](https://img.shields.io/badge/GitHub-H3m0rv1ch1-181717?style=for-the-badge&logo=github)](https://github.com/H3m0rv1ch1)
[![Profile Views](https://komarev.com/ghpvc/?username=H3m0rv1ch1&style=for-the-badge)](https://github.com/H3m0rv1ch1)

*Passionate developer focused on desktop and web applications*

</div>

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Amazing framework for desktop applications
- [React](https://reactjs.org/) - User interface library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

<div align="center">
  <p>Made with ❤️ by H3m0rv1ch1</p>
  <p>If you like this project, don't forget to give it a ⭐</p>
</div>
