/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import userRepository from '../../database/user';
import useUserStore from '../../database/store';

export const useLogin = () => {
  const setToken = useUserStore(state => state.setToken)
  return useMutation({
    mutationFn: (data) => userRepository.login(data.email, data.password),
    onSuccess: (data) => {
      setToken(data.data.data.access_token);
    },
  })
};
