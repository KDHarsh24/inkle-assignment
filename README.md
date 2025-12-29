inkle — Local taxes table (React + Vite)

Small, responsive React app showing a data table with filters and an edit modal.

Quickstart
---------

Prerequisites
- Node.js 20.19+ or 22.12+ (if you see a Node warning, upgrade Node or use a compatible version)

Install and run locally

```bash
npm install
npm run dev    # start dev server with HMR
npm run build  # build production bundle
npm run preview # preview built site locally
```

Project structure (important files)
- `src/App.jsx` — app root and data loading
- `src/components/Navbar` — top bar and theme toggle
- `src/components/Table/DataTable.jsx` — main table UI (uses `@tanstack/react-table`)
- `src/components/Table/DataTable.css` — table styles and responsive rules
- `src/components/FilterMenu/FilterDropdown.jsx` — column filter dropdown
- `src/components/EditModal` — modal UI for editing rows
- `src/utils/getUniqueValues.js` — simple helper to derive filter options

How to use the table and components
----------------------------------
- The table accepts props in `DataTable`:
  - `data` (array): rows to render
  - `onEdit` (fn): called with the row object when Edit is clicked
  - `columnFilters`, `setColumnFilters`: tanstack state plumbing for filters
- Filters: open the filter button in the header to multi-select values. Filters are normalized by `getUniqueValues`.
- Edit modal: handled by `EditModal`. `onEdit` opens the modal; `onSave` should persist changes (the example app calls `updateTax`).

Styling and responsiveness
-------------------------
- CSS variables control light/dark themes (`data-theme` on the `document.documentElement`).
- The table is responsive:
  - On small screens the table becomes horizontally scrollable inside its container (sticky headers remain visible).
  - Horizontal scrollbar is hidden visually on phones while scrolling remains functional.
  - The last column (actions) is fixed width to avoid layout jump; other columns use equal percentage widths and truncate overflow with ellipsis.
- Vertical dividers: subtle gradient dividers are applied between columns and headers for a clean look.

Troubleshooting
---------------
- If `npm run dev` fails with a Node version warning, upgrade Node to a supported version (20.19+ or 22.12+). You can also use `nvm` to switch Node versions.
- If styles look off after edits, run a full rebuild: `npm run build` then `npm run preview` to verify production styles.

Contributing / Extending
------------------------
- To add columns, update `src/components/Table/DataTable.jsx` and add corresponding `col` in the `<colgroup>` if you need a fixed width.
- For complex filters, create a new filter component in `src/components/FilterMenu` and hook it into the column's `filterFn`.

Contact
-------
If you want more adjustments (different column widths, alternate mobile breakpoint, or a different edit UI), tell me which file and I will patch it.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
