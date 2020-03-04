import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Ingredients, IngredientsRelations, Medicamento} from '../models';
import {DsfarmaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MedicamentoRepository} from './medicamento.repository'

export class IngredientsRepository extends DefaultCrudRepository<
  Ingredients,
  typeof Ingredients.prototype._id,
  IngredientsRelations
> {

	public readonly medicamento: BelongsToAccessor<Medicamento, typeof Ingredients.prototype._id>

  constructor(
    @inject('datasources.dsfarma') dataSource: DsfarmaDataSource,
    @repository.getter('MedicamentoRepository')
    medicamentoRepositoryGetter: Getter<MedicamentoRepository>,
  ) {
    super(Ingredients, dataSource);
    this.medicamento = this.createBelongsToAccessorFor(
    	'medicamento',
    	medicamentoRepositoryGetter,
    );   
    
    this.registerInclusionResolver('medicamento', this.medicamento.inclusionResolver); 
  }
}
