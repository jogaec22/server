import {  Filter, repository, Where } from '@loopback/repository';
import { post, param, get, put, del, 
  getFilterSchemaFor, getModelSchemaRef, getWhereSchemaFor, 
  requestBody } from '@loopback/rest';
import {Medicamento} from '../models';
import {MedicamentoRepository} from '../repositories';

export class MedicamentoController {
  constructor(
    @repository(MedicamentoRepository)
    public medicamentoRepository : MedicamentoRepository,
  ) {}

  

  /*
    Method to create a new medicine, in the requestBody decorator some metadata is specified, 
    for example, to exclude the id since it is generated automatically.
  */
  @post('/medicamentos')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicamento, {
            title: 'NewMedicamento',
            exclude: ['_id'],
          }),
        },
      },
    })
    medicamento: Omit<Medicamento, '_id'>,
  ): Promise<Medicamento> {
    return this.medicamentoRepository.create(medicamento);
  }

  
  /*
    Method to obtain all the medicines, to the decorator get you can specify a second 
    parameter to customize response, such as specifying that the relationships be included.
  */
  @get('/medicamentos', {
    responses: {
      '200': {
        description: 'Array of Medicamento model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Medicamento, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Medicamento)) filter?: Filter<Medicamento>,
  ): Promise<Medicamento[]> {
    return this.medicamentoRepository.find(filter);
  }


  /*
    Method to obtain only one medicine, according to the id provided.
  */
  @get('/medicamentos/{_id}', {
    responses: {
      '200': {
        description: 'Medicamento model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medicamento, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('_id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Medicamento)) filter?: Filter<Medicamento>
  ): Promise<Medicamento> {
    return this.medicamentoRepository.findById(id, filter);
  }

  

  /*
    Method to update only one medicine, according to the id provided, 
    receives the id using the param decorator, specifies the same id name and 
    the same type of data as in the model.
  */
  @put('/medicamentos/{_id}', {
    responses: {
      '204': {
        description: 'Medicamento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('_id') id: string,
    @requestBody() medicamento: Medicamento,
  ): Promise<void> {
    await this.medicamentoRepository.replaceById(id, medicamento);
  }

  
  /*
    Method to eliminate only one medicine, according to the id provided.
  */
  @del('/medicamentos/{_id}', {
    responses: {
      '204': {
        description: 'Medicamento DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('_id') id: string): Promise<void> {
    await this.medicamentoRepository.deleteById(id);
  }
}
