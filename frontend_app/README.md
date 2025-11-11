# Angular Recipe Explorer (Ocean Professional theme)

A responsive Angular app to browse, search, and view recipe details.

## Routing
- `/` Recipe list with search
- `/recipe/:id` Recipe detail page

## Environment configuration (no hardcoded URLs)
The app reads API endpoints from environment variables. The RecipeService resolves in this order:
1. `NG_APP_API_BASE`
2. `NG_APP_BACKEND_URL`
If neither is set, the app automatically falls back to an in-memory data set for preview purposes.

You can inject them as global variables or via your deployment environment.

Examples:
```html
<!-- index.html snippet to define at runtime (optional) -->
<script>
  window.NG_APP_API_BASE = 'https://api.example.com';
  // or
  window.NG_APP_BACKEND_URL = 'https://backend.example.com';
</script>
```

Expected REST endpoints when using a real API:
- GET `${NG_APP_API_BASE}/recipes` -> Recipe[]

The app will show a subtle note if the API fails and will fall back to mock data.

## Theme
Ocean Professional colors:
- Primary: #2563EB
- Secondary (accent): #F59E0B
- Error: #EF4444
The UI uses rounded corners, subtle shadows, and smooth transitions.

## Development
- Start: `npm start` (already configured for port 3000 in angular.json)
- Build: `npm run build`

## Accessibility
- Semantic HTML elements (header, main, nav)
- Alt text for images
- aria-labels for navigation and actions
