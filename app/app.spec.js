// importation des modules
import app from './app'
import access from './services/business-logic/link/access/access.spec'
import create from './services/business-logic/link/create/create.spec'
import suppression from './services/business-logic/link/delete/delete.spec'
import list from './services/business-logic/link/list/list.spec'

// réinitialisation des mocks avant chaque test
// beforeEach(jest.restoreAllMocks)

// describe('app.js', () => {
//     test('', () => {
//         expect(access(4)).toBe('night')
//     })
// })