import { useRequest } from 'ahooks';
import { message } from 'antd';

export function useAxios(service, options) {
  const request = useRequest(service, {
    manual: true,
    ...options,
    onSuccess: (result) => {
      const { code, data } = result;
      if (code === '0') {
        if (options && options.onSuccess) {
          options.onSuccess(data);
        }
      } else {
        message.error(result.message);
      }
    },
  });

  return request;
}
