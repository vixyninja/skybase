import {Controller, Get} from '@nestjs/common';

@Controller('')
export class AppController {
  constructor() {}

  @Get('hello-world')
  helloWorld() {
    return 'Hello, world!';
  }
}
