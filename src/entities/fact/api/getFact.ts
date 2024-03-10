import { apiClient } from 'src/shared/api/base';
import { API_URL } from './config';

import { FactResponse } from '../model/factResponse';

export const getFact = async (): Promise<FactResponse> => {
  const result = await apiClient(API_URL).get<FactResponse>('/fact');

  return result;
};
