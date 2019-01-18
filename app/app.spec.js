// importation des modules
import access from './services/business-logic/link/access/access.spec'
import create from './services/business-logic/link/create/create.spec'
import suppression from './services/business-logic/link/delete/delete.spec'
import list from './services/business-logic/link/list/list.spec'

// remise à 0 de la db
function reset() {
}

// réinitialisation des mocjs avant chaque test
beforeEach(jest.restoreAllMocks)

// reset de la base de donnée à la fin de chaque test
afterAll(reset)

