import { useState } from 'react';
import {
  AppRoot,
  CellButton,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  View,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const platform = usePlatform();

  const [activePanel, setActivePanel] = useState('panel1');

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter='none' />}
      >
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
            <Panel id='panel1'>
              <PanelHeader>Panel 1</PanelHeader>
              <Group>
                <div style={{ height: 200 }}></div>
                <CellButton onClick={() => setActivePanel('panel2')}>
                  Go to panel 2
                </CellButton>
              </Group>
            </Panel>
            <Panel id='panel2'>
              <PanelHeader>Panel 2</PanelHeader>
              <Group>
                <div style={{ height: 200 }}></div>
                <CellButton onClick={() => setActivePanel('panel1')}>
                  Go to panel 1
                </CellButton>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
