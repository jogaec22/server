import {  Filter, repository, Where} from '@loopback/repository';
import { post, param, get, patch, put, del,
  getFilterSchemaFor, getModelSchemaRef, getWhereSchemaFor, requestBody, } from '@loopback/rest';
import {Ingredients, Medicamento} from '../models';
import {IngredientsRepository} from '../repositories';

export class IngredientsController {
  constructor(
    @repository(IngredientsRepository)
    public ingredientsRepository : IngredientsRepository,
  ) {}

  
  /*
    Method to create a new ingredient, we exclude the id because it generates it automatically 
    and the optional drug ID, because it may or may not be associated with a medicine.
  */
  @post('/ingredients')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredients, {
            title: 'NewIngredients',
            exclude: ['_id'],
            optional: ['medicamentoId']
          }),
        },
      },
    })
    ingredients: Ingredients,//Omit<Ingredients, '_id'>,
  ): Promise<Ingredients> {
    return this.ingredientsRepository.create(ingredients);
  }


  
  /*
  Get method, get all ingredient records along with the associated drug relationship, 
  if you have one. This relationship was set up in the IngredientsRepository repository.
  */
  @get('/ingredients', {
    responses: {
      '200': {
        description: 'Array of Ingredients model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ingredients, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ingredients)) filter?: Filter<Ingredients>,
  ): Promise<Ingredients[]> {
    return this.ingredientsRepository.find(filter);
  }



  /*
    It obtains only one ingredient for the id provided, it also includes the relacon so that the medications appear.
  */
  @get('/ingredients/{_id}', {
    responses: {
      '200': {
        description: 'Ingredients model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ingredients, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('_id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Ingredients)) filter?: Filter<Ingredients>
  ): Promise<Ingredients> {
    return this.ingredientsRepository.findById(id, filter);
  }



  
  /*
    Method to update an ingredient, according to the id provided, uses await, which waits for it to complete to send the response.
  */
  @put('/ingredients/{_id}', {
    responses: {
      '204': {
        description: 'Ingredients PUT success',
      },
    },
  })
  async replaceById(  
    @param.path.string('_id') id: string,
    @requestBody() ingredients: Ingredients,
  ): Promise<void> {
    await this.ingredientsRepository.replaceById(id, ingredients);
  }


  /*
    Method to remove an ingredient, according to the id provided, uses await, 
    which waits for it to complete to send the response.
  */
  @del('/ingredients/{_id}', {
    responses: {
      '204': {
        description: 'Ingredients DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('_id') id: string): Promise<void> {
    await this.ingredientsRepository.deleteById(id);
  }
}
