import { useState } from 'react';
import {
  AppRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  View,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/cssm/styles/themes.css';

import { Fact } from 'src/entities/fact';
import { AgeByName } from 'src/entities/ageByName';

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
            <Fact id='panel1' nextPanel={() => setActivePanel('panel2')} />
            <AgeByName id='panel2' nextPanel={() => setActivePanel('panel1')} />
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
