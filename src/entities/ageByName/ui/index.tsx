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
  Text,
  Header,
} from '@vkontakte/vkui';

import { getAge } from '../api/getAge';
import { useDebounce } from 'src/shared/hooks';

type Props = {
  id: string;
  nextPanel: any;
};

export const AgeByName = ({ nextPanel, id }: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>();

  const debouncedName = useDebounce(name, 3000);

  useEffect(() => {
    if (isComplete || !debouncedName || isFetching) return;
    setIsFetching(true);
    getAge(debouncedName).then((data) => {
      setAge(data.age);
      setIsComplete(true);
      setIsFetching(false);
    });
  }, [debouncedName]);

  const handleButton = () => {
    if (isComplete || !name || isFetching) return;
    setIsFetching(true);

    getAge(name).then((data) => {
      setAge(data.age);
      setIsComplete(true);
      setIsFetching(false);
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Форма 2</PanelHeader>
      <Group>
        <FormItem top='Возраст'>
          <Textarea
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsComplete(false);
            }}
            placeholder='Узнать возраст по имени...'
          />
          <Spacing size={16} />
          <Button onClick={handleButton}>Получить факт</Button>
        </FormItem>
        <Header mode='primary'>Возраст: {age}</Header>
        <CellButton onClick={() => nextPanel('panel1')}>
          Перейти на первую форму
        </CellButton>
      </Group>
    </Panel>
  );
};
