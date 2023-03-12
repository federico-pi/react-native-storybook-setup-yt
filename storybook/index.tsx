// if you use expo remove this line
import { AppRegistry } from 'react-native';

import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import { QueryClient, QueryClientProvider } from 'react-query';

import './modules/rn-addons';

const { loadStories } = require('./storyLoader')

const queryClient = new QueryClient();

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(loadStories, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  initialSelection: -1, // navigation tab
  asyncStorage:
    require('@react-native-async-storage/async-storage').default || null,
});

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StorybookUIRoot />
    </QueryClientProvider>
  );
};
