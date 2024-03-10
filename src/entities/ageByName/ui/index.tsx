import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Header,
  Spinner,
  Text,
  Input,
} from '@vkontakte/vkui';

import { useDebounce } from 'src/shared/hooks';

import { getAge } from '../api/getAge';

type Props = {
  id: string;
  nextPanel: any;
};

export const AgeByName = ({ nextPanel, id }: Props) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>();

  const debouncedName = useDebounce(name, 3000);

  const { status, data, refetch, isFetching, isError, error } = useQuery({
    queryKey: ['getAge'],
    queryFn: () => getAge(name),
    enabled: false,
  });

  useEffect(() => {
    if (isComplete || !debouncedName || isFetching) return;
    refetch();
  }, [debouncedName]);

  useEffect(() => {
    if (status === 'success') {
      setAge(data.age);
      setIsComplete(true);
    }
  }, [status, data]);

  const handleButton = () => {
    if (isComplete || isFetching) return;
    if (!name) {
      setIsEmpty(true);
      return;
    }
    refetch();
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[a-zA-Z]*$/.test(e.target.value)) {
      setName(e.target.value);
      setIsComplete(false);
    }
  };

  if (isError) return <Text>{error.message}</Text>;

  return (
    <Panel id={id}>
      <PanelHeader>Форма 2</PanelHeader>
      <Group>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormItem
            htmlFor='age'
            top='Имя'
            status={isEmpty ? 'error' : 'default'}
            bottom={isEmpty && 'Пожалуйста, введите имя '}
          >
            <Input
              onFocus={() => setIsEmpty(false)}
              id='age'
              type='text'
              placeholder='Введите имя'
              value={name}
              onChange={(e) => updateName(e)}
            />
          </FormItem>
          <FormItem>
            <Button type='submit' onClick={handleButton}>
              Узнать возраст
            </Button>
          </FormItem>
        </form>
        {age !== undefined && (
          <Header multiline mode='primary'>
            {isFetching ? (
              <Spinner />
            ) : age ? (
              `Возраст: ${age ? age : ''}`
            ) : (
              `Ни одного человека с таким именем не найдено`
            )}
          </Header>
        )}
      </Group>
      <CellButton onClick={() => nextPanel('panel1')}>
        Перейти на первую форму
      </CellButton>
    </Panel>
  );
};
