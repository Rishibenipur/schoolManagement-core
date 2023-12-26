import { NonEmptyArray } from 'type-graphql';
import { LoginResolver } from './Auth/LoginResolver';

export function allResolver() {
  return [LoginResolver] as NonEmptyArray<Function>;
}
