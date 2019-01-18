import { checkCredentials } from './utils'

describe('checkcredentials device. ', () => {
    it("should return nothing", async () => {
        const response = await checkCredentials();

        expect(response).not.toBeDefined();
    })
    it("should return false", async () => {
        const response = await checkCredentials();

        expect(response).toBeFalsy();
    })
    it("should return true", async () => {
        const response = await checkCredentials();

        expect(response).not.toBeFalsy();
    })
})
