import React, {
  createContext as reactCreateContext,
  useContext as reactUseContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';

import { useDidMount } from '../hooks';

export type ContextType<StateType> = {
  setState: Dispatch<SetStateAction<StateType | undefined>>;
  state?: StateType;
};

function createContextFactory<StateType>(defaultValue?: StateType) {
  let staticState: ContextType<StateType> = {
    state: defaultValue,
    setState: () => { },
  };

  const Context = reactCreateContext<ContextType<StateType>>(staticState);

  type ProviderPropsType = PropsWithChildren & {
    value?: StateType;
  };

  const Provider: React.FC<ProviderPropsType> = ({ value: initialValue, children }) => {
    const [state, setState] = useState(initialValue ?? defaultValue);

    const value = useMemo(() => ({
      state,
      setState,
    }), [state]);

    staticState = value;

    useDidMount(() => function unmount() {
      // limpa a variável global ao destruir o provider para evitar vazamento de memória
      staticState.state = undefined;
      staticState.setState = () => { };
    });

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  };

  const Holder = {
    getState() {
      return staticState.state;
    },
    /**
     * Substitui todo o objeto no state dentro do Context API
     * @param state
     */
    setState(state: StateType) {
      staticState.setState(state);
    },
    /**
     * Atualiza o objeto do state com apenas as propriedades fornecidas
     * @param state
     */
    updateState(state: Partial<StateType>) {
      staticState.setState({
        ...staticState.state!,
        ...state,
      });
    },
  };

  const useContext = () => reactUseContext(Context);

  return {
    Context,
    Provider,
    Holder,
    useContext,
  };
}

export default createContextFactory;
