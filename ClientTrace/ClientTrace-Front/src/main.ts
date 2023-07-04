import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Injector } from '@angular/core';
import { TraceService } from './app/services/trace.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const injector: Injector = moduleRef.injector;
    const traceService = injector.get(TraceService);
    traceService.getTraces().subscribe(
      traces => console.log(traces),
      error => console.error('An error occurred', error)
    );
  })
  .catch(err => console.error(err));
