import { encrypt, create } from './create'

describe('Encrypt service. ', () => {
    it("should return something that I don't know", async () => {
        const response = await encrypt();

        console.log(response);

        expect(response).toBe(Object);
    })
})
