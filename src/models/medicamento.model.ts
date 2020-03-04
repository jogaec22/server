import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ingredients, IngredientsWithRelations} from './ingredients.model';

@model()
export class Medicamento extends Entity {

  @property({
    type: 'string',
    id: true,
  })
  _id?:string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  posology: string;

  @property({
    type: 'number',
    required:false,
    min:0,
  })
  stock?: number;
  

  @property({
    type: 'date',
    required: true,
  })
  expiration_date: string;


  @hasMany(() => Ingredients)
  ingredients?: Ingredients[];


  constructor(data?: Partial<Medicamento>) {
    super(data);
  }
}

export interface MedicamentoRelations {
  // describe navigational properties here
}

export type MedicamentoWithRelations = Medicamento & MedicamentoRelations;
