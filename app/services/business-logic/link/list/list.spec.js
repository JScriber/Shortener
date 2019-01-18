import { list } from "./list";

describe('Access service. ', () => {
  it('should return nothing.', async () => {
    const response = await list();

    expect(response).not.toBeDefined();
  });
});
