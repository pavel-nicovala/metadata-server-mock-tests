import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import Ajv from 'ajv';

dotenv.config();

const URL = process.env.URL;
if (!URL) {
  throw new Error('Error: URL environment variable is not set.');
}

const request = supertest(URL);

const ajv = new Ajv({
  strictTuples: false, 
  allErrors: true,    
  verbose: true        
});

describe('Metadata Server API', () => {
  test('Query:[POST] - /metadata/query', async () => {
    const fixturePath = path.resolve(__dirname, './fixtures/fixture.json');
    const requestData = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    const schemaPath = path.resolve(__dirname, './schemas/query.schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schema);

    const response = await request
      .post('/metadata/query')
      .set('Content-Type', 'application/json')
      .send(requestData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    
    const isValid = validate(response.body);
    if (!isValid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(isValid).toBe(true);
  });

  test('Metadata:[GET] - /metadata/*', async () => {
    const fixturePath = path.resolve(__dirname, './fixtures/fixture.json');
    const { id } = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    const schemaPath = path.resolve(__dirname, './schemas/metadata.schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schema);

    const response = await request
      .get(`/metadata/${id}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.subject).toBe(id);
    expect(typeof response.body).toBe('object');
    
    const isValid = validate(response.body);
    if (!isValid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(isValid).toBe(true);
  });

  test('Property:[GET] - /metadata/*/properties/name', async () => {
    const fixturePath = path.resolve(__dirname, './fixtures/fixture.json');
    const { id } = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    const schemaPath = path.resolve(__dirname, './schemas/property.schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schema);

    const response = await request
      .get(`/metadata/${id}/properties/name`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    
    const isValid = validate(response.body);
    if (!isValid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(isValid).toBe(true);
  });
}); 