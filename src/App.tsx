import { Provider } from 'react-redux';
import store from './app/store/store';
import WeatherApp from './apps/WeatherApp/WeatherApp';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './styles/style.scss';

dayjs.locale('ru');

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WeatherApp />
      </div>
    </Provider>
  );
}

export default App;
