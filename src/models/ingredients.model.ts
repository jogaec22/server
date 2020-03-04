import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Medicamento } from './medicamento.model';
@model()
export class Ingredients extends Entity {
  @property({
  	type: 'string',
  	id: true
  })
  _id?:string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;  

  @belongsTo(()=> Medicamento)
  medicamentoId: string;



  constructor(data?: Partial<Ingredients>) {
    super(data);
  }
}

export interface IngredientsRelations {
  // describe navigational properties here
}

export type IngredientsWithRelations = Ingredients & IngredientsRelations;
