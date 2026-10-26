# Form Pendaftaran Interaktif

A lightweight, modern, and accessible client-side registration form built with vanilla JavaScript (ES Modules), HTML5, and standard browser form features.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Validation Rules](#validation-rules)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## Overview

This project implements a real-time interactive user registration form. It demonstrates modern front-end practices such as modular JavaScript (ES Modules), dynamic UI state updates, input masking/types, and accessibility (ARIA) attributes for live error reporting.

---

## Features

- **Real-Time Input Validation**: Form fields validate dynamically as the user types.
- **Cross-Field Validation**: Automatically re-evaluates password confirmation whenever the primary password changes.
- **Accessibility Ready**: Built using semantic HTML5 elements and `aria-live`, `aria-describedby`, and `aria-invalid` attributes.
- **Modular Codebase**: Clean separation of validation logic (`aturan.js`) from DOM manipulation and event orchestration (`app.js`).
- **Dynamic Submit Control**: The submission button remains disabled until all fields satisfy validation requirements.

---

## Project Structure

```text
├── index.html     # Main HTML form structure
├── js/
│   ├── app.js     # DOM handlers & form event management
│   └── aturan.js  # Modular validation rule definitions
└── README.md      # Project documentation
```

---

## Validation Rules

| Field | Rule Description | Error Message |
| :--- | :--- | :--- |
| **Nama** | Minimum 3 non-whitespace characters | `Nama minimal 3 karakter.` |
| **Email** | Standard email address format (`name@domain.com`) | `Format email tidak valid.` |
| **Nomor HP** | Must start with `08` and contain 10–13 total digits | `Nomor HP diawali 08 dan 10-13 digit.` |
| **Password** | Minimum 8 characters with at least one letter and one number | `Sandi minimal 8 karakter, kombinasi huruf dan angka.` |
| **Konfirmasi Password** | Must match the value in the Password field | `Konfirmasi sandi tidak cocok.` |

---

## Installation & Setup

Because the application uses native **ES Modules** (`import` / `export`), opening `index.html` directly via `file://` in a browser may trigger CORS restrictions. Running a local HTTP web server is recommended.

### Prerequisites
- Node.js (with `npx`) **OR** VS Code with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

### Running Locally

#### Option 1: Using Python
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

#### Option 2: Using Node.js / `npx`
```bash
npx serve .
```

#### Option 3: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

---

## Usage

1. Fill out each field in the registration form.
2. If an input is invalid, an error message will display immediately below the corresponding field.
3. Once all fields pass validation, the **Kirim** button will automatically unlock.
4. Click **Kirim** to submit. A success summary message will display at the bottom, and the form will reset.