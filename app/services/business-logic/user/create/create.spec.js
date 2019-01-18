import { encrypt, create } from './create'

describe('Encrypt service. ', () => {
  it("should salt and password", async () => {
    const { hash, salt } = await encrypt('password');

    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });
})
