import {strict as assert} from 'assert'
import { definitions } from '../.temp/types'
//import { PetController } from '../api/controller/pet.controller'
//import { StoreController } from '../api/controller/store.controller'
import { ApiClient } from '../api/client';


//const pet = new PetController()
//const store = new StoreController()

describe('Store', () => {

    it('should return his inventory, and correctly updates statuses', async function () {
        const adminClient = await ApiClient.loginAS({ username: 'admin', password: 'admin'})
        const inventory = await adminClient.store.getInventory()
        assert(Object.keys(inventory).length > 0, `List of inventory statuses must not be empty`)

        await adminClient.pet.addNew(petWithStatus('available'))
        const inventoryWithAvailableAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1,
            `Available value in inventory must be increased by 1`)
        
        await adminClient.pet.addNew(petWithStatus('pending'))
        const inventoryWithPendingAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithPendingAdded.available, inventory.available + 1,
            `Pending value in inventory must be increased by 1`)

            await adminClient.pet.addNew(petWithStatus('sold'))
            const inventoryWithSoldAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithSoldAdded.available, inventory.available + 1,
            `Sold value in inventory must be increased by 1`)

    })
})

it('allows to place order by user, and admin can see created order', async function () {

  const userClient = await ApiClient.loginAS({username: 'user', password: 'user'})

  const order: {petId: number, quantity: number, status: any, shipDate: string} = {
    petId: 1,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: "placed"
  }

  const placedOrder = await userClient.store.placeOrder(order)
  const adminClient = await ApiClient.loginAS({username: 'admin', password: 'admin'})
  await adminClient.store.getOrderById(placedOrder.id)
})

function petWithStatus(status: definitions['Pet']['status']) {
    return {
        "category": {
            "id": 0,
            "name": "string"
          },
          "name": "cat",
          "photoUrls": [
            "http://test.com/image.jpg"
          ],
          "tags": [
            {
              "id": 0,
              "name": "string"
            }
          ],
          status
    }

}