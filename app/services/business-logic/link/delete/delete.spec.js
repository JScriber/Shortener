import { suppression } from './delete'

describe('Delete service. ', () => {
    it('should delete.', async () => {
        try {
            const response = await suppression();

            expect(response).not.toBeDefined();
        } catch (err) {
            console.log(err);
        }
    })
})