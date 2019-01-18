
import { getToken, login } from "./login"

describe('Encrypt service. ', () => {
    it("should return something that I don't know", async () => {
        const response = await getToken();

        console.log(response);

        expect(response).toBe(Object);
    })
})
