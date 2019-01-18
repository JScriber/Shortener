import { access } from "./access";

describe('Access service. ', () => {
  it('should return nothing.', async () => {
    const response = await access();

    expect(response).not.toBeDefined();
  })
  // it('should return string.', async () => {
  //   const response = await access();

  //   console.log(response);

    // expect(response).toBe(typeof(response) === String);
  // })
});
