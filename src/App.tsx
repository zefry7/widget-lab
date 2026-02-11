import { Provider } from 'react-redux';
import store from './app/store/store';
import WeatherApp from './apps/WeatherApp/WeatherApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

function App() {
  return (
    <Provider store={store}>
      <div>123</div>
      <WeatherApp />
    </Provider>
  );
}

export default App;
