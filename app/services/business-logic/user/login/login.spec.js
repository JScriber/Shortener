
import { getToken, login } from "./login"

describe('genToken advice. ', () => {
    it("should return token", async () => {
        const response = await getToken(1, "user_name", "wrnonjkdbhwsn");

        expect(typeof response).toBe('string');
    })
    it("should return same token", async () => {
        const response_A = await getToken(2, "another_user_name", "jbdkbldwuvb");
        const response_B = await getToken(2, "another_user_name", "jbdkbldwuvb");

        expect(response_A).toBe(response_B);
    })
})
