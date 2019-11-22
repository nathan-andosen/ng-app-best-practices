import { Mixin } from '@core/decorators';
import { ElementaryArithmticModel } from './elementary-arithmtic.model';

// declartion merging for our mixins
export interface MathsModel extends ElementaryArithmticModel {}

@Mixin([ElementaryArithmticModel])
export class MathsModel {

}
