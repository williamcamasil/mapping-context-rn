import { ContextType, createContextFactory, IResponseSuccess } from '../../lib';
import { DogCeoResponseDataType } from '../api/DogCeoService';

export type DogStateType = IResponseSuccess<DogCeoResponseDataType>;

export type DogContextType = ContextType<DogStateType>; // opcional

const {
  Context: DogContext, // opcional
  Holder: DogHolder,
  Provider: DogProvider,
  useContext: useDogContext,
} = createContextFactory<DogStateType>();

export {
  DogContext,
  DogHolder,
  DogProvider,
  useDogContext,
};
