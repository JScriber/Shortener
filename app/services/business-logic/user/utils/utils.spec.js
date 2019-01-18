import { checkCredentials } from './utils'

describe('checkcredentials device. ', () => {
    // no parameters
    it("should return false", async () => {
        const response = await checkCredentials();

        expect(response).toBeFalsy();
    })

    // one parameter : NULL, ==0, >0
    it("should return false", async () => {
        const response = await checkCredentials(null);

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('');

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('Utilisateur');

        expect(response).toBeFalsy();
    })

    // two parameters : NULL/NULL, NULL/==0, NULL/>0,
    // ==0/NULL, ==0/==0, ==0/>0, >0/NULL, >0/==0, >0/>0
    it("should return false", async () => {
        const response = await checkCredentials(null, null);

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials(null, '');

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials(null, 'P@ssword');

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('', null);

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('', '');

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('', 'P@ssword');

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('Utilisateur', null);

        expect(response).toBeFalsy();
    })
    it("should return false", async () => {
        const response = await checkCredentials('Utilisateur', '');

        expect(response).toBeFalsy();
    })
    it("should return true", async () => {
        const response = await checkCredentials('Utilisateur', 'P@ssword');

        expect(response).not.toBeFalsy();
    })
})
