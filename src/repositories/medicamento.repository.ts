import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Medicamento, MedicamentoRelations, Ingredients} from '../models';
import {DsfarmaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IngredientsRepository} from './ingredients.repository';

export class MedicamentoRepository extends DefaultCrudRepository<
  Medicamento,
  typeof Medicamento.prototype._id,
  MedicamentoRelations
> {

	public readonly ingredients: HasManyRepositoryFactory<Ingredients, typeof Medicamento.prototype._id>;

  constructor(
    @inject('datasources.dsfarma') dataSource: DsfarmaDataSource,
    @repository.getter('IngredientsRepository')
    getIngredientsRepository: Getter<IngredientsRepository>
  ) {
    super(Medicamento, dataSource);
    this.ingredients = this.createHasManyRepositoryFactoryFor(
    	'ingredients', getIngredientsRepository,
    );

    this.registerInclusionResolver('ingredients', this.ingredients.inclusionResolver);
  }
}
