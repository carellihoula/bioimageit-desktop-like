[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# Desktop-like Interface for BioImageIT

A modern, desktop-inspired interface for BioImageIT, built with React, Tailwind CSS, and Dockview. This project aims to provide a familiar, flexible, and extensible UI for interacting with bioimage data, workflows, and tools in a single application window.

## Features

- **Dockable Panels**: Rearrange panels (Explorer, Workflow Manager, Execution Controls, Code Server, etc.) using drag-and-drop.
- **File Explorer**: Tree-based file navigator with file icons based on extensions.
- **Workflow Manager**: Browse, select, and manage multiple bioimage workflows.
- **Execution Controls**: Run, clear, and mark nodes in a workflow as executed.
- **Code Server Panel**: Embedded code editor or server within a panel.
- **Responsive Layout**: Adapts panel sizes for smaller screens.
- **Custom Menu Bar**: Desktop-like menu bar (File, Tools, Help) with hover-activated dropdowns.
- **Theming**: Light and dark themes via CSS variables and Tailwind configs.

## Tech Stack

- [React](https://reactjs.org/) for the UI framework.
- [Vite](https://vitejs.dev/) as the build tool.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- [Dockview](https://dockview.dev/) for dockable panel management.
- [Chakra UI](https://chakra-ui.com/) for reusable components.
- [Lucide React](https://lucide.dev/icons/) for iconography.
- [React Icons](https://react-icons.github.io/react-icons/) for file and menu icons.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://gitlab.inria.fr/cntsoumo/bioimageit-desktop-like.
   cd bioimageit-desktop-like
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   **_or using pnpm_**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   **_or using pnpm_**

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:5173` (or the port shown) to see the app.

## Usage

- **Drag panels** by their title bars to dock, float, or rearrange.
- **Open workflows** from the Workflow Manager panel.
- **Run nodes** using the Execution Controls panel.
- **Browse files** in the Explorer panel; double-click or context-click for actions.
- **Access menu** items (File, Tools, Help) via the top menu bar.

## Configuration

- **Tailwind Config**: Customize colors and theme in `tailwind.config.js`.
- **Dockview Theme**: Toggle between light (`dockview-theme-light`) and dark (`dockview-theme-dark`) by changing the CSS class on the root `<DockviewReact>` component.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
