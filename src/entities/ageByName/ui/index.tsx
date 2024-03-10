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

  const updateName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      setName(e.target.value);
      setIsComplete(false);
    }
  };

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
        <Header mode='primary'>Возраст: {age}</Header>
      </Group>
      <CellButton onClick={() => nextPanel('panel1')}>
        Перейти на первую форму
      </CellButton>
    </Panel>
  );
};
