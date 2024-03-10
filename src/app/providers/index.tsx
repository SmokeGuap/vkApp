import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import App from '../App';

type Props = {
  client: QueryClient;
};

export const Providers = ({ client }: Props) => {
  return (
    <QueryClientProvider client={client}>
      <ConfigProvider>
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
