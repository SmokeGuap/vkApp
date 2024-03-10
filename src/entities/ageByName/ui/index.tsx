import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Spacing,
  Textarea,
  Header,
  Spinner,
  Text,
} from '@vkontakte/vkui';

import { useDebounce } from 'src/shared/hooks';

import styles from './Form.module.scss';

import { getAge } from '../api/getAge';

type Props = {
  id: string;
  nextPanel: any;
};

export const AgeByName = ({ nextPanel, id }: Props) => {
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
    if (isComplete || !name || isFetching) return;
    refetch();
  };

  const updateName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      setName(e.target.value);
      setIsComplete(false);
    }
  };

  if (isError) return <Text>{error.message}</Text>;

  return (
    <Panel id={id}>
      <PanelHeader>Форма 2</PanelHeader>
      <Group className={styles.form}>
        <FormItem top='Возраст'>
          <Textarea
            rows={1}
            value={name}
            onChange={(e) => updateName(e)}
            placeholder='Узнать возраст по имени...'
          />
          <Spacing size={16} />
          <Button onClick={handleButton}>Узнать возраст</Button>
        </FormItem>
        <Header mode='primary'>
          {isFetching ? <Spinner /> : `Возраст: ${age ? age : ''}`}
        </Header>
      </Group>
      <CellButton onClick={() => nextPanel('panel1')}>
        Перейти на первую форму
      </CellButton>
    </Panel>
  );
};
