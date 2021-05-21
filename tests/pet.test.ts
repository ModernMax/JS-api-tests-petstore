import { strict as assert } from 'assert';
import { addSyntheticLeadingComment } from 'typescript';
//import { PetController } from '../api/controller/pet.controller';
import {definitions} from '../.temp/types'
import { ApiClient } from '../api/client';


//const pet = new PetController()


describe('Pet', function() {
    it('receive pet by his id', async function () {
        const body = await ApiClient.unauthorized().pet.getById(1)
        assert(body.id == 1, `Expected API to return pet with id 1, but got ${body.id}`)
    })
    it('receive by status', async function () {
        const client = ApiClient.unauthorized()
        let body = await client.pet.findByStatus('available')
        assert(body.length > 0)
        
        body = await client.pet.findByStatus('pending')
        assert(body.length > 0)
        
        body = await client.pet.findByStatus('sold')
        assert(body.length > 0)

        body = await client.pet.findByStatus(['pending', 'available'])
        assert(body.length > 0)
        assert(body.some(pet => pet.status == 'available'))
        assert(body.some(pet=> pet.status == 'pending'))
        assert(!body.some(pet => pet.status == 'sold'))
    })
    it('can be recived by tag', async function () {
      const client = ApiClient.unauthorized()
         const body = await client.pet.findByTags('tag1')
        assert(body.length > 0)
        assert(body.every(
                pet=> pet.tags.some(
                    tag=> tag.name == 'tag1')
                ), `Every returned pet must cantain rag1`)
    })
    it('can be added, apdated, and deleted', async function () {
        const adminClient = await ApiClient.loginAS({username: 'admin', password: 'admin'})
        const petToCreate: Omit<definitions['Pet'], 'id'> = {
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
                "status": "available"
        }
        const addedPet = await adminClient.pet.addNew(petToCreate)
        assert.deepEqual(addedPet,{
            ...petToCreate,
            id: addedPet.id
        }, `Expected created pet to much data used upon creation`)

        const foundAddedPet = await adminClient.pet.getById(addedPet.id)
        assert.deepEqual(addedPet,{
            ...petToCreate,
            id: addedPet.id
        }, `Expected found pet to match created pet`)

        const newerPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                id: 1,
                name: "string2"
              },
              name: "Dog",
              photoUrls: [
                "http://test.com/image2.jpg"
              ],
              tags: [
                {
                  "id": 1,
                  "name": "string2"
                }
              ],
              status: "pending"
        }
        const updatedPet = await adminClient.pet.update(newerPet)
        assert.deepEqual(addedPet, newerPet, `Expected updated pet to equal data used upon updating`)

        await adminClient.pet.delete(addedPet.id)
    })
})


