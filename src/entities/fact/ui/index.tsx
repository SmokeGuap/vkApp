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

export const Fact = ({ nextPanel, id }: Props) => {
  return (
    <Panel id={id}>
      <PanelHeader>Форма 1</PanelHeader>
      <Group>
        <FormItem top='Факт'>
          <Textarea placeholder='Здесь будет факт...' disabled={true} />
          <Button>Получить факт</Button>
        </FormItem>
        <CellButton onClick={() => nextPanel('panel2')}>
          Перейти на вторую форму{' '}
        </CellButton>
      </Group>
    </Panel>
  );
};
