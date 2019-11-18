# Angular App Best Practices

## Application Structure

TODO:

### Shorten & improve import paths

Inside your tsconfig.json file, add the paths property:

```javascript
{
  "compilerOptions": {
    "baseUrl": "./",
    ...
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"],
      "@utilities/*": ["src/app/utilities/*"]
    }
  }
}
```

Now you can import like:

```typescript
import { CoreModule } from '@core/core.module';
```