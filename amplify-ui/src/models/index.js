// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Provider } = initSchema(schema);

export {
  Provider
};