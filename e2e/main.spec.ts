import request from 'supertest';
import { TestApplication } from '@ditsmod/testing';
import { HttpServer, Providers, Status } from '@ditsmod/core';
import { afterAll, beforeAll, describe, it, vi } from 'vitest';
import { BodyParserConfig } from '@ditsmod/body-parser';

import { AppModule } from '#app/app.module.js';

describe('Integration tests for HelloWorldController', () => {
  let server: HttpServer;
  let testAgent: ReturnType<typeof request>;

  beforeAll(async () => {
    vi.restoreAllMocks();
    const providers = new Providers().useValue<BodyParserConfig>(BodyParserConfig, { jsonOptions: { limit: '9b' } });

    server = await TestApplication.createTestApp(AppModule, { path: 'api' }).overrideModuleMeta([...providers]).getServer();
    testAgent = request(server);
  });

  afterAll(() => {
    server.close();
  });

  it('controller works', async () => {
    await testAgent.get('/api/hello').expect(200).expect('Hello World!');
  });

  it('should parsed post', async () => {
    await testAgent.post('/api/body').send({ one: 1 }).expect(200).expect({ one: 1 });
  });

  it('should throws an error when the set request body limit is exceeded', async () => {
    await testAgent.post('/api/body').send({ one: 1, two: 2 }).expect(Status.PAYLOAD_TO_LARGE);
  });

  it('should throw an error', async () => {
    await testAgent.get('/api/throw-error').expect(Status.INTERNAL_SERVER_ERROR);
  });

  it('context-scoped controller works', async () => {
    await testAgent.get('/api/hello2').expect(200).expect('Hello World!');
  });

  it('context-scoped controller should parsed post', async () => {
    await testAgent.post('/api/body2').send({ one: 1 }).expect(200).expect({ one: 1 });
  });

  it('singleton should throws an error when the set request body limit is exceeded', async () => {
    await testAgent.post('/api/body2').send({ one: 1, two: 2 }).expect(Status.PAYLOAD_TO_LARGE);
  });

  it('context-scoped controller should throw an error', async () => {
    await testAgent.get('/api/throw-error2').expect(Status.INTERNAL_SERVER_ERROR);
  });
});
