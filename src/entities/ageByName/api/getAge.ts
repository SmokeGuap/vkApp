import { apiClient } from 'src/shared/api/base';
import { API_URL } from './config';

import { GetAgeResponse } from '../model/getAgeResponse';
import { GetAgeQuery } from './query/getAgeQuery';

export const getAge = async (name: string): Promise<GetAgeResponse> => {
  const query: GetAgeQuery = { name };

  const result = await apiClient(API_URL).get<GetAgeResponse>('', query);

  return result;
};
