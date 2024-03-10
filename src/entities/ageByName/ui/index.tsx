import {
  Button,
  CellButton,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  Textarea,
} from '@vkontakte/vkui';

type Props = {
  id: string;
  nextPanel: any;
};

export const AgeByName = ({ nextPanel, id }: Props) => {
  return (
    <Panel id={id}>
      <PanelHeader>Форма 2</PanelHeader>
      <Group>
        <FormItem top='Возраст'>
          <Textarea placeholder='Узнать возраст по имени...' />
          <Button>Получить факт</Button>
        </FormItem>
        <CellButton onClick={() => nextPanel('panel1')}>
          Перейти на первую форму
        </CellButton>
      </Group>
    </Panel>
  );
};
