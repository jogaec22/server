// Uncomment these imports to begin using these cool features!

import {post, param, requestBody, getModelSchemaRef} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {Medicamento, Ingredients} from '../models';
import {MedicamentoRepository} from '../repositories';

// import {inject} from '@loopback/context';


export class MedicamentoIngredientsController {
  constructor(
  	@repository(MedicamentoRepository)
  	protected medicamentoRepository: MedicamentoRepository,
  ) {}

  @post('/medicamentos/{_id}/ingredients')
  async createIngredient(
  	@param.path.string('_id') medicamentoId: typeof Medicamento.prototype._id,
  	@requestBody({
  		content: {
  			'application/json': {
  				schema: getModelSchemaRef(Ingredients, {
  					exclude: ['_id', 'medicamentoId'],
  					//optional: ['medicamentoId']
  				})
  			}
  		}
  	}) ingredientData: Omit<Ingredients, '_id'>,
  ): Promise<Ingredients> {
  	return this.medicamentoRepository.ingredients(medicamentoId).create(ingredientData);
  }
}
