import { fullURL } from './create';

describe('Create service.', () => {
  it('should return an URL.', () => {
    const response = fullURL('test');

    expect(response).toBeDefined();
  });
});
