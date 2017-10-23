import {ReactElement} from 'react';
import {ILessNode} from './ILessNode';

export type ILessRenderer = (node: ILessNode) => ReactElement<any>; 
