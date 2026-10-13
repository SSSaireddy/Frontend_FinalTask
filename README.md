# SpiceRoute Restaurant App

A React + Vite restaurant frontend assignment project.

## Run locally
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed in the terminal.

## Verify
- `npm run build`

## Deploy to Netlify
1. Push the project to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy. `netlify.toml` already includes an SPA redirect for React Router.

## Assignment concept map
- Components & props: `src/components/FoodCard.jsx`, `Navbar.jsx`
- useState: Menu search/filter, Admin form, Contact form
- useEffect: `src/pages/Discover.jsx` API request; persisted data hook
- useRef: search input focus in Menu
- useContext: `src/context/ToastContext.jsx`
- useReducer: `src/reducers/contactReducer.js`
- Conditional/list rendering: menu, cart, orders, API results
- API integration: DummyJSON recipes in Discover page
- Custom hook: `src/hooks/useLocalStorage.js`
- Routing / nested route / useParams / useSearchParams: `src/App.jsx`, `Menu.jsx`, `FoodDetails.jsx`
- Redux Toolkit: cart state in `src/features/cart/cartSlice.js`
- CRUD: Admin page creates, reads, updates and deletes food items
- Form validation: Contact and checkout forms
- Responsive UI: `src/styles.css`

Note: this is a frontend demo. Cart, menu edits and orders are stored in the current browser using localStorage. It does not process real payments or securely authenticate admins.
