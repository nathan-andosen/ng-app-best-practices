# Angular App Best Practices

This repo highlights common best practices and personal opinions when building frontend web apps. A lot of the topics could be related to any frontend framework, but we do focus on Angular.

Angular version: __8.x.x__

## Application Structure

Most of the time, your app will grow to a medium to large size application. It's best to have a structure that is easy to understand and flexible enough to keep growing. A good way to accomplish this is to separate your code into different modules. Its recommended to have 1 core module, 1 shared module and many feature modules. Below is a description of each:

#### Core Module:

* The Core Module is only imported into the App Module
* Located at _/src/app/core_
* All your singleton services used throughout the app are located here. However, you do not need to provide them into the module, you can use the ``providedIn: 'root'`` functionality on the service (Angular 6+).
* Single instance components can go in the Core Module, such as, the main header that is used in the app.component.html file.
* Top level routing
* The Core Module can also contain: app-wide constants, decorators, app-wide models.

#### Shared Module:

* Common components, pipes, directives that will be used throughout your app
* Can also import and export other third party modules used throughout your app, such as the FormsModule or modules from PrimeNg and so on.
* Do not import the shared module into your App Module (or Core Module ??)
* No app-wide singleton services should be in the Shared Module, they go in the Core Module

#### Feature Modules:

* Different features that make up the application
* Feature Modules can be large sub-sections of the app containing their own components, routing, pages, services, models and so on.
* Feature Modules should be lazy loaded via routing

#### Module architecture diagram:

![module architecture diagram](docs/images/module-arch.png)

### FAQ's about module structure

#### What happens if I have a component in the Shared module that I want to use in the Core module? For example, I want to use the [button](src/app/shared/components/ui/button/button.component.ts) component inside the [header](src/app/core/components/header/header.component.ts) component.

Simply import the Shared module into the Core module. The Angular compiler will only include the app-button component into the main.js dist file, it will not include the [large-size](src/app/shared/components/large-size/large-size.component.ts) component into the main.js dist file. To test this out, you can simple do a build of this project ``npm run build`` and check the size of the main.js file. Then, add the ``<app-large-size></app-large-size>`` tag into the [header](src/app/core/components/header/header.component.ts) component and do another build. You should notice the main.js file being larger, around 60kb, as this is the size of the large-size component.

## Shorten & improve import statements

#### _Best practice one:_

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

#### _Best practice two:_

Use an index.ts file to export all code. For example, in [/src/app/core/services/index.ts](src/app/core/services/index.ts) we export all services. This allows us to write import statements like: 

```typescript
import { WebWorkerService } from '@core/services';
```

## Styling & Scss

#### Best Practices:

* Each component should have its own style file, use this to style the component
* Place all global styles into _/src/styles_. Update your [angular.json](angular.json) file to add a __stylePreprocessorOptions__ option. This allows you to do short import statements, like: ``@import "variables";``
* Use scss variables. Create a [_variables.scss](src/styles/_variables.scss) in the _/src/styles/_ directory. Place all variables in here. You can now import them in any file like: ``@import "variables";``
* Use a size base value variable, like the one in the [_variables.scss](src/styles/_variables.scss) file. This is used for all your spacing and structure styling.

## Handling Events

There are many ways to handle events, some of the topics below are not really best practices but more personal opinion.

### App wide events / Global event hub

Sometimes you may need your app to have a global app wide event hub. One way to accomplish this is to use a [global events service](src/app/core/services/global-events.service.ts), this service uses a pub/sub events manager: [event-manage](https://github.com/nathan-andosen/event-manager). You can see in the [header component](src/app/core/components/header/header.component.ts) an example of emitting an event. You can see in the [home component](src/app/features/home/home-page.component.ts) an example of listening to an event (this uses a decorator, which automatically subscribes and unsubscribes for us).

### Component to Component - or - Service to Service communication

Sometimes you may want two or more components to communicate with each other (not parent / child components). To handle this, we can simple use a service that is used to emit events and both components can listen to these events. There is a couple of ways you can add events to your service, look at the [auth service](src/app/core/services/auth.service.ts) for examples.

### Parent & Child component communication

Parent components should pass data to child components via attributes. Child components should fire events up to parent components. This is a common best practice. However, if for any reason this does not meet your requirements, you could use a service (as mentioned above) to handle the communication.

## Building better components

* Least amount of injected dependencies
* No business logic, this goes in a service

### Smart vs Dumb components

__Dumb components:__

* Presentaional only, used to display data
* Delegate user interaction up to smart components via events
* Data is normally passed to dumb components via attributes
* Great for re-uasability

__Smart Components:__

* Will contain business logic, not directly, this should be done in a service, and the smart component will use this service.
* Pass data to dumb components
* React to events from dumb components
* Are top level routable components (pages)

