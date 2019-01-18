import { access } from "./access";

describe('Access service. ', () => {
  it('should return nothing.', async () => {
    const response = await access();

    expect(response).not.toBeDefined();
  });
});
