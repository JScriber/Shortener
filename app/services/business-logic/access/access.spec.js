import { accessLink } from "./access";

describe('Access service. ', () => {
  it('should return nothing.', async () => {
    const response = await accessLink();

    expect(response).not.toBeDefined();
  });
});
