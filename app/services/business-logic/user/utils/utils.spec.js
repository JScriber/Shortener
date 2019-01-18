import { checkCredentials } from './utils'

describe('checkcredentials device. ', () => {
    // no parameters
    it('no parameters should return false', async () => {
        const response = await checkCredentials();

        expect(response).toBeFalsy();
    })

    // one parameter
    it('one parameter "NULL" should return false', async () => {
        const response = await checkCredentials(null);

        expect(response).toBeFalsy();
    })
    it('one string parameter empty should return false', async () => {
        const response = await checkCredentials('');

        expect(response).toBeFalsy();
    })
    it('one string parameter should return false', async () => {
        const response = await checkCredentials('Utilisateur');

        expect(response).toBeFalsy();
    })

    // two parameters
    it('two parameters "NULL" should return false', async () => {
        const response = await checkCredentials(null, null);

        expect(response).toBeFalsy();
    })
    it('one parameter "NULL" and one string parameter empty should return false', async () => {
        const response = await checkCredentials(null, '');

        expect(response).toBeFalsy();
    })
    it('one string parameter and one parameter "NULL" should return false', async () => {
        const response = await checkCredentials(null, 'P@ssword');

        expect(response).toBeFalsy();
    })
    it('one parameter "NULL" and one string parameter empty should return false', async () => {
        const response = await checkCredentials('', null);

        expect(response).toBeFalsy();
    })
    it('two string parameter empty should return false', async () => {
        const response = await checkCredentials('', '');

        expect(response).toBeFalsy();
    })
    it('one string parameter and one string parameter empty should return false', async () => {
        const response = await checkCredentials('', 'P@ssword');

        expect(response).toBeFalsy();
    })
    it('one string parameter and one parameter "NULL" should return false', async () => {
        const response = await checkCredentials('Utilisateur', null);

        expect(response).toBeFalsy();
    })
    it('one string parameter and one string parameter empty should return false', async () => {
        const response = await checkCredentials('Utilisateur', '');

        expect(response).toBeFalsy();
    })
    it('two string parameters should return true', async () => {
        const response = await checkCredentials('Utilisateur', 'P@ssword');

        expect(response).not.toBeFalsy();
    })
})
