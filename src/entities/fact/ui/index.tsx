import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Spacing,
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

  const handleButton = () => {
    getFact().then((data) => setFact(data.fact));
  };

  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(
      fact.split(' ')[0].length,
      fact.split(' ')[0].length
    );
  }, [fact]);

  return (
    <Panel id={id}>
      <PanelHeader>Форма 1</PanelHeader>
      <Group className={styles.form}>
        <FormItem top='Факт'>
          <Textarea
            getRef={textareaRef}
            value={fact}
            placeholder='Здесь будет факт...'
            disabled={!fact}
          />
          <Spacing size={16} />
          <Button onClick={handleButton}>Получить факт</Button>
        </FormItem>
      </Group>
      <CellButton onClick={() => nextPanel('panel2')}>
        Перейти на вторую форму
      </CellButton>
    </Panel>
  );
};
