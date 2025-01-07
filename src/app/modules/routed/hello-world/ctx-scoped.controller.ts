import { controller, RequestContext } from '@ditsmod/core';
import { route } from '@ditsmod/routing';
import { SomeService } from './some.service.js';

@controller({ scope: 'ctx' })
export class CtxScopedController {
  constructor(private someService: SomeService) {}

  @route('GET', 'hello2')
  tellHello(ctx: RequestContext) {
    const msg = this.someService.getMsg();
    ctx.send(msg);
  }

  @route('POST', 'body2')
  postHello(ctx: RequestContext) {
    ctx.sendJson(ctx.body);
  }

  @route('GET', 'throw-error2')
  thrwoError() {
    throw new Error('Here some error occurred');
  }
}
