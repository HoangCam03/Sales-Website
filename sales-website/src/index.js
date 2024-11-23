import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import GlobalStyles from './components/GlobalStyles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    // Nếu bạn muốn sử dụng StrictMode, hãy bỏ comment dòng bên dưới
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <GlobalStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobalStyles>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
    // </React.StrictMode>
);

// Nếu bạn muốn bắt đầu đo hiệu suất trong ứng dụng của mình, hãy truyền một hàm
// để ghi lại kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một endpoint phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
