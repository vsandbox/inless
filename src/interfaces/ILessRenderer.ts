import {ReactElement} from 'react';
import {ILessNode} from './ILessNode';
import {ILessVector} from './types';

export type ILessSetSocket = (id: string, position: ILessVector) => void;
export type ILessRenderer = (node: ILessNode, setSocket: ILessSetSocket) => ReactElement<any>; 
