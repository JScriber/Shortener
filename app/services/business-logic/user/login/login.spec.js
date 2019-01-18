import { genToken } from "./login";

describe('genToken advice.', () => {
  it('should return a string', async () => {
    const response = await genToken(1, 'user_name', 'wrnonjkdbhwsn');

    expect(typeof response).toBe('string');
  })
  it('should return the same token', async () => {
    const response_A = await genToken(2, 'another_user_name', 'jbdkbldwuvb');
    const response_B = await genToken(2, 'another_user_name', 'jbdkbldwuvb');

    expect(response_A).toEqual(response_B);
  })
})
