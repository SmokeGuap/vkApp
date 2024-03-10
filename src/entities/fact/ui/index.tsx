import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Spinner,
  Text,
  Textarea,
} from '@vkontakte/vkui';

import styles from './Form.module.scss';

import { getFact } from '../api/getFact';

type Props = {
  id: string;
  nextPanel: any;
};

export const Fact = ({ nextPanel, id }: Props) => {
  const [fact, setFact] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { status, data, refetch, isFetching, isError, error } = useQuery({
    queryKey: ['getFact'],
    queryFn: getFact,
    enabled: false,
  });

  useEffect(() => {
    if (status === 'success') {
      setFact(data.fact);
    }
  }, [status, data]);

  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(
      fact.split(' ')[0].length,
      fact.split(' ')[0].length
    );
  }, [fact]);

  const handleButton = () => {
    refetch();
  };

  if (isError) return <Text>{error.message}</Text>;

  return (
    <Panel id={id}>
      <PanelHeader>Форма 1</PanelHeader>
      <Group className={styles.form}>
        <FormItem top='Факт'>
          {isFetching ? (
            <Spinner />
          ) : (
            <Textarea
              getRef={textareaRef}
              value={fact}
              placeholder='Здесь будет факт...'
              disabled={!fact}
            />
          )}
        </FormItem>
        <FormItem>
          <Button type='submit' onClick={handleButton}>
            Получить факт
          </Button>
        </FormItem>
      </Group>
      <CellButton onClick={() => nextPanel('panel2')}>
        Перейти на вторую форму
      </CellButton>
    </Panel>
  );
};
