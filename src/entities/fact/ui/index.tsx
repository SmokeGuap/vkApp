import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Textarea,
} from '@vkontakte/vkui';
import { getFact } from '../api/getFact';
import { useRef, useState } from 'react';

type Props = {
  id: string;
  nextPanel: any;
};

export const Fact = ({ nextPanel, id }: Props) => {
  const [fact, setFact] = useState('');

  const handleButton = () => {
    getFact().then((data) => setFact(data.fact));
  };

  return (
    <Panel id={id}>
      <PanelHeader>Форма 1</PanelHeader>
      <Group>
        <FormItem top='Факт'>
          <Textarea
            value={fact}
            placeholder='Здесь будет факт...'
            disabled={!fact}
          />
          <Button onClick={handleButton}>Получить факт</Button>
        </FormItem>
        <CellButton onClick={() => nextPanel('panel2')}>
          Перейти на вторую форму
        </CellButton>
      </Group>
    </Panel>
  );
};
